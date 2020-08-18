import { ITeam } from '@app/model/nba.model';

export function calculateOdds(t1: ITeam, t2: ITeam): number {

  // console.log('calculateOdds() ' + t1.name + ' at ' + t2.name);

  const spreadMax = 17;

  const total1 = (t1.of + t1.de + t1.co) || 0;
  const total2 = (t2.of + t2.de + t2.co) || 0;

  // console.log('calculateOdds() total1: ' + total1 + ', total2: ' + total2);

  const games1 = ((t1.wins + t1.losses) > 0) ? (t1.wins + t1.losses) : 1;
  const games2 = ((t2.wins + t2.losses) > 0) ? (t2.wins + t2.losses) : 1;

  // console.log('calculateOdds() games1: ' + games1 + ', games2: ' + games2);

  const avgWin1 = ((t1.pf - t1.pa) || 0) / games1;
  const avgWin2 = ((t2.pf - t2.pa) || 0) / games2;

  // console.log('calculateOdds() avgWin1: ' + avgWin1 + ', avgWin2: ' + avgWin2);

  let spread = (Math.round(((total2 - total1) + (avgWin2 - avgWin1) / 2) * 2)) / 2;

  if (spread > spreadMax) {
    spread = spreadMax;
  }

  if (spread < spreadMax * -1) {
    spread = spreadMax * -1;
  }

  // console.log('calculateOdds() spread: ' + spread);
  return spread;
}

export function getOddsText(odds: number, visit: string, home: string): string {
  if (odds === 0) {
    return 'Even';
  } else {
    if (odds > 0) {
      return home + ' -' + odds;
    } else {
      return visit + ' ' + odds;
    }
  }
}
