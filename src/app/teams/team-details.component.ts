import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TeamService } from '@app/service/team.service';
import { PlayoffService } from '@app/service/playoff.service';
import { ITeam } from '../model/nba.model';

@Component({
  selector: 'team-details', // This html tag is not necessary since we will be navigating to this
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})

export class TeamDetailsComponent implements OnInit {
  team: ITeam;
  teamIdx: number;
  total: number;
  NBAChamp: number;
  teamExt;
  attColumns: string[] = [];
  statsColumns: string[] = [];
  dataSource = new MatTableDataSource();

  constructor(
    private teamService: TeamService,
    private playoffService: PlayoffService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.teamIdx = this.teamService.getTeamIndex(params['abbrev']);
      this.team = this.teamService.getTeam(params['abbrev']);
      this.total = this.team.of + this.team.de + this.team.co;
      this.teamExt = JSON.parse(JSON.stringify(this.team));
      this.teamExt.apf = this.team.pf === 0 ? 0 : this.myRound(this.team.pf / (this.team.wins + this.team.losses), 1);
      this.teamExt.apa = this.team.pa === 0 ? 0 : this.myRound(this.team.pa / (this.team.wins + this.team.losses), 1);
    });
    this.playoffService.NBAChamp$.subscribe(data => this.NBAChamp = data);
    this.attColumns = ['of', 'de', 'co', 'total'];
    this.statsColumns = ['wins', 'losses', 'apf', 'apa'];
    this.dataSource = new MatTableDataSource([this.teamExt]);
    window.scrollTo(0, 0);
  }

  myRound(value: number, precision: number): number {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}
