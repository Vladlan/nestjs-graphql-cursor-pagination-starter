import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Zip from './zip.entity';
import { ZipService } from './zip.service';
import ZipsResolver from './zips.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Zip])],
  providers: [ZipService, ZipsResolver],
  exports: [ZipService, ZipsResolver],
})
export class ZipModule {}
