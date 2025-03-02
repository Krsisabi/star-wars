# Forms — controlled vs uncontrolled

Two ways to build the same React form, side by side: one uncontrolled, reading its
values straight from `FormData` on submit, and one controlled by
[react-hook-form](https://react-hook-form.com/). Both are validated by a single
[yup](https://github.com/jquense/yup) schema, and both write into the same Redux store,
so the results land in one shared list.

The point of the task is the comparison — same fields, same rules, two different
ways of getting the data out of the DOM.

## What is in it

- **Uncontrolled form** — no state per field; on submit the values are read via
  `new FormData(form)` and validated against the schema by hand
- **Controlled form** — `react-hook-form` with `yupResolver`, validating on change and
  keeping the submit button disabled while anything is invalid
- **Shared yup schema** — name capitalisation, positive age, email, password strength
  scored out of four, matching confirmation, country from a known list, image type and
  size, accepted terms
- **Image upload** converted to base64 before it goes into the store, so submissions
  survive re-renders without object URLs
- **Submission list** where the newest entry is highlighted for a moment after you add it

## Stack

React 18 · TypeScript · Vite 5 · Redux Toolkit · react-hook-form · yup · React Router 6 ·
SCSS Modules · Vitest + Testing Library · ESLint + Prettier · Husky

## Getting started

```bash
npm install
npm run dev        # dev server
npm run build      # type-check and production build
npm run test       # unit and component tests
npm run lint       # eslint
```

## Project structure

```
src/
  components/   Home, both forms, shared form pieces, layout
  store/        Redux store and the form slice
  utils/        the yup schema and the base64 converter
  data/         country list
  constants/    image limits and timings
tests/          test setup and shared providers
```

## Why this branch has its own history

This is a separate application from the character explorer on `main`, written for a
different task of the [RS School React course](https://github.com/rolling-scopes-school/tasks/tree/master/react).
It shares the repository but not the history: `forms` is a root branch of its own, and
merging it into `main` would mean merging two unrelated apps.
