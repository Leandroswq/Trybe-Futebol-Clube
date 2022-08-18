import { Model, ModelStatic } from 'sequelize';

export type TModelsObject = {
  [key: string]: ModelStatic<Model>
};
