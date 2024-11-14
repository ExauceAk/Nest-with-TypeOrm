import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractRepository } from './abstract.repository';
import { AbstractEntity } from './abstract.entity';

// Mock the entity for the needs of the test
class MockEntity extends AbstractEntity<MockEntity> {
  // Implement the necessary fields for the tests here.
}

describe('AbstractRepository', () => {
  let repository: AbstractRepository<MockEntity>;
  let entityManager: EntityManager;
  let entityRepository: Repository<MockEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntityManager,
        Logger,
        {
          provide: getRepositoryToken(MockEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<AbstractRepository<MockEntity>>(AbstractRepository);
    entityManager = module.get<EntityManager>(EntityManager);
    entityRepository = module.get<Repository<MockEntity>>(
      getRepositoryToken(MockEntity),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create an entity', async () => {
    const mockEntity = new MockEntity({});
    jest.spyOn(entityManager, 'save').mockResolvedValue(mockEntity);

    const result = await repository.create(mockEntity);
    expect(result).toEqual(mockEntity);
  });

  it('should find entities', async () => {
    const mockEntities: MockEntity[] = [];
    jest.spyOn(entityRepository, 'find').mockResolvedValue(mockEntities);

    const result = await repository.find({});
    expect(result).toEqual(mockEntities);
  });

  it('should find one entity', async () => {
    const mockEntity = new MockEntity({});
    jest.spyOn(entityRepository, 'findOne').mockResolvedValue(mockEntity);

    const result = await repository.findOne({});
    expect(result).toEqual(mockEntity);
  });

  it('should throw NotFoundException when entity not found by param', async () => {
    jest.spyOn(entityRepository, 'find').mockResolvedValue([]);

    await expect(repository.findByParam({})).rejects.toThrow(NotFoundException);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
