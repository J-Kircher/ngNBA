import { Component, Input, OnInit } from '@angular/core';
import { TeamService } from '@app/service/team.service';
import { PlayoffService } from '@app/service/playoff.service';
import { ITeam, ISchedule } from '../model/nba.model';

@Component({
  selector: 'show-score',
  templateUrl: './show-score.component.html',
  styleUrls: ['./show-score.component.scss']
})

export class ShowScoreComponent implements OnInit {
  @Input() score: ISchedule;
  teamsArr: ITeam[] = [];
  loading: boolean = true;
  seriesGameNo: number = 0;
  showQuarter: boolean = false;
  timerSet: boolean = false;

  constructor(
    private teamService: TeamService,
    private playoffService: PlayoffService
  ) { }

  ngOnInit() {
    // console.log('[show-score] ngOnInit()');
    // console.table(this.score);

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[show-score] ngOnInit() getTeams() SUCCESS');
      this.loading = false;
      this.seriesGameNo = this.playoffService.getSeriesGameIdxForPlayoffGame(this.score.id);
    }, (err) => {
      console.error('[show-score] ngOnInit() getTeams() error: ' + err);
    });
  }

  checkQuarter() {
    if (this.score.quarter === '3') {
      // Game is almost over, start the timer
      if (!this.timerSet) {
        this.timerSet = true;
        setTimeout(() => {
          this.showQuarter = false;
        }, 4005);
      }
    } else if (this.score.quarter === '1') {
      // Game is starting, show the quarter
      this.showQuarter = true;
    }
    // If the game was already over, then show nothing
    return this.showQuarter || !['F', 'OT'].includes(this.score.quarter);
  }

  showPlayoffGame() {
    const playoffRounds = [ 'First Round', 'Second Round', 'Conference Championship', 'NBA Championship' ];
    return playoffRounds.includes(this.score.gameday);
  }
}
