import { isUUID } from 'validator';
import { toString } from './queryParam';

export function validateID(uuid?: string | string[]): string {
  if (!uuid) {
    throw new Error('no id given');
  }

  const id = toString(uuid);

  if (!isUUID(id)) {
    throw new Error('invalid uuid');
  }

  return id;
}
