/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-lines-per-function */
/* eslint-disable mocha/no-mocha-arrows */
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// model

import MatchModel from '../database/models/matchModel';

import matchesMocks from './mocks/matchesMocks'

// helpers
import deepCopy from './helpers/deepCopy'


chai.use(chaiHttp);

const { expect } = chai;
const request = () => chai.request(app)

describe('Testa se a rota /matches o método', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('get, em caso de sucesso', () => {
    it('Retorna todas as partidas, se não for passado nenhuma query', async () => {
      sinon.stub(MatchModel, 'findAll')
      .resolves(matchesMocks.allMatches as unknown as MatchModel[])

      const response = await request().get('/matches')
      expect(response.body).to.deep.equal(matchesMocks.allMatches)
    })

    it('Retorna partidas em progresso, se for passado a  query string inProgress=true', async () => {
      sinon.stub(MatchModel, 'findAll')
      .resolves(matchesMocks.inProgress as unknown as MatchModel[])

      const response = await request().get('/matches?inProgress=true')
      expect(response.body).to.deep.equal(matchesMocks.inProgress)
    })

    it('Retorna partidas em progresso, se for passado a  query string inProgress=false', async () => {
      sinon.stub(MatchModel, 'findAll')
      .resolves(matchesMocks.notInProgress as unknown as MatchModel[])

      const response = await request().get('/matches?inProgress=true')
      expect(response.body).to.deep.equal(matchesMocks.notInProgress)
    })
  })
})