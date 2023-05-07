import { Global, Module } from '@nestjs/common';
import { myDataSource } from './DBconfig';

@Global()
@Module({
  providers:[...myDataSource],
  exports:[...myDataSource]
})
export class DatabaseModule {}
