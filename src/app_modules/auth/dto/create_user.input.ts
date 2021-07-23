import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: '닉네임' })
  @IsString()
  usr_nickname: string;

  @Field(() => String, { description: '비밀번호' })
  @IsString()
  usr_password: string;
}
