import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { response } from 'express';
import { WatchList } from 'src/database/Entities/watchList.entitiy';
import { AddToWatchListdto } from 'src/DTOs/request/addTowatchList.dto';
import { MovieSearchDto } from 'src/DTOs/request/movieSearch.dto';
import { RemovefromWatchListdto } from 'src/DTOs/request/RemovefromWatchList.dto';
import { WatchListOperationResponse } from 'src/DTOs/response/createWatchlistResponse.dto';
import { MovieorShow, TMDBConfig } from 'src/movie/TMDBConfig';
import { DataSource, Repository } from 'typeorm';


@Injectable()

export class MovieService {
  private watchlistRepo: Repository<WatchList>

  constructor(
    @Inject('TMDBConfig') private tmdbConfig: TMDBConfig,
    @Inject('datasource') private datasource: DataSource
  ) {
    this.watchlistRepo = this.datasource.getRepository(WatchList)
  }

  async searchMovie(qParams: MovieSearchDto): Promise<any> {
    const searchOptions = this.tmdbConfig.getTMDBRequestOptions({ query: qParams, media_type: undefined, isSingle: false });
    try {
      let movieResponsePromise = axios(searchOptions)
      let response = await movieResponsePromise;

      return this.tmdbConfig.getData(response.data);
    }
    catch (e) {

      if (e.cause.code === 'ENOTFOUND')
        throw new BadRequestException('Can not connect right now please try later')
      else
        throw new BadRequestException(e.message)
    }
  }

  async AddToWatchList(watchListdto: AddToWatchListdto): Promise<WatchListOperationResponse> {


    let watchlist = this.watchlistRepo.create(watchListdto);

    try {
      let wl = await this.watchlistRepo.save(watchlist);

      return new WatchListOperationResponse("Movie added to watchList successfully", wl.user_id);
    }

    catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async removeFromWatchList(deleteMovieRecord: RemovefromWatchListdto): Promise<WatchListOperationResponse> {
    let repo = this.datasource.getRepository(WatchList)

    try {
      let record = await this.watchlistRepo.delete({ record_id: deleteMovieRecord.record_id });
      let message = ''
      if (record.affected > 0)
        message = "Movie removed  watchList successfully"
      else
        message = "Movie not exist in watchlist"

      return new WatchListOperationResponse(message);
    }

    catch (e) {
      throw new BadRequestException(e.message);
    }

  }

  async getList(id: number): Promise<MovieorShow[]> {
    try {
      
      let result: any[] = await this.watchlistRepo.find({ where: { user_id: id } })

      if (result.length && result.length > 0) {
        let responseArray: MovieorShow[] = [];
        for (const item of result) {

          const searchOptions = this.tmdbConfig.getTMDBRequestOptions({
            query: item.movie_id,
            media_type: item.media_type,
            isSingle: true
          });

          let response = await axios(searchOptions);
          response.data.media_type = item.media_type;
          let movie:any = this.tmdbConfig.getData({ results: [response.data] })
          movie[0].record_id = item.record_id
          responseArray = responseArray.concat(movie);
        }
        return responseArray;
      }
    }
    catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}


