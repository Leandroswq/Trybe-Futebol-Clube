// import MatchModel from '../database/models/matchModel';
import MatchService from './matchService';
import { IScoreboard } from './types/leaderBoardInterface';
import { matchWithIdAssociated } from './types/matchInterface';
import '../database/models/createAssociate';

export default class LeaderBoardService {
  private static addTotalPoints(
    homeTeam: IScoreboard,
    awayTeam: IScoreboard,
    match: matchWithIdAssociated,
  ) {
    const home = homeTeam;
    const away = awayTeam;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      home.totalPoints += 3;
      away.totalPoints += 0;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      home.totalPoints += 0;
      away.totalPoints += 3;
    } else {
      home.totalPoints += 1;
      away.totalPoints += 1;
    }

    return [home, away];
  }

  private static addTotalGames(
    homeTeam: IScoreboard,
    awayTeam: IScoreboard,
  ) {
    const home = homeTeam;
    const away = awayTeam;
    home.totalGames += 1;
    away.totalGames += 1;

    return [home, away];
  }

  private static addTotalResults(
    homeTeam: IScoreboard,
    awayTeam: IScoreboard,
    match: matchWithIdAssociated,
  ) {
    const home = homeTeam;
    const away = awayTeam;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      home.totalVictories += 1;
      away.totalLosses += 1;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      home.totalLosses += 1;
      away.totalVictories += 1;
    } else {
      home.totalDraws += 1;
      away.totalDraws += 1;
    }

    return [home, away];
  }

  private static addTotalGols(
    homeTeam: IScoreboard,
    awayTeam: IScoreboard,
    match: matchWithIdAssociated,
  ) {
    const home = homeTeam;
    const away = awayTeam;
    home.goalsFavor += match.homeTeamGoals;
    home.goalsOwn += match.awayTeamGoals;

    away.goalsFavor += match.awayTeamGoals;
    away.goalsOwn += match.homeTeamGoals;

    home.goalsBalance = home.goalsFavor - home.goalsOwn;
    away.goalsBalance = away.goalsFavor - away.goalsOwn;

    return [home, away];
  }

  private static calculateEfficiency(team: IScoreboard) {
    const aux = team;

    const efficiency = (team.totalPoints / (team.totalGames * 3)) * 100;
    aux.efficiency = efficiency.toFixed(2);

    return aux;
  }

  private static createEmptyScore(name: string) {
    const emptyScore = {
      name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0.00',
    };
    return emptyScore as IScoreboard;
  }

  private static updateScore(
    homeTeam: IScoreboard,
    awayTeam: IScoreboard,
    match: matchWithIdAssociated,
  ) {
    let [home, away] = this.addTotalPoints(homeTeam, awayTeam, match);
    [home, away] = this.addTotalGames(home, away);
    [home, away] = this.addTotalResults(home, away, match);
    [home, away] = this.addTotalGols(home, away, match);

    home = this.calculateEfficiency(home);
    away = this.calculateEfficiency(away);

    return [home, away];
  }

  static async createScoreBoard(matches: matchWithIdAssociated[]) {
    const scoreboard = matches.reduce((
      prev: { [key: string]: IScoreboard },
      curr,
    ) => {
      const prevAux = prev;
      const [homeId, homeName] = [curr.homeTeam, curr.teamHome.teamName];
      const [awayId, awayName] = [curr.awayTeam, curr.teamAway.teamName];

      let home = prevAux[homeId] ? prevAux[homeId] : this.createEmptyScore(homeName);
      let away = prevAux[awayId] ? prevAux[awayId] : this.createEmptyScore(awayName);

      [home, away] = this.updateScore(home, away, curr);
      prevAux[homeId] = home;
      prevAux[awayId] = away;

      return prevAux;
    }, {});

    return Object.values(scoreboard);
  }

  static async createScoreBoardHome(matches: matchWithIdAssociated[]) {
    const away = this.createEmptyScore('away');

    const scoreboard = matches.reduce((
      prev: { [key: string]: IScoreboard },
      curr,
    ) => {
      const prevAux = prev;
      const [homeId, homeName] = [curr.homeTeam, curr.teamHome.teamName];

      let home = prevAux[homeId] ? prevAux[homeId] : this.createEmptyScore(homeName);

      [home] = this.updateScore(home, away, curr);
      prevAux[homeId] = home;

      return prevAux;
    }, {});

    return Object.values(scoreboard);
  }

  static async teste() {
    const matches = await MatchService.getByProgress(false);
    const scoreboard = await this.createScoreBoardHome(matches);

    scoreboard.sort((b, a) => a.totalPoints - b.totalPoints
    || a.totalVictories - b.totalVictories
    || a.goalsBalance - b.goalsBalance
    || a.goalsFavor - b.goalsFavor
    || a.goalsOwn - b.goalsOwn);

    return scoreboard;
  }
}
