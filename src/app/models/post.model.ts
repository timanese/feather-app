import { Url } from 'url';

export interface Post {
  id: string;
  title: string;
  details: string;
  text: string;
  image: Url;
  video: Url;
}
