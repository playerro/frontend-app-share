import {App} from './app-type';

export class Post {
  id: number;
  created: number;
  deleted?: number;
  text: string;
  isApp: boolean;
  image?: string;
  username: string;
  application?: App;
}
