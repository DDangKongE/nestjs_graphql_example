import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'board' })
export class Board {
  @Field(() => Int, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  @PrimaryGeneratedColumn({ name: 'brd_id' })
  brd_id: number;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  @Column({ name: 'brd_title', type: 'varchar', length: 255, nullable: false })
  brd_title: string;

  @Field(() => Int, { description: '', nullable: true })
  @Column({ name: 'brd_writer', type: 'int', nullable: false })
  brd_writer: number;

  @Field(() => String, { description: 'Board Content', nullable: true })
  @Column({
    name: 'brd_content',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  brd_content: number;

  @Field(() => Date, {
    description: 'Create datetime',
    nullable: true,
  })
  @CreateDateColumn({ name: 'create_at', type: 'datetime' })
  create_at: Date;

  @Field(() => Date, { description: 'Update datetime', nullable: true })
  @UpdateDateColumn({ name: 'update_at', type: 'datetime' })
  update_at: Date;

  @Field(() => Date, { description: 'Delete datetime', nullable: true })
  @DeleteDateColumn({ name: 'delete_at', type: 'datetime' })
  delete_at: Date;
}
