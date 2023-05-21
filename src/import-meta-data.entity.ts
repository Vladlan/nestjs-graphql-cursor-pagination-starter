import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { TYPE_LAST_IMPORT_START_TIMESTAMP } from './constants';

@Entity({ name: 'ImportMetaData' })
export default class ImportMetaData {
  @ObjectIdColumn({ update: false })
  _id: ObjectId;

  @Column({ unique: true, default: TYPE_LAST_IMPORT_START_TIMESTAMP })
  public type: string;

  @Column()
  public lastImportStartTimestamp: string;
}
