import { Controller, Get, Req, Query, BadRequestException, Body, Post, UseGuards, UsePipes, Delete } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { WatchList } from 'src/database/Entities/watchList.entitiy';
import { AddToWatchListdto } from 'src/DTOs/request/addTowatchList.dto';
import { MovieSearchDto } from 'src/DTOs/request/movieSearch.dto';
import { RemovefromWatchListdto } from 'src/DTOs/request/RemovefromWatchList.dto';
import { WatchListOperationResponse } from 'src/DTOs/response/createWatchlistResponse.dto';
import { MovieService } from './movie.service';
import { MovieorShow } from './TMDBConfig';

@UseGuards(AuthGuard('MyStrategy'))
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('movie')
export class MovieController {

  constructor(
    private movieService: MovieService,
  ) { }

  @Get()
  search(
    @Query() qParams: MovieSearchDto
  ) {
    return this.movieService.searchMovie(qParams);
  }

  @Get('watchList')
  async getList(@Req() request): Promise<MovieorShow[]> {
    let id = request.user.id;
    return await this.movieService.getList(id);
  }

  @Post('watchList')
  async AddtoWatchList(@Req() request,
   @Body('movie_id') movie_id: number,
   @Body('media_type') mediaType: number,
   ): Promise<WatchListOperationResponse> {

    let watchListDTO = new AddToWatchListdto(Number(request.user.id), movie_id, mediaType);
    
    let errors = await validate(watchListDTO)
    if (errors.length)
      throw new BadRequestException(...errors.map(error => { return Object.values(error.constraints) }))

    return await this.movieService.AddToWatchList(watchListDTO);
  }

  @Delete('watchList')
  async deletefromWatchList(@Body() deleteMovieRecord: RemovefromWatchListdto): Promise<WatchListOperationResponse> {
    return await this.movieService.removeFromWatchList(deleteMovieRecord);
  }

}


