import { Request } from 'express';
import moment from 'moment';
import Logger from '../core/log/logger';

export function findIpAddress (req: Request) {
  try {
    if (req.headers['x-forwarded-for']) {
      return req.headers['x-forwarded-for'].toString().split(',')[0];
    } else if (req.socket && req.socket.remoteAddress) {
      return req.socket.remoteAddress;
    }
    return req.ip;
  } catch (e) {
    Logger.error(e);
    return undefined;
  }
}

export function addMillisecondToCurrentDate (millisecond: number) {
  return moment().add(millisecond, 'ms').toDate();
}