/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-lines-per-function */
/* eslint-disable mocha/no-mocha-arrows */
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// service

import MatchService from '../services/matchService';

// mocks

import leaderBoardMocks from './mocks/leaderBoardMocks';

// helpers
import deepCopy from './helpers/deepCopy'
import Token from '../helpers/token'
import TeamService from '../services/teamService';

chai.use(chaiHttp);

const { expect } = chai;
const request = () => chai.request(app)

describe('Testa se a rota /leaderboard o método', () => {
  afterEach(() => {
    sinon.restore()
  })
  describe('get, em caso de sucesso', () => {
    it('retorna o status 200 com as informações do placar geral',async () => {
      sinon.stub(MatchService, 'getByProgress').resolves(leaderBoardMocks.matches)

      const response = await request().get('/leaderboard')

      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal(leaderBoardMocks.leaderBoard)
    })
  })
})

describe('Testa se a rota /leaderboard/home o método', () => {
  afterEach(() => {
    sinon.restore()
  })
  describe('get, em caso de sucesso', () => {
    it('retorna o status 200 com as informações do placar em casa',async () => {
      sinon.stub(MatchService, 'getByProgress').resolves(leaderBoardMocks.matches)

      const response = await request().get('/leaderboard/home')

      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal(leaderBoardMocks.leaderBoardHome)
    })
  })
})
