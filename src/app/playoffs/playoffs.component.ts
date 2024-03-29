import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TeamService } from '@app/service/team.service';
import { ITeam, ISchedule, IGameResults } from '@app/model/nba.model';
import { PlayoffService } from '@app/service/playoff.service';
import { MatchupDialogComponent } from '@app/dialog/matchup/matchup-dialog.component';
import { ResultsDialogComponent } from '@app/dialog/results/results-dialog.component';
import { listAnimation } from '@app/shared/animations';
import { PlayoffSeriesDialogComponent } from '@app/dialog/playoff-series/playoff-series-dialog.component';

@Component({
  selector: 'playoffs',
  templateUrl: './playoffs.component.html',
  styleUrls: ['./playoffs.component.scss'],
  animations: [listAnimation]
})

export class PlayoffsComponent implements OnInit {
  tabIndex: number;
  divisions: string[] = [];
  teamsArr: ITeam[] = [];
  playoffTeams: number[] = [];
  NBAChamp: number;
  loading: boolean = true;

  dialogReturn: any;

  currentPlayoffGame: number = 0;
  currentPlayoffGameDay: string;
  playoffGames: ISchedule[];
  GameDay: string[] = [];
  PlayoffBracket: number[] = new Array(22);

  constructor(
    private teamService: TeamService,
    private playoffService: PlayoffService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // console.log('[playoffs] ngOnInit()');
    // Reset season needs to also reset playoffs!
    // this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.tabIndex = this.playoffService.playoffTabIndex;

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[playoffs] ngOnInit() getTeams() SUCCESS');

      this.playoffService.getPlayoffTeams().subscribe((tData: number[]) => {
        this.playoffTeams = tData;
      }, (err) => {
        console.error('[playoffs] ngOnInit() getPlayoffTeams() error: ' + err);
      }, () => {
        // console.log('[playoffs] ngOnInit() getPlayoffTeams() COMPLETE');

        this.playoffService.initPlayoffs();
        this.playoffGames = this.playoffService.PLAYOFF_SCHEDULE;
        this.loading = false;
        // window.scrollTo(0, 0);
      });

    }, (err) => {
      console.error('[playoffs] ngOnInit() getTeams() error: ' + err);
    });

    this.playoffService.currentPlayoffGame$.subscribe(data => this.currentPlayoffGame = data);
    this.playoffService.currentPlayoffGameDay$.subscribe(data => this.currentPlayoffGameDay = data);
    // this.GameDay = [...Array.from(new Set(this.playoffGames.map(s => s.gameday)))];
    this.playoffService.GameDay$.subscribe(data => this.GameDay = data);
    this.playoffService.PlayoffBracket$.subscribe(data => this.PlayoffBracket = data);
    this.playoffService.NBAChamp$.subscribe(data => this.NBAChamp = data);
  }

  tabClicked(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
    this.playoffService.setPlayoffTabIndex(this.tabIndex);
  }

  getAbbrev(idx: number) {
    let abbrev = 'blank';
    // console.log('[playoffs] getAbbrev() idx: ' + idx + ', playoffbracket: ' + this.PlayoffBracket[idx]);
    if (this.PlayoffBracket[idx] > -1) {
      abbrev = this.teamsArr[this.PlayoffBracket[idx]].abbrev;
    }
    return abbrev;
  }

  showTeam(teamId: number) {
    const team = this.teamService.getTeamByIndex(teamId);
    return team.city + ' ' + team.name;
  }

  getGamesForDay(day: string) {
    return this.playoffService.getGamesForDay(day);
  }

  getSeriesForDay(day: string) {
    return this.playoffService.getSeriesForDay(day);
  }

  openResultsDialog(id: number): void {
    const dialogRef = this.dialog.open(ResultsDialogComponent, {
      data: { id: id, playoffs: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[playoffs] openResultsDialog() afterClosed() error: ' + err);
    });
  }

  openMatchupDialog(id: number): void {
    const dialogRef = this.dialog.open(MatchupDialogComponent, {
      data: { id: id, playoffs: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[playoffs] openMatchupDialog() afterClosed() error: ' + err);
    });
  }

  getMatchup(id: number) {
    // console.log('[playoffs] getMatchup: ' + id);

    this.playoffService.getGameResults(id).subscribe((results: IGameResults[]) => {
      if (results.length) {
        this.openResultsDialog(id);
      } else {
        this.openMatchupDialog(id);
      }
    });
  }

  openPlayoffSeriesDialog(id: number): void {
    const dialogRef = this.dialog.open(PlayoffSeriesDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[playoffs] openPlayoffSeriesDialog() afterClosed() error: ' + err);
    });
  }

  getSeriesMatchup(id: number) {
    // console.log('[playoffs] getSeriesMatchup: ' + id);
    const series = this.playoffService.getSeriesById(id);
    const games = [];
    series.games.forEach(game => {
      games.push(this.playoffService.getGameById(game));
    });

    this.openPlayoffSeriesDialog(id);
  }
}
