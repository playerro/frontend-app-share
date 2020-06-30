export class Types {
  isStatic: boolean;
  label: string;
  description?: string;
}

export const APP_TYPES: Types[] = [
  {isStatic: false, label: 'Docker-образ приложения'},
  {isStatic: true, label: 'Статичное веб-приложение'}
];

export class App {
  name: string;
  domain: string;
  comment: string;
  isStatic: boolean;
  source: string;
  image?: string;
  status?: string;
  id?: number;
}

export interface AppSort {
  sort: string;
  order: string;
  page: number;
}
