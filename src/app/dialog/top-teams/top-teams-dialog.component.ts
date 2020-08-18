import { Component, OnInit, DoCheck, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { TeamService } from '@app/service/team.service';
import { ITeam } from '@app/model/nba.model';
import { sortDivision, sortConference } from '@app/common/sort';

@Component({
  selector: 'app-top-teams-dialog',
  templateUrl: './top-teams-dialog.component.html',
  styleUrls: ['./top-teams-dialog.component.scss']
})
export class TopTeamsDialogComponent implements OnInit, DoCheck, OnDestroy {

  constructor(
    private teamService: TeamService,
    public dialogRef: MatDialogRef<TopTeamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  tabIndex: number;
  divisions: string[] = [];
  teamsArr: ITeam[] = [];
  EASTConf: ITeam[];
  EASTTopSeeds: ITeam[];
  EASTBottomSeeds: ITeam[];
  EASTHunt: ITeam[] = [];
  WESTConf: ITeam[];
  WESTTopSeeds: ITeam[];
  WESTBottomSeeds: ITeam[];
  WESTHunt: ITeam[] = [];

  ngOnInit() {
    // this.teamsArr = this.teamService.getCurrentTeams().map(teams => teams);

    if (this.data) {
      this.tabIndex = this.data.tabIndex;
    } else {
      this.tabIndex = 0;
    }

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[navbar] ngOnInit() getCurrentTeams() SUCCESS');
    }, (err) => {
      console.error('[top-teams] ngOnInit() getTeams() error: ' + err);
    });
  }

  ngDoCheck() {
    // Each conference is just sorted, top 8 teams are in, regardless of division
    if (this.teamsArr.length > 0) {
      this.teamsArr.forEach(team => {
        if (this.divisions.indexOf(team.division) < 0) {
          this.divisions.push(team.division);
        }
      });
      this.EASTConf = [];
      this.divisions
        .filter(division => division.indexOf('East') > -1)
        .forEach((division, i) => {
          const thisDiv: ITeam[] = this.teamsArr.filter(team => (team.division === division));
          this.EASTConf = this.EASTConf.concat(thisDiv);
        });

      this.EASTConf.sort(sortConference);
      this.EASTTopSeeds = this.EASTConf.slice(0, 4);
      this.EASTBottomSeeds = this.EASTConf.slice(4, 8);
      this.EASTHunt = this.EASTConf.slice(8, 12);

      this.WESTConf = [];
      this.divisions
        .filter(division => division.indexOf('West') > -1)
        .forEach((division, i) => {
          const thisDiv: ITeam[] = this.teamsArr.filter(team => (team.division === division));
          this.WESTConf = this.WESTConf.concat(thisDiv);
        });

      this.WESTConf.sort(sortConference);
      this.WESTTopSeeds = this.WESTConf.slice(0, 4);
      this.WESTBottomSeeds = this.WESTConf.slice(4, 8);
      this.WESTHunt = this.WESTConf.slice(8, 12);
    }
  }

  ngOnDestroy() {
    this.onClose();
  }

  tabClicked(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }

  onClose(): void {
    this.dialogRef.close({ 'tabIndex': this.tabIndex });
  }
}
