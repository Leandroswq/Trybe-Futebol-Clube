import { ITeamName } from './teamInterface';

export interface matchGoals{
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface matchWithoutIdUnassociatedBase extends matchGoals{
  homeTeam: number;
  awayTeam: number;
}

export interface matchWithoutIdAssociatedBase extends matchGoals{
  homeTeam: ITeamName
  awayTeam: ITeamName
}

export interface matchWithoutIdUnassociated extends matchWithoutIdUnassociatedBase{
  inProgress: boolean
}

export interface matchWithoutIdAssociated extends matchWithoutIdAssociatedBase {
  inProgress: boolean
}

export interface matchWithIdUnassociated extends matchWithoutIdUnassociated {
  id: number
}

export interface matchWithIdAssociated extends matchWithoutIdAssociated {
  id: number
}
