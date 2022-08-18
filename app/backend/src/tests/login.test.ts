import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa na rota /login o método', () => {
  afterEach(()=>{
    sinon.restore()
  })

  describe('post, em caso de sucesso', () => {
    it('retorna o status 200', async () => {
      const response = await chai.request(app).get('/login')
      console.log(response.status);
      
      expect(response.status).to.equal(400)
    })

    it('retorna um token de validação', async () => {
      const response = await chai.request(app).get('/login')

      expect(response.body).to.have.property('a')
      expect(response.body.token).to.be.a('string')
    })
  })

});
