import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffe } from './entities/coffe.entity';
import { Connection, Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class CoffeService {
  constructor(
    @InjectRepository(Coffe)
    private readonly coffeRepository: Repository<Coffe>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
  ) {}
  async create(createCoffeDto: CreateCoffeDto, isRecomended: boolean) {
    const flavors = await Promise.all(
      createCoffeDto.flavors.map((flavor, index) =>
        this.preloadFlavorByName(flavor),
      ),
    );
    const coffee = this.coffeRepository.create({ ...createCoffeDto, flavors });
    const createdCoffe = await this.coffeRepository.save(coffee);
    isRecomended && this.recomendCoffe(createdCoffe);
    return createdCoffe;
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeRepository.find({
      relations: ['flavors'],
      skip: offset,

      take: limit,
    });
  }
  //12
  async findOne(id: number) {
    const coffee = await this.coffeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) throw new NotFoundException(`coffe with id: ${id} not found`);
    return coffee;
  }

  async update(
    id: number,
    updateCoffeDto: UpdateCoffeDto,
    isRecomended: boolean,
  ) {
    const flavors =
      updateCoffeDto.flavors &&
      (await Promise.all(
        updateCoffeDto.flavors.map((flavor, index) =>
          this.preloadFlavorByName(flavor),
        ),
      ));

    const coffee = await this.coffeRepository.preload({
      id,
      ...updateCoffeDto,
      flavors,
    });
    if (!coffee) throw new NotFoundException(`coffe with id: ${id} not found`);
    const updatedCoffee = await this.coffeRepository.save(coffee);
    isRecomended && this.recomendCoffe(updatedCoffee);
    return updatedCoffee;
  }

  async remove(id: number) {
    const coffee = await this.coffeRepository.findOneBy({ id });
    if (!coffee) throw new NotFoundException(`coffe with id: ${id} not found`);
    this.coffeRepository.remove(coffee);
  }
  private async preloadFlavorByName(name: string) {
    const existingFalvor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFalvor) return existingFalvor;
    return this.flavorRepository.create({ name });
  }

  private async recomendCoffe(coffe: Coffe) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffe.recomendation++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommended_coffe';
      recommendEvent.type = 'coffe';
      recommendEvent.payload = { coffeId: coffe.id };
      await queryRunner.manager.save(coffe);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
}
