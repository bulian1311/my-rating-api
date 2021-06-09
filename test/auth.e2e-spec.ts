import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'test@test.ru',
  password: '12345',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/auth/register (POST) - success', async (done) => {
  //   return request(app.getHttpServer())
  //     .post('/auth/register')
  //     .send(loginDto)
  //     .expect(201)
  //     .then(({ body }: request.Response) => {
  //       expect(body._id).toBeDefined();
  //       done();
  //     });
  // });

  it('/auth/login (POST) - success', (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - failure password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: 'dfsdfsdfsfsfsfhgh' })
      .expect(401, {
        statusCode: 401,
        message: 'Не верный логин или пароль.',
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - failure login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'qqq@qqq.qq' })
      .expect(401, {
        statusCode: 401,
        message: 'Пользователь не существует.',
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
