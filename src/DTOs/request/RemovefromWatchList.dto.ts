import { IsNumber } from "class-validator";

export class RemovefromWatchListdto{
  
  @IsNumber({},{message:"record_id must be number"})
  record_id: number

  constructor(record_id) {
    this.record_id = record_id;
  }
}