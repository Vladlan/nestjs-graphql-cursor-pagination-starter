import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Zip from './zip.entity';
import { Types } from 'mongoose';
import { ConnectionArgs } from 'src/relay';
import { ZipsConnection } from './zip.responses';
import { findAll } from '../relay/utils/find-all';

@Injectable()
export class ZipService {
  constructor(@InjectRepository(Zip) private repo: Repository<Zip>) {}

  async findAllZips(): Promise<Zip[]> {
    const zips = await this.repo.find({
      take: 10,
      skip: 0,
    });
    return zips;
  }

  async findAllZipsRelay(args: ConnectionArgs): Promise<ZipsConnection> {
    return await findAll(args, this.repo);
  }

  async findZipById(id: string) {
    return await this.repo.findOneBy({
      _id: new Types.ObjectId(id),
    });
  }
}
