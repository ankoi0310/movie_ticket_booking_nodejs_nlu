import { Request } from 'express';
import User from '../database/model/app-user';
import ApiKey from '../database/model/api-key';
import Keystore from '../database/model/keystore';

declare interface PublicRequest extends Request {
  apiKey: ApiKey;
  movieId: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleTypes: string[];
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}