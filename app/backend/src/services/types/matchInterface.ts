import { ITeamName } from './teamInterface';

export interface matchWithoutIdUnassociatedBase{
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export interface matchWithoutIdAssociatedBase{
  homeTeam: ITeamName
  homeTeamGoals: number
  awayTeam: ITeamName
  awayTeamGoals: number

}

export interface matchWithoutIdUnassociated {
  inProgress: boolean
}

export interface matchWithoutIdAssociated {
  inProgress: boolean
}

export interface matchWithIdUnassociated extends matchWithoutIdUnassociated {
  id: number
}

export interface matchWithIdAssociated extends matchWithoutIdAssociated {
  id: number
}
