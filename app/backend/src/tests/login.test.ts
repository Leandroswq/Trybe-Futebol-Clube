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

// helpers
import deepCopy from './helpers/deepCopy'

// services
import userService from '../services/userService';

chai.use(chaiHttp);

const { expect } = chai;
const request = () => chai.request(app)

describe('Testa se a rota /login o método', () => {
  afterEach(() => {
    sinon.restore()
  })

  beforeEach(() => {
    sinon.stub(UserModel, 'findOne')
      .resolves(userMocks.user as UserModel)
  })

  describe('post, em caso de sucesso', () => {

    it('retorna o status 200', async () => {

      const response = await request()
        .post('/login')
        .send(loginMocks.admin)
      expect(response.status).to.equal(200)
    })

    it('retorna um token de validação', async () => {

      const response = await request()
        .post('/login')
        .send(loginMocks.admin)

      expect(response.body).to.have.property('token')
      expect(response.body.token).to.be.a('string')
    })
  })

  describe('post, em caso de falha', () => {
    describe('retorna o status 400 com a mensagem "All fields must be filled",', () => {
      it(' caso o email não seja preenchido', async () => {
        const message = 'All fields must be filled'
        let login = deepCopy(loginMocks.admin)
        login.email = ''

        let response = await request()
          .post('/login')
          .send(login)
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.be.equal(message)

        delete login.email

        response = await request()
          .post('/login')
          .send(login)
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.be.equal(message)

      })

      it(' caso o password não seja preenchido', async () => {
        const message = 'All fields must be filled'
        let login = deepCopy(loginMocks.admin)
        login.password = ''

        let response = await request()
          .post('/login')
          .send(login)
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.be.equal(message)

        delete login.password

        response = await request()
          .post('/login')
          .send(login)
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.be.equal(message)

      })
    })

    describe('retorna o status 401 com a mensagem "Incorrect email or password", caso', () => {
      it("o email seja invalido", async () => {
        const message = "Incorrect email or password"
        sinon.stub(userService, 'getByEmail').resolves(undefined)
        const login = {
          email: "email invalido",
          password: "password"
        }

        const response = await request()
          .post('/login')
          .send(login)

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.be.equal(message)
      })
    })

    it("o password esteja incorreto", async () => {
      const message = "Incorrect email or password"

      const login = deepCopy(loginMocks.admin)
      login.password = 'password incorreto'

      const response = await request()
        .post('/login')
        .send(login)

      expect(response.status).to.equal(401)
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.be.equal(message)
    })
  })
})

describe('Testa se a rota /login/validate o método', () => {
  afterEach(() => {
    sinon.restore()
  })

  beforeEach(() => {
    sinon.stub(UserModel, 'findByPk')
      .resolves(userMocks.user as UserModel)

    sinon.stub(UserModel, 'findOne')
      .resolves(userMocks.user as UserModel)
  })
  describe('em caso de sucesso', () => {
    it('retorna o status 200 e o "role" do usuário', async () => {
      const { body: { token } } = await request()
        .post('/login')
        .send(loginMocks.admin)
      
        const response = await request()
        .get('/login/validate')
        .set({Authorization: token})
      
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("role")
        expect(response.body.role).to.equal(userMocks.user.role)
    })
  })
})