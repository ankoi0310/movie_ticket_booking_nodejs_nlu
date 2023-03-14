import express from 'express';
import asyncHandler from '../../core/handler/async';
import authentication from '../../auth/authentication';
import validator from '../../helper/validator';
import schema from './schema';
import { ProtectedRequest, PublicRequest } from '../../types/app-request';
import { MovieRepository } from '../../database/repository/movie';
import { BadRequest } from '../../core/handler/app-error';
import { SuccessResponse } from '../../core/handler/app-response';
import { MovieModel } from '../../database/model/movie';

const router = express.Router();


/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/


router.post(
  '/create',
  validator(schema.create),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const currentMovie = await MovieRepository.searchByTitle(req.body.title);
    if (currentMovie) throw new BadRequest('Movie already exists');

    const newMovie = await MovieRepository.create(req.body);

    new SuccessResponse('Movie created', {
      movie: newMovie,
    }).send(res);
  }),
);



router.get(
  '/',
  asyncHandler(async (req: PublicRequest, res) => {
    const movies = await MovieModel.find({ status: true });
    if (!movies) throw new BadRequest('No movies found');

    new SuccessResponse('Movies found', {
      movies: movies,
    }).send(res);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req: PublicRequest, res) => {
    const movie = await MovieModel.findById(req.params.id);
    if (!movie) throw new BadRequest('Movie not found');

    new SuccessResponse('Movie found', {
      movie: movie,
    }).send(res);
  }),
);

export default router;