import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBoardInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  brd_title: string;

  @Field(() => Int, { description: '' })
  @IsNumber()
  brd_writer: number;

  @Field(() => String, { description: 'Board Content' })
  @IsString()
  brd_content: number;
}
