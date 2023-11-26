import { setupServer } from 'msw/node';

import { http, HttpResponse } from 'msw';
import { response } from './mockData';

const handlers = [
  http.get('https://swapi.dev/api/people', () => {
    return HttpResponse.json(response);
  }),

  http.get('https://swapi.dev/api/people/1', () => {
    return HttpResponse.json(response.results[0]);
  }),

  http.get('https://swapi.dev/api/people/100', () => {
    setTimeout(() => HttpResponse.json(response.results[0]));
  }),
];

export const server = setupServer(...handlers);
