/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-lines-per-function */
/* eslint-disable mocha/no-mocha-arrows */
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// model
import TeamModel from '../database/models/teamModel';

// mocks
import teamMocks from './mocks/teamMocks';

chai.use(chaiHttp);

const { expect } = chai;
const request = () => chai.request(app)

describe('Testa se a rota /team o método', () => {
  afterEach(() => {
    sinon.restore()
  })

  beforeEach(() => {
    sinon.stub(TeamModel, 'findAll')
    .resolves(teamMocks.teams as TeamModel[])
  })

  describe('get, em caso de sucesso', () => {
    it('retorna todos os times', async () => {
      const response = await request()
      .get('/teams')
      
      expect(response.status).to.equal(200)
      expect(response.body).to.a('array')
      expect(response.body).to.deep.equal(teamMocks.teams)
    })
  })
})

describe('Testa se a rota /team/:id o método', () => {
  afterEach(() => {
    sinon.restore()
  })

  beforeEach(() => {
    sinon.stub(TeamModel, 'findByPk')
    .resolves(teamMocks.team as TeamModel)
  })

  describe('get, em caso de sucesso', () => {
    it('retorna o time passado pelo parâmetro id', async () => {
      const response = await request()
      .get('/teams/1')
      
      expect(response.status).to.equal(200)
      expect(response.body).to.a('object')
      expect(response.body).to.deep.equal(teamMocks.team)
    })
  })
})