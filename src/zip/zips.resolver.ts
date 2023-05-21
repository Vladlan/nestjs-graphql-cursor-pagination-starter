import { Resolver, Query, Args, ArgsType, Field } from '@nestjs/graphql';
import Zip from './zip.entity';
import { ZipService } from './zip.service';
import { ConnectionArgs } from 'src/relay';
import { ZipsConnection } from './zip.responses';

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
    return zips;
  }

  @Query(() => ZipsConnection, { name: 'zips' })
  zips(@Args() args: ConnectionArgs) {
    return this.zipService.findAllZipsRelay(args);
  }

  @Query(() => Zip)
  public async getZip(@Args() arg: getZipArg): Promise<Zip> {
    const zip = await this.zipService.findZipById(arg.id);
    return zip;
  }
}
