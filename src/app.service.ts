import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ImportMetaData from './import-meta-data.entity';
import { TYPE_LAST_IMPORT_START_TIMESTAMP } from './constants';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ImportMetaData) private repo: Repository<ImportMetaData>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async importOcmData(): Promise<any> {
    const lastInsertData = await this.repo.findOne({
      where: { type: TYPE_LAST_IMPORT_START_TIMESTAMP },
    });
    if (lastInsertData) return lastInsertData;
    return await this.repo.insert({
      type: TYPE_LAST_IMPORT_START_TIMESTAMP,
      lastImportStartTimestamp: new Date().toISOString(),
    });
  }
}
