import { Model, DataTypes } from 'sequelize';
import db from './connection/tfc';

class TeamModel extends Model {
  id!: number;
  teamName!: string;

  static associate(_model: object) { }
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING(50),
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
