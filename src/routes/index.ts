import express from 'express';
import apiKey from '../auth/api-key';
import permission from '../helper/permission';
import { Permission } from '../database/model/api-key';
import auth from './auth';
import user from './user';
import genre from './genre';

const router = express.Router();

/*---------------------------------------------------------*/
// router.use(apiKey);
/*---------------------------------------------------------*/


/*---------------------------------------------------------*/
// router.use(permission(Permission.GENERAL));
/*---------------------------------------------------------*/


/*---------------------------------------------------------*/
router.use('/auth', auth);
router.use('/user', user);
router.use('/genre', genre);
/*---------------------------------------------------------*/

export default router;