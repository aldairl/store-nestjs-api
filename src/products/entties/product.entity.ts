import { User } from 'src/users/entities/user.entity';

export class Product {
  id: string;
  name: string;
  price: number;
  owner: User;
}
