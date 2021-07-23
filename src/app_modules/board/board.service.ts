import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(createBoardInput: CreateBoardInput) {
    const insert = await this.boardRepository.insert(createBoardInput);
    return this.boardRepository.findOne(insert.identifiers[0].brd_id);
  }

  findAll() {
    return `This action returns all board`;
  }

  findOne(id: number) {
    return this.boardRepository.find();
  }

  update(id: number, updateBoardInput: UpdateBoardInput) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
