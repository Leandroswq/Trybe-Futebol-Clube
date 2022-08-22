import { ITeamName } from './teamInterface';

export interface matchWithoutIdUnassociated {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean
}

export interface matchWithoutIdAssociated {
  homeTeam: ITeamName
  homeTeamGoals: number
  awayTeam: ITeamName
  awayTeamGoals: number
  inProgress: boolean
}

export interface matchWithIdUnassociated extends matchWithoutIdUnassociated {
  id: number
}

export interface matchWithIdAssociated extends matchWithoutIdAssociated {
  id: number
}
