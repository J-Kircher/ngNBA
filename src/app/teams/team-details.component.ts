import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    });
    this.playoffService.NBAChamp$.subscribe(data => this.NBAChamp = data);
  }
}
