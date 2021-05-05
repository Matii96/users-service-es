import { Model, DataType, Column, Table } from 'sequelize-typescript';

@Table
export class Event extends Model<Event> {
  @Column({ type: DataType.STRING, allowNull: false })
  public name: string;

  @Column({ type: DataType.JSON, allowNull: false, defaultValue: {} })
  public json: object;
}
