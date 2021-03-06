import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export class User {
  @Field(() => Int, {
    description: 'PK',
    nullable: true,
  })
  @PrimaryGeneratedColumn({ name: 'usr_id' })
  usr_id: number;

  @Field(() => String, {
    description: '이름',
    nullable: true,
  })
  @Column({
    name: 'usr_nickname',
    type: 'varchar',
    length: 18,
    nullable: false,
  })
  usr_nickname: string;

  @Field(() => String, { description: '비밀번호', nullable: true })
  @Column({
    name: 'usr_password',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  usr_password: string;

  @Field(() => Date, {
    description: 'register_date',
    nullable: true,
  })
  @CreateDateColumn({ name: 'register_date', type: 'datetime' })
  register_date: Date;
}

@ObjectType()
export class Token {
  @Field(() => String, { nullable: false })
  access_token: string;

  @Field(() => Number, { nullable: false })
  expires_in: number;
}

@ObjectType()
export class TokenPayload {
  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => Token, { nullable: true })
  token: Token;
}
