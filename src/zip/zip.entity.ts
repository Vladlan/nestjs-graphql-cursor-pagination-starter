import { ObjectType } from '@nestjs/graphql';
import { Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'Zips' })
export default class Zip {
  @ObjectIdColumn({ update: false })
  @Field(() => ID)
  _id: ObjectId;

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
