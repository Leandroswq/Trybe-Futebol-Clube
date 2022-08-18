import { Model, DataTypes } from 'sequelize';
import db from './connection/tfc';
import { TModelsObject } from './types/TModel';

class TeamModel extends Model {
  id!: number;
  teamName!: string;

  static associate(models: TModelsObject) {
    TeamModel.hasMany(models.matchModel, {
      foreignKey: 'homeTeam',
      as: 'teamsHome',
    });

    TeamModel.hasMany(models.matchModel, {
      foreignKey: 'awayTeam',
      as: 'teamAway',
    });
  }
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'TeamModel',
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default TeamModel;
