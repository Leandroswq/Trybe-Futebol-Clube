import { Model, DataTypes } from 'sequelize';
import db from './connection/tfc';

class UserModel extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;

  static associate(_model: object) { }
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'UserModel',
  tableName: 'users',
  timestamps: false,
});

export default UserModel;
