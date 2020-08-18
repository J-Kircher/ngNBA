import { Injectable } from '@angular/core';
import { ISchedule, ITeam, IPlayoffSeries } from '@app/model/nba.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StorageService {

  constructor() { }

  public loadScheduleFromLocalStorage(): ISchedule[] {
    // console.log('[storage.service] loadScheduleFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('NBAfullSchedule');

      if (configText) {
        config = JSON.parse(configText);
      // } else {
      //   this.storeScheduleToLocalStorage(config);
      }
      // console.log('[storage.service] loadScheduleFromLocalStorage() SUCCESS');
    } catch (e) {
      console.warn('[storage.service] loadScheduleFromLocalStorage() Error reading from local storage');
    }
    return config;
  }

  public storeScheduleToLocalStorage(newNBAfullSchedule: ISchedule[]): void {
    // console.log('[storage.service] storeScheduleToLocalStorage()');
    try {
      const configText = JSON.stringify(newNBAfullSchedule);
      localStorage.setItem('NBAfullSchedule', configText);
    } catch (e) {
      console.warn('[storage.service] storeScheduleToLocalStorage() Error reading from local storage');
    }
  }

  public clearScheduleFromStorage(): Observable<boolean> {
    const subject = new Subject<boolean>();
    localStorage.removeItem('NBAfullSchedule');
    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 50);
    return subject;
  }

  public loadTeamsFromLocalStorage(): ITeam[] {
    // console.log('[storage.service] loadTeamsFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('NBAteams');

      if (configText) {
        config = JSON.parse(configText);
      // } else {
      //   this.storeTeamsToLocalStorage(config);
      }
      // console.log('[storage.service] loadTeamsFromLocalStorage() SUCCESS');
    } catch (e) {
      console.warn('[storage.service] loadTeamsFromLocalStorage() Error reading from local storage');
    }
    return config;
  }

  public storeTeamsToLocalStorage(newNBAteams: ITeam[]): void {
    // console.log('[storage.service] storeTeamsToLocalStorage()');
    try {
      const configText = JSON.stringify(newNBAteams);
      localStorage.setItem('NBAteams', configText);
    } catch (e) {
      console.warn('[storage.service] storeTeamsToLocalStorage() Error reading from local storage');
    }
  }

  public clearTeamsFromStorage(): Observable<boolean> {
    const subject = new Subject<boolean>();
    localStorage.removeItem('NBAteams');
    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 50);
    return subject;
  }

  public loadPlayoffScheduleFromLocalStorage(): ISchedule[] {
    // console.log('[storage.service] loadPlayoffScheduleFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('NBAplayoffSchedule');

      if (configText) {
        config = JSON.parse(configText);
      }
    } catch (e) {
      console.warn('[storage.service] loadPlayoffScheduleFromLocalStorage() Error reading from local storage');
    }
    return config;
  }

  public storePlayoffScheduleToLocalStorage(newNBAplayoffSchedule: ISchedule[]): void {
    // console.log('[storage.service] storePlayoffScheduleToLocalStorage()');
    try {
      const configText = JSON.stringify(newNBAplayoffSchedule);
      localStorage.setItem('NBAplayoffSchedule', configText);
    } catch (e) {
      console.warn('[storage.service] storePlayoffScheduleToLocalStorage() Error reading from local storage');
    }
  }

  public clearPlayoffsFromStorage(): Observable<boolean> {
    const subject = new Subject<boolean>();
    localStorage.removeItem('NBAplayoffSeries');
    localStorage.removeItem('NBAplayoffSchedule');
    setTimeout(() => {
      subject.next(true);
      subject.complete();
    }, 50);
    return subject;
  }

  public loadPlayoffSeriesFromLocalStorage(): IPlayoffSeries[] {
    // console.log('[storage.service] loadPlayoffSeriesFromLocalStorage()');
    let config;

    try {
      const configText = localStorage.getItem('NBAplayoffSeries');

      if (configText) {
        config = JSON.parse(configText);
      }
    } catch (e) {
      console.warn('[storage.service] loadPlayoffSeriesFromLocalStorage() Error reading from local storage');
    }
    return config;
  }

  public storePlayoffSeriesToLocalStorage(newNBAplayoffSeries: IPlayoffSeries[]): void {
    // console.log('[storage.service] storePlayoffSeriesToLocalStorage()');
    try {
      const configText = JSON.stringify(newNBAplayoffSeries);
      localStorage.setItem('NBAplayoffSeries', configText);
    } catch (e) {
      console.warn('[storage.service] storePlayoffSeriesToLocalStorage() Error reading from local storage');
    }
  }
}
