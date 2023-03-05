import AppUser from '../../database/model/app-user';
import _ from 'lodash';

export const enum AccessMode {
  LOGIN = 'LOGIN',
  REGISTRATION = 'REGISTRATION',
}

export async function getUserData (user: AppUser) {
  const data = _.pick(user, ['_id', 'name', 'roles', 'email']);
  return data;
}