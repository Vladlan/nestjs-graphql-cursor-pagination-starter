import { Resolver, Query, Args, ArgsType, Field } from '@nestjs/graphql';
import Zip from './zip.entity';
import { ZipService } from './zip.service';

@ArgsType()
export class getZipArg {
  @Field(() => String)
  public id: string;
}

@Resolver(Zip)
export default class ZipsResolver {
  constructor(private readonly zipService: ZipService) {}

  @Query(() => [Zip])
  public async getZips(): Promise<Zip[]> {
    const zips = await this.zipService.findAllZips();
    console.log('zips: ', zips);
    return zips;
  }

  @Query(() => Zip)
  public async getZip(@Args() arg: getZipArg): Promise<Zip> {
    console.log('arg: ', arg);
    const zip = await this.zipService.findZipById(arg.id);
    console.log('zips: ', zip);
    return zip;
  }
}
