/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-lines-per-function */
/* eslint-disable mocha/no-mocha-arrows */
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// mocks
import loginMocks from './mocks/loginMocks';
import userMocks from './mocks/userMocks'

// model
import UserModel from '../database/models/userModel'
import { Model } from 'sequelize/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa na rota /login o método', () => {
  const request = () => chai.request(app)
  afterEach(() => {
    sinon.restore()
  })

  describe('post, em caso de sucesso', () => {

    it('retorna o status 200', async () => {
    sinon.stub(UserModel, 'findOne')
    .resolves(userMocks.user as UserModel)

      const response = await request()
        .post('/login')
        .send(loginMocks.admin)
      expect(response.status).to.equal(200)
    })

    it('retorna um token de validação', async () => {
    sinon.stub(UserModel, 'findOne')
    .resolves(userMocks.user as UserModel)

      const response = await request()
        .post('/login')
        .send(loginMocks.admin)

      expect(response.body).to.have.property('token')
      expect(response.body.token).to.be.a('string')
    })
  })

});
