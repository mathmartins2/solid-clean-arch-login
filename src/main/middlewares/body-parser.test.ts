import request from 'supertest'
import app from '../config/app'

describe('Body Parser middleware', () => {
  test('Should parse body as JSON', async () => {
    app.post('/test_json', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_json')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
