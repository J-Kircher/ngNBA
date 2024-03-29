import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from '@app/shared/material.module';
import { NBARoutes } from './app.routes';
import { NavBarComponent } from '@app/nav/navbar.component';
import { TeamListComponent } from '@app/teams/team-list.component';
import { TeamService } from '@app/service/team.service';
import { TeamDetailsComponent } from '@app/teams/team-details.component';
import { ScheduleComponent } from '@app/schedule/schedule.component';
import { ScheduleService } from '@app/service/schedule.service';
import { ScheduleCalenderComponent } from '@app/schedule/schedule-calendar.component';
import { ScheduleDayComponent } from '@app/schedule/schedule-day.component';
import { ScheduleMonthComponent } from '@app/schedule/schedule-month.component';
import { StandingsComponent } from '@app/standings/standings.component';
import { StandingsDivisionComponent } from '@app/standings/standings-division.component';
import { ShowScoresComponent } from '@app/showscores/show-scores.component';
import { ShowScoreComponent } from '@app/showscores/show-score.component';
import { TeamScheduleComponent } from '@app/teams/team-schedule.component';
import { PlayoffsComponent } from '@app/playoffs/playoffs.component';
import { PlayoffService } from '@app/service/playoff.service';
import { ConfigService } from '@app/service/config.service';
import { TopTeamsDialogComponent } from '@app/dialog/top-teams/top-teams-dialog.component';
import { MatchupDialogComponent } from '@app/dialog/matchup/matchup-dialog.component';
import { SimseasonDialogComponent } from '@app/dialog/simseason/simseason-dialog.component';
import { ResultsDialogComponent } from '@app/dialog/results/results-dialog.component';
import { StorageService } from '@app/service/storage.service';
import { MaterialElevationDirective } from '@app/shared/material-elevation.directive';
import { GameService } from '@app/service/game.service';
import { SpinnerButtonDirective } from '@app/shared/spinner-button.directive';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ShowSeriesComponent } from '@app/playoffs/show-series.component';
import { PlayoffSeriesDialogComponent } from '@app/dialog/playoff-series/playoff-series-dialog.component';
import { CapitalizePipe } from '@app/common/capitalize.pipe';
import { StandingsDialogComponent } from '@app/dialog/standings/standings-dialog.component';
import { StandingsChartComponent } from '@app/chart/standings-chart/standings-chart.component';
import { ConfirmDialogComponent } from '@app/dialog/confirm/confirm-dialog.component';
import { HelpComponent } from '@app/help/help.component';

// Loads application runtime config
export const appInitializerFn = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot(NBARoutes)
  ],
  entryComponents: [
    TopTeamsDialogComponent,
    MatchupDialogComponent,
    SimseasonDialogComponent,
    ResultsDialogComponent,
    PlayoffSeriesDialogComponent,
    StandingsDialogComponent,
    ConfirmDialogComponent,
    MatSpinner
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    TeamListComponent,
    TeamDetailsComponent,
    ScheduleComponent,
    ScheduleCalenderComponent,
    ScheduleDayComponent,
    ScheduleMonthComponent,
    StandingsComponent,
    StandingsDivisionComponent,
    ShowScoresComponent,
    ShowScoreComponent,
    TeamScheduleComponent,
    PlayoffsComponent,
    TopTeamsDialogComponent,
    MatchupDialogComponent,
    SimseasonDialogComponent,
    ResultsDialogComponent,
    MaterialElevationDirective,
    SpinnerButtonDirective,
    ShowSeriesComponent,
    PlayoffSeriesDialogComponent,
    CapitalizePipe,
    StandingsDialogComponent,
    StandingsChartComponent,
    ConfirmDialogComponent,
    HelpComponent
  ],
  providers: [
    TeamService,
    ScheduleService,
    PlayoffService,
    GameService,
    StorageService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ ConfigService ]
    }
  ],
  exports: [
    SpinnerButtonDirective
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
