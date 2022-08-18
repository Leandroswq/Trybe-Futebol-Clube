import MatchModel from './matchModel';
import TeamModel from './teamModel';
import UserModel from './userModel';

const models = {
  matchModel: MatchModel,
  teamModel: TeamModel,
  userModel: UserModel,
};

Object.values(models).forEach((model) => {
  model.associate(models);
});
