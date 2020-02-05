import { ITeam } from '../model/nba.model';

export const _TEAMS: ITeam[] = [
  { 'city': 'Boston',        'name': 'Celtics',       'abbrev': 'BOS', 'lightcolor': 'FFFFFF', 'darkcolor': '008C4A', 'chartcolor': '008C4A', 'division': 'East Atlantic',  'of': 7, 'de': 7, 'co': 7 },
  { 'city': 'Brooklyn',      'name': 'Nets',          'abbrev': 'BKN', 'lightcolor': 'FEFFFC', 'darkcolor': '040006', 'chartcolor': '040006', 'division': 'East Atlantic',  'of': 7, 'de': 5, 'co': 7 },
  { 'city': 'New York',      'name': 'Knicks',        'abbrev': 'NYK', 'lightcolor': 'F48328', 'darkcolor': '1D419D', 'chartcolor': 'F48328', 'division': 'East Atlantic',  'of': 6, 'de': 6, 'co': 7 },
  { 'city': 'Philadelphia',  'name': '76ers',         'abbrev': 'PHI', 'lightcolor': 'D50032', 'darkcolor': '113CA4', 'chartcolor': '113CA4', 'division': 'East Atlantic',  'of': 6, 'de': 6, 'co': 7 },
  { 'city': 'Toronto',       'name': 'Raptors',       'abbrev': 'TOR', 'lightcolor': '868B8D', 'darkcolor': 'A81332', 'chartcolor': 'A81332', 'division': 'East Atlantic',  'of': 7, 'de': 8, 'co': 7 },
  { 'city': 'Chicago',       'name': 'Bulls',         'abbrev': 'CHI', 'lightcolor': 'CE0000', 'darkcolor': '000000', 'chartcolor': 'CE0000', 'division': 'East Central',   'of': 6, 'de': 8, 'co': 7 },
  { 'city': 'Cleveland',     'name': 'Cavaliers',     'abbrev': 'CLE', 'lightcolor': 'FFB81C', 'darkcolor': '6E253C', 'chartcolor': 'FFB81C', 'division': 'East Central',   'of': 8, 'de': 6, 'co': 7 },
  { 'city': 'Detroit',       'name': 'Pistons',       'abbrev': 'DET', 'lightcolor': 'F70029', 'darkcolor': '08428C', 'chartcolor': 'F70029', 'division': 'East Central',   'of': 5, 'de': 8, 'co': 7 },
  { 'city': 'Indiana',       'name': 'Pacers',        'abbrev': 'IND', 'lightcolor': 'FFCE31', 'darkcolor': '003163', 'chartcolor': 'FFCE31', 'division': 'East Central',   'of': 6, 'de': 7, 'co': 7 },
  { 'city': 'Milwaukee',     'name': 'Bucks',         'abbrev': 'MIL', 'lightcolor': 'E2D4AE', 'darkcolor': '2B4E35', 'chartcolor': '2B4E35', 'division': 'East Central',   'of': 6, 'de': 7, 'co': 7 },
  { 'city': 'Atlanta',       'name': 'Hawks',         'abbrev': 'ATL', 'lightcolor': 'CC002D', 'darkcolor': '000000', 'chartcolor': 'CC002D', 'division': 'East Southeast', 'of': 6, 'de': 7, 'co': 7 },
  { 'city': 'Charlotte',     'name': 'Hornets',       'abbrev': 'CHA', 'lightcolor': '008BA7', 'darkcolor': '1F1260', 'chartcolor': '008BA7', 'division': 'East Southeast', 'of': 6, 'de': 7, 'co': 7 },
  { 'city': 'Miami',         'name': 'Heat',          'abbrev': 'MIA', 'lightcolor': 'FAA11B', 'darkcolor': '000000', 'chartcolor': 'FAA11B', 'division': 'East Southeast', 'of': 6, 'de': 8, 'co': 7 },
  { 'city': 'Orlando',       'name': 'Magic',         'abbrev': 'ORL', 'lightcolor': 'C8C6C5', 'darkcolor': '0C56BD', 'chartcolor': '0C56BD', 'division': 'East Southeast', 'of': 5, 'de': 6, 'co': 7 },
  { 'city': 'Washington',    'name': 'Wizards',       'abbrev': 'WAS', 'lightcolor': 'E31835', 'darkcolor': '07295D', 'chartcolor': '07295D', 'division': 'East Southeast', 'of': 8, 'de': 6, 'co': 7 },
  { 'city': 'Dallas',        'name': 'Mavericks',     'abbrev': 'DAL', 'lightcolor': '8C8C8C', 'darkcolor': '006BB5', 'chartcolor': '8C8C8C', 'division': 'West Southwest', 'of': 5, 'de': 8, 'co': 7 },
  { 'city': 'Houston',       'name': 'Rockets',       'abbrev': 'HOU', 'lightcolor': 'FFFFFF', 'darkcolor': 'BD0031', 'chartcolor': 'BD0031', 'division': 'West Southwest', 'of': 9, 'de': 6, 'co': 7 },
  { 'city': 'New Orleans',   'name': 'Pelicans',      'abbrev': 'NOP', 'lightcolor': 'BA995C', 'darkcolor': '102F5D', 'chartcolor': 'BA995C', 'division': 'West Southwest', 'of': 6, 'de': 7, 'co': 7 },
  { 'city': 'Memphis',       'name': 'Grizzlies',     'abbrev': 'MEM', 'lightcolor': '8C9CC6', 'darkcolor': '00214A', 'chartcolor': '8C9CC6', 'division': 'West Southwest', 'of': 5, 'de': 9, 'co': 7 },
  { 'city': 'San Antonio',   'name': 'Spurs',         'abbrev': 'SAN', 'lightcolor': 'CECECE', 'darkcolor': '000000', 'chartcolor': '555555', 'division': 'West Southwest', 'of': 7, 'de': 9, 'co': 7 },
  { 'city': 'Denver',        'name': 'Nuggets',       'abbrev': 'DEN', 'lightcolor': 'FCC916', 'darkcolor': '015EC5', 'chartcolor': 'FCC916', 'division': 'West Northwest', 'of': 8, 'de': 5, 'co': 7 },
  { 'city': 'Minnesota',     'name': 'Timberwolves',  'abbrev': 'MIN', 'lightcolor': '00A950', 'darkcolor': '005084', 'chartcolor': '00A950', 'division': 'West Northwest', 'of': 7, 'de': 6, 'co': 7 },
  { 'city': 'Oklahoma City', 'name': 'Thunder',       'abbrev': 'OKC', 'lightcolor': '017AC6', 'darkcolor': 'F35031', 'chartcolor': '017AC6', 'division': 'West Northwest', 'of': 7, 'de': 7, 'co': 7 },
  { 'city': 'Portland',      'name': 'Trail Blazers', 'abbrev': 'POR', 'lightcolor': 'BDBDBD', 'darkcolor': 'E73942', 'chartcolor': 'E73942', 'division': 'West Northwest', 'of': 7, 'de': 6, 'co': 7 },
  { 'city': 'Utah',          'name': 'Jazz',          'abbrev': 'UTH', 'lightcolor': '274E37', 'darkcolor': '072244', 'chartcolor': '274E37', 'division': 'West Northwest', 'of': 5, 'de': 9, 'co': 7 },
  { 'city': 'Golden State',  'name': 'Warriors',      'abbrev': 'GSW', 'lightcolor': 'FEC525', 'darkcolor': '0A68B4', 'chartcolor': '0A68B4', 'division': 'West Pacific',   'of': 9, 'de': 7, 'co': 7 },
  { 'city': 'Los Angeles',   'name': 'Clippers',      'abbrev': 'LAC', 'lightcolor': 'DE0000', 'darkcolor': '00009C', 'chartcolor': 'DE0000', 'division': 'West Pacific',   'of': 7, 'de': 7, 'co': 7 },
  { 'city': 'Los Angeles',   'name': 'Lakers',        'abbrev': 'LAL', 'lightcolor': 'FFB500', 'darkcolor': '7B10A5', 'chartcolor': 'FFB500', 'division': 'West Pacific',   'of': 6, 'de': 5, 'co': 7 },
  { 'city': 'Phoenix',       'name': 'Suns',          'abbrev': 'PHO', 'lightcolor': 'FCA123', 'darkcolor': '000200', 'chartcolor': 'FCA123', 'division': 'West Pacific',   'of': 7, 'de': 5, 'co': 7 },
  { 'city': 'Sacramento',    'name': 'Kings',         'abbrev': 'SAC', 'lightcolor': '6B4A8C', 'darkcolor': '000000', 'chartcolor': '6B4A8C', 'division': 'West Pacific',   'of': 6, 'de': 6, 'co': 7 },
];

// Created on Mon Jan 27, 2020
// Updated chart colors on Feb 5, 2020
// end of NBATeams2019
