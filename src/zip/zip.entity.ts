import { ObjectType } from '@nestjs/graphql';
import { Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'Zips' })
export default class Zip {
  @ObjectIdColumn({ update: false })
  _id: string;

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID!)
  id: string;

  @Field({ nullable: true })
  @Column()
  public city: string;

  @Field(() => [Number], { nullable: true })
  @Column()
  public loc: number[];

  @Field({ nullable: true })
  @Column()
  public pop: number;

  @Field({ nullable: true })
  @Column()
  public state: string;
}
