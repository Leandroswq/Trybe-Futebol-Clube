import { DataTypes, Model } from 'sequelize';
import db from './connection/tfc';
import { TModelsObject } from './types/TModel';

class MatchModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;

  static associate(models: TModelsObject) {
    MatchModel.belongsTo(models.teamModel, {
      foreignKey: 'homeTeam',
      as: 'teamHome',
    });

    MatchModel.belongsTo(models.teamModel, {
      foreignKey: 'awayTeam',
      as: 'teamAway',
    });
  }
}

MatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'MatchModel',
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

export default MatchModel;
