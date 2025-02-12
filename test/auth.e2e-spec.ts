import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'asdlkjq4321@akl.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'alskdfjl' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf@asdf.com';

    //create a persistent agent that maintains cookies across requests
    const agent = request.agent(app.getHttpServer());

    //signup and store the session cookie
    await agent
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);

    //call /auth/whoami with the stored session
    const { body } = await agent.get('/auth/whoami').expect(200);

    expect(body.email).toEqual(email);
  });
});
