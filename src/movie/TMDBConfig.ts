import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { MovieSearchDto } from "../DTOs/request/movieSearch.dto"
import { stringify } from 'querystring'
@Injectable()
export class TMDBConfig {

  private IMAGE_URL: string
  private BASE_URL: string
  private auth_tkn: string
  private api_key: string
  private api_enpoint: string
  private single_movie_endpoint: string
  private single_tv_endpoint: string

  constructor(configservice: ConfigService) {
    this.BASE_URL = configservice.get('TMDB_API_BASE_URL');
    this.api_key = configservice.get('TMDB_API_KEY')
    this.IMAGE_URL = configservice.get('TMDB_API_IMAGE_URL')
    this.auth_tkn = configservice.get('TMDB_AUTH_TOKEN')
    this.api_enpoint = configservice.get('TMDB_API_ENDPOINT')
    this.single_movie_endpoint = configservice.get('TMDB_MOVIE_ENPOINT')
    this.single_tv_endpoint = configservice.get('TMDB_TV_ENPOINT')
  }

  getTMDBRequestOptions(options: TMDBoptions) {
    let url;
    if (options.isSingle) {
      if (options.media_type == media_Type.MOVIE)
        url = (new URL(this.single_movie_endpoint + `${options.query}`, this.BASE_URL)).href
      else
        url = (new URL(this.single_tv_endpoint + `${options.query}`, this.BASE_URL)).href
    }
    else {
      url = (new URL(this.api_enpoint, this.BASE_URL)).href
      url += '?' + stringify(options.query);
    }
    return {
      url,
      method: 'get',
      headers: {
        Authorization: this.auth_tkn
      }
    }
  }

  getData(searchResponse):MovieorShow[] {
    let results = searchResponse.results;

    return results.reduce((response: MovieorShow[], item) => {

      switch (item.media_type) {
        case media_Type.TV:
        case media_Type.MOVIE:
          return response.concat(this.getMovieShowObject(item))

        case media_Type.PERSON:
          return response.concat(this.getPersonData(item))

      }
    }, [])
  }

  getPersonData(person) {
    let shows: [] = person?.known_for;

    let response: MovieorShow[] = [];
    if (shows)
      response = shows.map(item => this.getMovieShowObject(item))

    return response;
  }

  getMovieShowObject(show) {
    return new MovieorShow(show, this.IMAGE_URL)
  }
}

enum media_Type {
  TV = 'tv',
  MOVIE = 'movie',
  PERSON = 'person'
}

export class MovieorShow {
  private overview;
  private title;
  private poster_path;
  private release_date;
  private media_type;
  private vote_average;
  private movie_id;

  constructor(object, image_base_url) {
    this.movie_id = object.id;
    this.overview = object.overview;
    this.title = object.title || object.original_title || object.original_name;
    this.poster_path = image_base_url + object.poster_path;
    this.release_date = object.release_date || '';
    this.media_type = object.media_type;
    this.vote_average = object.vote_average;
  }
}

export class TMDBoptions {
  query: any;
  isSingle: boolean;
  media_type: string;
}
