import Logger from './core/log/logger';
import { port } from './config/app';
import app from './app';

app
  .listen(port, () => {
    Logger.info(`Server running on port : ${port}`);
  })
  .on('error', (e) => Logger.error(e));