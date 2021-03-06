import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';

@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Mutation(() => Board)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    return await this.boardService.create(createBoardInput);
  }

  @Query(() => [Board], { name: 'board' })
  findAll() {
    return this.boardService.findAll();
  }

  @Query(() => [Board, null], { name: 'board' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.boardService.findOne(id);
  }

  @Mutation(() => Board)
  updateBoard(@Args('updateBoardInput') updateBoardInput: UpdateBoardInput) {
    return this.boardService.update(updateBoardInput.id, updateBoardInput);
  }

  @Mutation(() => Board)
  removeBoard(@Args('id', { type: () => Int }) id: number) {
    return this.boardService.remove(id);
  }
}
