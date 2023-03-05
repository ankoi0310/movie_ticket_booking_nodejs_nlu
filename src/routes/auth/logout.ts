import express from 'express';
import KeystoreRepo from '../../database/repository/keystore';
import { ProtectedRequest } from 'app-request';
import { SuccessMsgResponse } from '../../core/handler/app-response';
import asyncHandler from '../../core/handler/async';
import authentication from '../../auth/authentication';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.delete(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {
    await KeystoreRepo.remove(req.keystore._id);
    new SuccessMsgResponse('Logout success').send(res);
  }),
);

export default router;