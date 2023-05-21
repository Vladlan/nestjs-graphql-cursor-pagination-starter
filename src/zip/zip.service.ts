import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Zip from './zip.entity';
import { Types } from 'mongoose';

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

  async findZipById(id: string) {
    return await this.repo.findOneBy({
      _id: new Types.ObjectId(id),
    });
  }
}
