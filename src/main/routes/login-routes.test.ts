import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Roberio',
          email: 'roberio@roberio.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
  describe('POST /login', () => {
    test('Should return 200 on signup', async () => {
      const password = await hash('12345', 12)
      await accountCollection.insertOne({
        name: 'Roberio',
        email: 'roberio@roberio.com',
        password
      })
      await request(app).post('/api/login').send({
        email: 'roberio@roberio.com',
        password: '12345'
      }).expect(200)
    })

    test('Should return 401 on signup', async () => {
      await request(app).post('/api/login').send({
        email: 'roberio@roberio.com',
        password: '12345'
      }).expect(401)
    })
  })
})
