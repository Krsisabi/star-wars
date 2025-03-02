import { generatePath } from 'react-router-dom';

export const ROUTES = {
  home: '/',
  details: '/details/:id',
} as const;

export const detailsPath = (id: number) =>
  generatePath(ROUTES.details, { id: String(id) });
