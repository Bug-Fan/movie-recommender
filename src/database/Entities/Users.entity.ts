import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { LogTable } from './logTable.entity'
import { WatchList } from './watchList.entitiy'
@Entity()
export class Users {

  @OneToMany(() => LogTable, lgtbl => lgtbl.user_id)
  @OneToMany(() => WatchList, watchlist => watchlist.user_id)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

}

