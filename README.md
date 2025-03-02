# Star Wars — character explorer

[![CI](https://github.com/Krsisabi/star-wars/actions/workflows/ci.yml/badge.svg)](https://github.com/Krsisabi/star-wars/actions/workflows/ci.yml)

A single-page app for browsing Star Wars characters from [SWAPI](https://swapi.dev):
search, pagination, a details panel, multi-select with CSV export, and a light/dark theme.

**Live demo:** https://star-wars-krsisabi.vercel.app

## Features

- **Search** by character name, with the query kept in the URL and restored from local storage
- **Pagination** with sibling/ellipsis logic, also reflected in the URL — any page is a shareable link
- **Details panel** opened as a nested route (`/details/:id`), closes on a click outside or Escape
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
  App.tsx           routes; routes.ts holds their paths
  AppProviders.tsx  error boundary, theme and store, shared by the app and its tests
  components/       components with their styles and tests: shared ones (Button, Icon,
                    Avatar, StatusPage) and the parts of the page (List, Details, ...)
  pages/            route-level screens: Home, NotFound, ErrorPage
  store/            store factory, RTK Query API slice, selection slice
  hooks/            typed redux hooks, the search in the address, links that keep it,
                    closing the details panel, the theme
  context/          theme context and provider
  utils/            plain functions: character facts, pagination, CSV, storage
  styles/           global styles, the sky, shared Sass mixins
  data/, assets/    portrait links and the sky's pictures, made by scripts/
  test/             test setup, a render helper with a router and a store, mock data
scripts/            generators for src/data and src/assets
```

Data fetching and caching go through RTK Query; the selected characters live in a
regular slice, so selection survives navigation between pages and routes. Every
test gets a store of its own from the same factory the app uses.

## Branches

This project was built for the [RS School React course](https://github.com/rolling-scopes-school/tasks/tree/master/react),
where every task is developed in its own branch. The branches are kept as a record of
how the app grew:

| Branch                 | Stage                                                                 |
| ---------------------- | --------------------------------------------------------------------- |
| `class-components`     | first version on class components, error boundary                     |
| `hooks-and-routing`    | rewritten with hooks, routing and the details panel                   |
| `app-state-management` | Redux Toolkit, RTK Query, selection, CSV export, theming              |
| `forms`                | separate app: controlled and uncontrolled forms, react-hook-form, yup |

`main` holds the final state of the app. `forms` stands apart from the three stages
above: it is a different task with its own root commit, so it shares no history with
`main` and is deployed separately.
