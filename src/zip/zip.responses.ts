import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionCursor, Edge } from 'graphql-relay';
import { CreateConnectionType } from 'src/relay';
import Zip from './zip.entity';

@ObjectType()
export class ZipsConnection extends CreateConnectionType<Zip>(Zip) {}

@ObjectType(`ZipResponseEdge`, { isAbstract: true })
export class ZipResponseEdge implements Edge<Zip> {
  @Field({ nullable: true })
  public cursor: ConnectionCursor;

  @Field(() => Zip, { nullable: true })
  public node!: Zip;
}
