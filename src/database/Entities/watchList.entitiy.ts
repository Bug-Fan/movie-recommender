import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.entity";

@Entity()
export class WatchList {

  @PrimaryGeneratedColumn('increment')
  record_id:number

  @ManyToOne(() => Users, (user => user.id))
  @JoinColumn({ name: 'user_id' })
  user_id: number

  @Column()
  movie_id: number

  @Column()
  media_type:string
}