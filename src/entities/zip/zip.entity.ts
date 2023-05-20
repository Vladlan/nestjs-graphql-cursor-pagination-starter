import { ObjectId } from 'mongodb';
import {
  PrimaryKey,
  SerializedPrimaryKey,
  Property,
  Entity,
} from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ tableName: 'Zips' })
export default class Zip {
  @PrimaryKey()
  public _id!: ObjectId;

  @SerializedPrimaryKey()
  public id!: string;

  @Property()
  public city: string;

  @Property()
  public loc: number[];

  @Property()
  public pop: number;

  @Property()
  public state: string;
}
