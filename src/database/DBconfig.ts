import { DataSource } from "typeorm"
import { LogTable } from "./Entities/logTable.entity";

import { Users } from "./Entities/Users.entity";
import { WatchList } from "./Entities/watchList.entitiy";


export const myDataSource = [
  {
    provide: 'datasource',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'postgres',
        host: String(process.env.DBhost),
        port: Number(process.env.DBport),
        username: String(process.env.DBuser),
        password: String(process.env.DBpass),
        database: String(process.env.DBname),
        synchronize: true,
        entities: [Users, LogTable, WatchList],
        logging: true,
      })
      return await datasource.initialize();

    }
  }
]
