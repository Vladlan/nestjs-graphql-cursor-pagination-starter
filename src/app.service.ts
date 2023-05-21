import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ImportMetaData from './ocm-import-meta.entity';
import { TYPE_LAST_IMPORT_START_TIMESTAMP } from './constants';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

const POI_REQUIRED_KEYS = [
  'OperatorInfo',
  'StatusType',
  'AddressInfo',
  'Connections',
];

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ImportMetaData) private repo: Repository<ImportMetaData>,
    private readonly httpService: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getOcmData(since: string): any {
    console.log(
      `https://api.openchargemap.io/v3/poi/?output=json&modifiedsince=${since}&maxresults=1000&compact=true&verbose=false&key=5bc70013-1558-4d4c-9bf8-8e90b72e079c`,
    );
    return this.httpService
      .get(
        `https://api.openchargemap.io/v3/poi/?output=json&modifiedsince=2023-05-21T15:58:49.454Z&verbose=false&key=5bc70013-1558-4d4c-9bf8-8e90b72e079c`,
      )
      .pipe(
        map((res) => {
          return res.data.map((poi) => {
            const newPoi = {};
            POI_REQUIRED_KEYS.forEach((key) => {
              newPoi[key] = poi[key];
            });
            return newPoi;
          });
        }),
      );
  }

  async importOcmData(): Promise<any> {
    const lastImportStartTimestamp = new Date().toISOString();
    const lastInsertData = await this.repo.findOne({
      where: { type: TYPE_LAST_IMPORT_START_TIMESTAMP },
    });
    const since =
      lastInsertData?.lastImportStartTimestamp || lastImportStartTimestamp;
    await firstValueFrom(this.getOcmData(since));
    if (lastInsertData) {
      return await this.repo.update(
        { type: TYPE_LAST_IMPORT_START_TIMESTAMP },
        {
          lastImportStartTimestamp,
        },
      );
    }
    return await this.repo.insert({
      type: TYPE_LAST_IMPORT_START_TIMESTAMP,
      lastImportStartTimestamp,
    });
  }
}
