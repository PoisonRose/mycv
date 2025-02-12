/* eslint-disable @typescript-eslint/no-unused-vars */
import { rm } from 'fs/promises';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { appDataSource } from '../src/data-source';

let app: INestApplication;
let dataSource: DataSource;

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {
    /* empty */
  }

  await appDataSource.initialize();
  await appDataSource.runMigrations();
});

global.afterEach(async () => {
  await appDataSource.destroy();
});
