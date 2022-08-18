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
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'UserModel',
  tableName: 'UserModel',

});

export default UserModel;
