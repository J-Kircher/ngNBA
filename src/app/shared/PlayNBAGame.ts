import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ISchedule, ITeam } from '../model/nba.model';
import { calculateOdds } from '@app/common/odds';

export class PlayNBAGame {

  // Called by services (schedule.service and playoff.service)
  static playNBAGame(game: ISchedule, vTeam: ITeam, hTeam: ITeam, simFast: boolean): Observable<ISchedule> {
    // console.log('[PlayNBAGame] playNBAGame() started');

    const timeout = simFast ? 10 : 1000;
    const subject = new Subject<ISchedule>();
    const gameCounter = 4;
    const gameMax = 6;
    const self = this;

    game.visitScore = 0;
    game.homeScore = 0;

    game.visitRecord = vTeam.wins + '-' + vTeam.losses;
    game.homeRecord = hTeam.wins + '-' + hTeam.losses;

    game.spread = calculateOdds(vTeam, hTeam);

    (function theLoop (i) {
      setTimeout(() => {
        let quarter = 'X';
        switch (i) {
          case 0: quarter = '1'; break;
          case 1: quarter = '2'; break;
          case 2: quarter = '3'; break;
          case 3: quarter = '4'; break;
          case 4: case 5: case 6: quarter = 'OT'; break;
          default: return 'U';
        }
        const hScore: number = self.generateNBAScore(self, 'h', vTeam, hTeam, i, quarter, gameMax);
        // console.log('[PlayNBAGame] playNBAGame() hScore: ' + hScore);
        const vScore: number = self.generateNBAScore(self, 'v', vTeam, hTeam, i, quarter, gameMax);
        // console.log('[PlayNBAGame] playNBAGame() vScore: ' + vScore);

        game.quarter = quarter;
        game.homeScore += hScore;
        game.visitScore += vScore;
        game.gameResults.push({ visitTeam: game.visitTeam, visitScore: vScore,
          homeTeam: game.homeTeam, homeScore: hScore, quarter: quarter });

        i++;
        if ((i < gameCounter) || ((i < gameMax) && (game.visitScore === game.homeScore))) {
          if (i >= gameCounter) {
            // console.log('[PlayNBAGame] playNBAGame() Game: ' + game.id + ' - OVERTIME! (' + gameCounter + ')');
          }
          theLoop(i);
        } else {
          if (game.visitScore === game.homeScore) {
            // console.log('[PlayNBAGame] playNBAGame() Game: ' + game.id + ' - FORCED OVERTIME!');
            game.homeScore += 2;
            game.gameResults.push({ visitTeam: game.visitTeam, visitScore: vScore,
              homeTeam: game.homeTeam, homeScore: hScore, quarter: 'OT' });
            }
          // console.log('[PlayNBAGame] playNBAGame() game over');
          subject.complete();
        }
      }, timeout);
    })(0);

    setTimeout(() => { subject.next(game); }, 0);
    return subject;
  }

  // Called internally by playNBAGame
  static generateNBAScore(self: any, teamToCalc: string, vTeam: ITeam, hTeam: ITeam,
    gameCounter: number, quarter: string, gameMax: number): number {
    // console.log('[PlayNBAGame] generateNBAScore() gameCounter: ' + gameCounter + ', gameMax: ' + gameMax + ', quarter: ' + quarter);

    if (gameCounter < gameMax) {
      return this.determineScore (self, teamToCalc, hTeam, vTeam, quarter);
    } else {
      if (teamToCalc === 'h') {
        // console.log('[PlayNBAGame] generateNBAScore() OT reached max, home wins');
        return 1;
      } else {
        // console.log('[PlayNBAGame] generateNBAScore() OT reached max, visit loses');
        return 0;
      }
    }
  }

  // Called internally by generateNBAScore
  static determineScore(self: any, teamToCalc: string, homeTeam: ITeam, visitTeam: ITeam, quarter: string): number {

    let score: number = 0;
    const extra = quarter === 'OT' ? 10 : 28;

    if (teamToCalc === 'h') {
      const homeTry = Math.floor(Math.random() * homeTeam.of);
      const visitTry = Math.floor(Math.random() * visitTeam.de);
      score = Math.round(extra + homeTry - visitTry);
    } else {
      const homeTry = Math.floor(Math.random() * homeTeam.de);
      const visitTry = Math.floor(Math.random() * visitTeam.of);
      score = Math.round(extra + visitTry - homeTry);
    }
    // console.log('[PlayNBAGame] determineScore() score: ' + score);
    return score;
  }
}
