import {Room} from './room';
import {Traveller} from './traveller';

export class Hotel {
  id: number;
  address: string;
  email: string;
  imgPath: string;
  location: string;
  name: string;
  price: number;
  rooms: Room[];
  travellers: Traveller[];
}
