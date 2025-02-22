# Star Wars — character explorer

A single-page app for browsing Star Wars characters from [SWAPI](https://swapi.dev):
search, pagination, a details panel, multi-select with CSV export, and a light/dark theme.

**Live demo:** https://star-wars-krsisabi.vercel.app

## Features

- **Search** by character name, with the query kept in the URL and restored from local storage
- **Pagination** with sibling/ellipsis logic, also reflected in the URL — any page is a shareable link
- **Details panel** opened as a nested route (`/details/:id`), closes on click outside
- **Multi-select** across pages, with a flyout showing the current selection
- **CSV export** of the selected characters, built with native browser APIs only (`Blob`, `URL.createObjectURL`) — no third-party packages
- **Light/dark theme** via Context API, persisted between visits
- **Error boundary** with a fallback screen

## Stack

React 18 · TypeScript · Vite 6 · Redux Toolkit + RTK Query · React Router 7 · SCSS Modules · Vitest + Testing Library · ESLint 9 (flat config) + Prettier · Husky

## Getting started

```bash
npm install
npm run dev        # dev server
npm run build      # type-check and production build
npm run test       # unit and integration tests
npm run coverage   # tests with a coverage report
npm run lint       # eslint
```

## Project structure

```
src/
  components/   presentational components, each with its styles and tests
  pages/        route-level components (Home, NotFound)
  store/        Redux store, RTK Query api slice, selected-characters slice
  hooks/        useLocalStorage, usePagination, useTheme, typed redux hooks
  context/      theme context and provider
  styles/       global styles and reset
tests/          test setup, shared providers, mock data
```

Data fetching and caching go through RTK Query; the selected characters live in a
regular slice, so selection survives navigation between pages and routes.

## Branches

This project was built for the [RS School React course](https://github.com/rolling-scopes-school/tasks/tree/master/react),
where every task is developed in its own branch. The branches are kept as a record of
how the app grew:

| Branch                 | Stage                                                    |
| ---------------------- | -------------------------------------------------------- |
| `class-components`     | first version on class components, error boundary        |
| `hooks-and-routing`    | rewritten with hooks, routing and the details panel      |
| `app-state-management` | Redux Toolkit, RTK Query, selection, CSV export, theming |

`main` holds the final state of the app.
