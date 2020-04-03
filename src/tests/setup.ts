/* eslint-disable @typescript-eslint/no-namespace */

import 'reflect-metadata';
import HttpException, { HttpErrorType } from '../utils/HttpException';
import { Connection } from 'typeorm';
import createSqlConnection from '../server/sql';

let conn: Connection;

beforeAll(async () => {
  conn = await createSqlConnection({ suffix: '-test' });
});

afterAll(async () => {
  await conn.close();
});

interface ToFailParams {
  message: string;
  status: number;
  error?: HttpErrorType;
}

expect.extend({
  toFail(receivedError: HttpException, expectedError: ToFailParams) {
    const { printExpected, printReceived } = this.utils;

    if (receivedError.constructor !== HttpException) {
      return {
        message: () => `Received error is not of type HttpException
        
        Expected: ${printExpected(HttpException)}
        Received: ${printReceived(receivedError.constructor)}`,
        pass: false,
      };
    }

    if (receivedError?.message !== expectedError.message) {
      return {
        message: () => `Incorrect error message
        
        Expected: ${printExpected(expectedError.message)}
        Received: ${printReceived(receivedError.message)}`,
        pass: false,
      };
    }

    if (receivedError?.status !== expectedError.status) {
      return {
        message: () => `Incorrect status code
        
        Expected: ${printExpected(expectedError.status)}
        Received: ${printReceived(receivedError.status)}`,
        pass: false,
      };
    }

    if (expectedError?.error && receivedError.error !== expectedError.error) {
      return {
        message: () => `Incorrect error status
        
        Expected: ${printExpected(expectedError.error)}
        Received: ${printReceived(receivedError.error)}`,
        pass: false,
      };
    }

    return {
      message: () => '',
      pass: true,
    };
  },
});

declare global {
  // eslint-disable-next-line no-redeclare
  namespace jest {
    interface Matchers<R> {
      toFail: (error: ToFailParams) => Promise<CustomMatcherResult>;
    }
  }
}
