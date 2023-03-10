import express from 'express';
import authentication from '../../auth/authentication';
import asyncHandler from '../../core/handler/async';
import schema from './schema';
import { BranchModel } from '../../database/model/branch';
import { PublicRequest } from '../../types/app-request';
import { BadRequest } from '../../core/handler/app-error';
import { SuccessResponse } from '../../core/handler/app-response';
import validator from '../../helper/validator';


const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.get(
  '/',
  asyncHandler(async (req: PublicRequest, res) => {
    const cinemas = await BranchModel.find();
    if (!cinemas) throw new BadRequest('Cinema not found');

    return new SuccessResponse('success', cinemas).send(res);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req: PublicRequest, res) => {
    const cinema = await BranchModel.findById(req.params.id);
    if (!cinema) throw new BadRequest('Cinema not found');

    return new SuccessResponse('success', cinema).send(res);
  }),
);

router.post(
  '/',
  validator(schema.create),
  asyncHandler(async (req: PublicRequest, res) => {
    const cinema = await BranchModel.findOne({ name: req.body.name });
    if (!cinema) throw new BadRequest('Cinema already exists');

    const newCinema = new BranchModel(req.body);
    await newCinema.save();

    return new SuccessResponse('success', cinema).send(res);
  }),
);

router.put(
  '/:id',
  validator(schema.update),
  asyncHandler(async (req: PublicRequest, res) => {
    const cinema = await BranchModel.findById(req.params.id);
    if (!cinema) throw new BadRequest('Cinema not found');

    await BranchModel.updateOne({ _id: req.params.id }, { $set: req.body, });

    return new SuccessResponse('success', cinema).send(res);
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req: PublicRequest, res) => {
    const cinema = await BranchModel.findById(req.params.id);
    if (!cinema) throw new BadRequest('Cinema not found');

    await cinema.deleteOne();

    return new SuccessResponse('success', cinema).send(res);
  }),
);

export default router;