import { Resolver, Query } from '@nestjs/graphql';
import Zip from './zip.entity';
import { ZipService } from './zip.service';

@Resolver(() => Zip)
export default class ZipsResolver {
  constructor(private zipService: ZipService) {}

  @Query(() => [Zip])
  public async getZips(): Promise<Zip[]> {
    const zips = await this.zipService.findAllZips();
    console.log('zips: ', zips);
    return zips;
  }
}
