# React + TypeScript + Redux Boilerplate

A bare minimum React Redux Webpack Typescript Jest boilerplate with TodoMVC examples.

[Live demo](https://react-typescript-redux.herokuapp.com/)

## Installation

### Clone Repository

```
git clone https://github.com/SanderV1992/React-TypeScript-Boilerplate-Example.git
```

### Project build

```
yarn run build
```

### Project start

```
yarn run mock
yarn run start
```

---

## Architecture

```
src/
├── api/
├── lib/
├── store/
├── ui/
├── features/
|   ├── {feature}/
|   |   ├── {model}/
|   |   |   ├── {model}.effects
|   |   |   ├── {model}.selectors
|   |   |   ├── {model}.state
|   |   |   ├── {model}.store
|   |   |   ├── {model}
|   |   |   └── types
|   |   ├── {feature}
|   |   └── index
└── pages/
    └── {page}/
        ├── modals/
        |   └── {modal}
        ├── model/
        |   ├── {model}/
        |   |   ├── {model}.effects
        |   |   ├── {model}.selectors
        |   |   ├── {model}.state
        |   |   ├── {model}.store
        |   |   ├── {model}
        |   |   └── types
        ├── pages/
        |   ├── {page}/
        |   |   ├── {page}
        |   |   └── index
        |   └── index
        ├── routes
        └── index
```

[Article](https://github.com/technology-ebay-de/feature-driven-architecture/blob/master/scoped-redux.md)

---

## Api Documentation

| resource                                 | description                            |
| :--------------------------------------- | :------------------------------------- |
| `/api/articles`                          | returns a list of articles             |
| `/api/articles/1`                        | returns a single article               |
| `/api/articles?id=1&title=test&userId=1` | returns a list of articles with filter |
| `/api/users`                             | returns a list of users                |
| `/api/users/1`                           | returns a single user                  |
