import { CallHandler, ExecutionContext, Inject, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { LogTable } from "src/database/Entities/logTable.entity";
import { DataSource } from "typeorm";

export class LoggingIntercepter implements NestInterceptor {

  constructor(
    @Inject('datasource') private datasource: DataSource,
  ) { }

  async intercept(context:ExecutionContext, next:CallHandler) {

    let ctx = context.switchToHttp();
    let req = ctx.getRequest();
    console.log(req.body);
    let { protocol, url, body = undefined } = req;
    let user_id = req.user?.id;
    let { host } = req.headers;

    url = protocol + '://' + host + url;
  
    let logtablerepo = this.datasource.getRepository(LogTable);
    let log = logtablerepo.create({ body, url, user_id })

    await logtablerepo.save(log);
    return next.handle();
  }
}