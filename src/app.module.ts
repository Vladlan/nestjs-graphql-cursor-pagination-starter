import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import Zip from './zip/zip.entity';
import { ZipModule } from './zip/zip.module';
import ImportMetaData from './import-meta-data.entity';

const mainContext = (context) => {
  const { req, res, connection } = context;
  return connection
    ? {
        req: {
          ...req,
          ...connection.context,
        },
        res,
      }
    : context;
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://root:admin@localhost:27017/Nest?authSource=admin&readPreference=primary&ssl=false',
      entities: [Zip, ImportMetaData],
    }),
    TypeOrmModule.forFeature([Zip, ImportMetaData]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      context: mainContext,
    }),
    ZipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
