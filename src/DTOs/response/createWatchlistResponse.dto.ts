export class WatchListOperationResponse{
  
  user_id:number
  message:string

  constructor(message,watchList_ID = undefined){
    this.message = message;
    this.user_id = watchList_ID;
  }
}