import { EntityRepository, Repository } from 'typeorm';
import { User } from '@app/users/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
