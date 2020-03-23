import { Component, OnInit } from '@angular/core';
import { TeamService } from '@app/service/team.service';
import { ScheduleService } from '@app/service/schedule.service';
import { ITeam, ISchedule } from '@app/model/nba.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-standings-chart',
  templateUrl: './standings-chart.component.html',
  styleUrls: ['./standings-chart.component.scss']
})
export class StandingsChartComponent implements OnInit {
  chartDivision: string = '';
  divisions: string[] = [];
  teamsArr: ITeam[] = [];
  schedulesArr: ISchedule[][] = [];
  myChart: Chart = []; // This will hold the chart info
  chartStats = []; // This will contain the labels and data for the chart
  chartStyle: boolean = true; // true: netWL, false: totalW

  constructor(
    private teamService: TeamService,
    private scheduleService: ScheduleService
  ) { }

  // TODO: custom tooltip, maybe add logo

  ngOnInit() {
    // console.log('[standings-chart] ngOnInit()');
    // this.createChartObject('all');

    this.getAllTeamData();
  }

  getAllTeamData() {
    // get teams and schedules

    let retrieveCount = 0;
    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[standings-chart] getAllTeamData() getTeams() SUCCESS');
    }, (err) => {
      console.error('[standings-chart] getAllTeamData() getTeams() error: ' + err);
    }, () => {
      this.teamsArr.forEach((team, idx) => {
        if (this.divisions.indexOf(team.division) < 0) {
          this.divisions.push(team.division);
        }
        this.scheduleService.getGamesForTeam(idx).subscribe((schedData: ISchedule[]) => {
          this.schedulesArr.push(schedData);
        }, (err) => {
          console.error('[standings-chart] getAllTeamData() getGamesForTeam() error: ' + err);
        }, () => {
          retrieveCount++;
          if (retrieveCount === this.teamsArr.length) {
            this.createChartObject(this.divisions[0]);
          }
        });
      });
    });
  }

  createChartObject(chartDivision: string = null): void {
    // console.log('[standings-chart] createChartObject() chartDivision: ' + chartDivision);

    if (chartDivision == null) {
      // Slide toggle clicked
      chartDivision = this.chartDivision || 'all';
    }
    this.chartDivision = chartDivision;

    let teamIndex: number;

    // Create chartStats object
    this.chartStats = [];
    if (typeof this.myChart.chart !== 'undefined') {
      this.myChart.chart.destroy();
    }

    this.teamsArr.forEach(team => {
      if (team.division === this.chartDivision || this.chartDivision === 'all') {

        const teamStats = [];
        teamStats.push(0); // To allow x axis to start at 0
        teamIndex = this.teamsArr.findIndex(t => t.abbrev === team.abbrev);

        let teamNetWL = 0;
        let teamTotalW = 0;
        const teamSchedule: ISchedule[] = this.schedulesArr[teamIndex];
        teamSchedule.forEach((game, idx) => {
          if (game.quarter === 'F') {
            if (teamIndex === game.homeTeam) {
              if (game.homeScore > game.visitScore) {
                teamNetWL += 1;
                teamTotalW += 1;
              } else {
                teamNetWL -= 1;
              }
            } else {
              if (game.visitScore > game.homeScore) {
                teamNetWL += 1;
                teamTotalW += 1;
              } else {
                teamNetWL -= 1;
              }
            }
            if (this.chartStyle) {
              teamStats.push(teamNetWL);
            } else {
              teamStats.push(teamTotalW);
            }
          }
        });

        this.chartStats.push({
          label: team.name,
          abbrev: team.abbrev,
          pct: team.pct,
          data: teamStats,
          borderWidth: 3,
          pointRadius: 0,
          fill: false,
          borderColor: '#' + team.chartcolor,
          backgroundColor: '#' + team.chartcolor
        });
      }
    });

    // console.log(this.chartStats);

    // Create chart object
    const canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: this.getChartDataObject(),
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'bottom'
        },
        elements: {
          point: {
            hitRadius: 12,
            hoverRadius: 2
          },
          line: {
            tension: 0
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 30,
            top: 20,
            bottom: 0
          }
        }
      },
      plugins: [{
        afterUpdate: function(chart) {
          chart.config.data.datasets.forEach(ds => {
            for (const key of Object.keys(ds._meta)) {
              const dsMeta = ds._meta[key];
              if (ds.abbrev) {
                const img = new Image();
                img.onload = function() {
                  const imgW = img.width;
                  const imgH = img.height;
                  img.setAttribute('height', '20px');
                  const newWidth = Math.round((20 / imgH) * imgW) || 20;
                  img.setAttribute('width', newWidth + 'px');
                  const len = (dsMeta.data.length - 1);
                  if (len > -1) {
                    dsMeta.data[len]._model.pointStyle = img;
                  }
                };
                img.src = '/assets/images/' + ds.abbrev + '_LG.png';
              }
            }
          });
        }
      }]
    });
  }

  getChartDataObject(): any {
    // console.log('[standings-chart] getChartDataObject()');

    let _label: string [] = null;
    const _data = this.chartStats;

    const _gamesPlayed: number[] = this.chartStats.map(item => item.data.length);
    const _maxGames = Math.max(..._gamesPlayed);

    this.chartStats.forEach(item => {
      if (item.data.length >= _maxGames) {
        _label = item.data.map((_n, idx) => idx);
      }
    });

    return {
      labels: _label,
      datasets: _data
    };
  }
}
