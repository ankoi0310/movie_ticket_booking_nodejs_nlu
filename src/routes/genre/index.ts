import express from "express";
import asyncHandler from '../../core/handler/async';
import { BadRequest } from "../../core/handler/app-error";
import { SuccessResponse } from "../../core/handler/app-response";
import { PublicRequest } from "../../types/app-request";
import { GenreModel } from "../../database/model/genre";
import schema from "./schema";
import validator from "../../helper/validator";

const router = express.Router();

router.get(
  '',
  asyncHandler(async (req: PublicRequest, res) => {
    const genres = await GenreModel.find();
    if (!genres) throw new BadRequest('Genre not found');

    return new SuccessResponse('success', genres).send(res);
  }),
);

router.get(
  '/',
  asyncHandler(async (req: PublicRequest, res) => {
    const genres = await GenreModel.find();
    if (!genres) throw new BadRequest('Genre not found');

    return new SuccessResponse('success', genres).send(res);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req: PublicRequest, res) => {
    const genre = await GenreModel.findById(req.params.id);
    if (!genre) throw new BadRequest('Genre not found');

    return new SuccessResponse('success', genre).send(res);
  }),
);

router.post(
  '',
  validator(schema.create),
  asyncHandler(async (req: PublicRequest, res) => {
    const genre = await GenreModel.create(req.body);
    if (!genre) throw new BadRequest('Genre not found');

    return new SuccessResponse('success', genre).send(res);
  }),
);

router.put(
  '/:id',
  validator(schema.update),
  asyncHandler(async (req: PublicRequest, res) => {
    const genre = await GenreModel.findById(req.params.id);
    if (!genre) throw new BadRequest('Genre not found');

    genre.name = req.body.name;
    await GenreModel.updateOne({ _id: req.params.id }, { $set: genre, });

    return new SuccessResponse('success', genre).send(res);
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req: PublicRequest, res) => {
    const genre = await GenreModel.findById(req.params.id);
    if (!genre) throw new BadRequest('Genre not found');

    await GenreModel.deleteOne({ _id: req.params.id });

    return new SuccessResponse('success', genre).send(res);
  }),
);

export default router;