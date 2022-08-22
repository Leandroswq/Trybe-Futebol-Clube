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
import Token from '../helpers/token'
import TeamService from '../services/teamService';

const token = Token.generate({ user: { id: 1 } })

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

  describe('post, em caso de sucesso', () => {
    it('cria uma partida', async () => {
      sinon.stub(MatchModel, 'create')
        .resolves(matchesMocks.match as MatchModel)

      const response = await request().post('/matches')
        .send(matchesMocks.createMatch)
        .set({ Authorization: token })


      expect(response.status).to.equal(201)
      expect(response.body).to.deep.equal(matchesMocks.match)
    })
  })

  describe('post, em caso de falha', () => {
    it(`retorna o status 401 com a mensagem 
    "It is not possible to create a match with two equal teams",
     se for passado dois times iguais no corpo da requisição`, async () => {
      sinon.stub(MatchModel, 'create')
        .resolves(matchesMocks.match as MatchModel)

      const response = await request().post('/matches')
        .send(matchesMocks.createMatchWithSameTeams)
        .set({ Authorization: token })


      expect(response.status).to.equal(401)
      expect(response.body).to.deep.equal({
        message: "It is not possible to create a match with two equal teams"
      })
    })

    it(`retorna o status 401 com a mensagem 
    "Token must be a valid token", se for passado
     um token invalido`, async () => {
      sinon.stub(MatchModel, 'create')
        .resolves(matchesMocks.match as MatchModel)

      const response = await request().post('/matches')
        .send(matchesMocks.createMatchWithSameTeams)
        .set({ Authorization: 'ddd' })

      expect(response.status).to.equal(401)
      expect(response.body).to.deep.equal({
        message: "Token must be a valid token"
      })
    })

    it(`retorna o status 404 com a mensagem
    "There is no team with such id!" 
    caso algum dos times não existam`, async () => {
      sinon.stub(MatchModel, 'create')
        .resolves(undefined)

      sinon.stub(TeamService, 'getById').resolves(undefined)

      const response = await request().post('/matches')
        .send(matchesMocks.createMatch)
        .set({ Authorization: token})

      expect(response.status).to.equal(404)
      expect(response.body).to.deep.equal({
        message: "There is no team with such id!"
      })
    })
  })
})