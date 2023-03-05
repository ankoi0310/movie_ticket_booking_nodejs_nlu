import express, { NextFunction } from 'express';
import ApiKeyRepo from '../database/repository/api-key';
import { Forbidden } from '../core/handler/app-error';
import Logger from '../core/log/logger';
import { PublicRequest } from 'app-request';
import schema from './schema';
import validator, { ValidationSource } from '../helper/validator';
import asyncHandler from '../core/handler/async';
import { Header } from '../core/util';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next: NextFunction) => {
    const key = req.headers[Header.API_KEY]?.toString();
    if (!key) throw new Forbidden();

    const apiKey = await ApiKeyRepo.findByKey(key);
    if (!apiKey) throw new Forbidden();
    Logger.info(apiKey);

    req.apiKey = apiKey;
    return next();
  }),
);