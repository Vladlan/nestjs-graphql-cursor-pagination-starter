import { connectionFromArraySlice } from 'graphql-relay';
import { Repository, FindOptionsWhere } from 'typeorm';
import { ConnectionArgs, getPagingParameters } from '../connection.args';

export const findAll = async <T>(
  args: ConnectionArgs,
  repo: Repository<T>,
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
) => {
  const { limit, offset } = getPagingParameters(args);
  const [results, count] = await repo.findAndCount({
    take: limit,
    skip: offset,
    ...(where && { where }),
  });

  return connectionFromArraySlice(results, args, {
    arrayLength: count,
    sliceStart: offset || 0,
  });
};
