import { IsNumber, IsString } from "class-validator";

export class AddToWatchListdto {

  @IsNumber({}, { message: "user_id must be number" })
  user_id: number;

  @IsNumber({}, { message: "movie_id must be number" })
  movie_id: number

  @IsString()
  media_type: string

  constructor(user_id, movie_id, media_type) {
    this.user_id = user_id;
    this.movie_id = movie_id;
    this.media_type = media_type;
  }
}