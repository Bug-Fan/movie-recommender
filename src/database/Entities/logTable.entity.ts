import { Column, Entity, JoinColumn, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.entity";

@Entity()
export class LogTable{

  @PrimaryGeneratedColumn('increment')
  id:number

  @Column({type:'text'})
  url:string

  @Column({type:'text'})
  body:string

  @ManyToOne(()=>Users,(user)=>user.id)
  @JoinColumn({name:'user_id'})
  user_id:number

  @CreateDateColumn()
  request_Date:Date;
}