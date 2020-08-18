import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '@app/service/team.service';
import { ITeam, ISchedule, IGameResults } from '@app/model/nba.model';
import { ScheduleService } from '@app/service/schedule.service';
import { PlayoffService } from '@app/service/playoff.service';
import { getOddsText } from '@app/common/odds';

@Component({
  selector: 'app-results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss']
})
export class ResultsDialogComponent implements OnInit {
  teamsArr: ITeam[] = [];
  modalGame: ISchedule;
  results: IGameResults[];
  loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ResultsDialogComponent>,
    private teamService: TeamService,
    private scheduleService: ScheduleService,
    private playoffService: PlayoffService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    // console.log('[results] data: ' + this.data);
    if (this.data.playoffs) {
      this.modalGame = this.playoffService.getGameById(this.data.id);
    } else {
      this.modalGame = this.scheduleService.getGameById(this.data.id);
    }

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
    }, (err) => {
      console.error('[results] ngOnInit() getTeams() error: ' + err);
    }, () => {
      this.results = JSON.parse(JSON.stringify(this.modalGame.gameResults));
      if (this.modalGame.overtime) {
        const OTindexStart = 5;
        while (this.results.length > OTindexStart) {
          const last = this.results.length - 1;
          const prev = last - 1;
          this.results[prev].homeScore += this.results[last].homeScore;
          this.results[prev].visitScore += this.results[last].visitScore;
          this.results.pop();
        }
      }
      this.loading = false;
    });

    console.log(this.modalGame);
  }

  getOdds() {
    // show saved game odds or calculate if there is none
    const visit = this.teamsArr[this.modalGame.visitTeam] ? this.teamsArr[this.modalGame.visitTeam].abbrev : '';
    const home = this.teamsArr[this.modalGame.homeTeam] ? this.teamsArr[this.modalGame.homeTeam].abbrev : '';
    return getOddsText(this.modalGame.spread, visit, home);
  }

  getWinner() {
    if (this.modalGame.homeScore > this.modalGame.visitScore) {
      return this.teamsArr[this.modalGame.homeTeam].name;
    } else {
      return this.teamsArr[this.modalGame.visitTeam].name;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
