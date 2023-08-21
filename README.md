[![Node.js](https://img.shields.io/badge/Node.js-v18.17-dddddd?style=for-the-badge&labelColor=222222)](https://nodejs.org) [![Yarn](https://img.shields.io/badge/yarn-v3.6.1-7254ab?style=for-the-badge&labelColor=222222)](https://yarnpkg.com) [![formatter: prettier](https://img.shields.io/badge/formatter-prettier-fc59ec?style=for-the-badge&labelColor=222222)](https://github.com/prettier/prettier) [![license: BSD-3-Clause](https://img.shields.io/badge/license-BSD--3--Clause-green?style=for-the-badge&labelColor=222222)](https://opensource.org/licenses/BSD-3-Clause)

# refine.bio Web

This is a [refine.bio](https://github.com/AlexsLemonade/refinebio) web application that enables users to search, build, and download custom datasets for their needs including gene expression matrices and sample metadata.

<details>

<summary><strong>Table of Contents</strong></summary><br/>

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Development](#development)
  - [Initialization](#initialization)
  - [Services](#services)
  - [Linter](#linter)
  - [Build](#build)
- [Deployment](#deployment)
  - [Environments](#environments)
    - [Staging](#staging)
    - [Production](#production)
- [Tech Stacks](#tech-stacks)
  - [Framework and Tool](#framework-and-tool)
  - [Formatting](#formatting)
  - [Linting](#linting)
  - [Styling](#styling)
- [Support](#support)
- [License](#license)

</details>

## Getting Started

### Prerequisites

To run the application on localhost, the following requirements must be installed on your environment:

- [Node.js](https://nodejs.org/en/download) verson `18.17`
- [Yarn package manager](https://yarnpkg.com/getting-started/install) version `3.6.1` (required Node.js)
- [Docker](https://www.docker.com/get-started)

#### Yarn

For macOS, Yarn can be installed with the [Homebrew package manager](https://brew.sh) which also installs Node.js if it's not already installed.

In the terminal, run:

1. [`brew install yarn`](https://formulae.brew.sh/formula/yarn) to install Yarn
2. [`yarn set version 3.6.1`](https://yarnpkg.com/cli/set/version) to specify the Yarn version

#### npm

Alternatively, Yarn can be installed using [npm](https://www.npmjs.com/package/yarn) which comes with Node.js.

#### Node.js

To switch the Node.js version, we recommend using a node version manager such as [fnm](https://github.com/Schniz/fnm?ref=blog.apify.com) or [nvm](https://github.com/nvm-sh/nvm).

## Development

The following commands must be run in the project root directory.

### Initialization

To install the packages and dependencies, run the following command:

```
yarn install
```

### Services

The following ports are used by a client and a storybook services that run locally in separate Docker containers.

| Service   | Port | URL                                            |
| :-------- | :--- | :--------------------------------------------- |
| Client    | 3002 | [http://localhost:3002](http://localhost:3002) |
| Storybook | 6006 | [http://localhost:3002](http://localhost:6006) |

To start the services, run the following commands:

#### Run all services

```
yarn start-local
```

#### Run the client

```
yarn start-client
```

#### Run the storybook

```
yarn start-storybook
```

#### Stop all services

```
yarn stop-local
```

### Linter

To lint the code, run the following command:

```
yarn lint
```

You can run this command with [options](https://eslint.org/docs/latest/use/command-line-interface#options) such as `--fix` which automatically corrects minor linting errors (e.g., module import order, layout formatting).

### Build

To generate the production build, run the following command:

```
yarn build
```

Next.js will autogenerate the `.next` build directory which is optimized and exportable.

## Deployment

### Environments

#### Staging

The staging environment is a close replica of the production environment and we use it to run QA tests before releasing it to the production server. The staging server is deployed automatically by merging PR into the `dev` branch.

#### Production

The production environment is the latest release of the application that is available to end users. We manually promote a staging deployment to the production server in [Vecel](https://vercel.com/solutions/nextjs) once all the QA tests are passed.

## Tech Stacks

### Framework and tool

This project is using [Next.js](https://nextjs.org) (currently version `13`) as a frontend framework and [Storybook](https://storybook.js.org) (currently version `7`) as a collaboration tool for the UI development.

### Formatting

We use [Prettier](https://prettier.io/) for JS code formatting to automatically format the changed files on each commit. It can be [integrated](https://prettier.io/docs/en/editors.html) into various IDEs.

### Linting

We use [Eslint](https://eslint.org) to statically analyze our JS code to correct common issues to write a bug free application.

### Styling

- CSS-in-JS: [Styled Component](https://styled-components.com)
- Component Library: [Grommet](https://v2.grommet.io)

## Support

refine.bio web is developed by [Childhood Cancer Data Lab](https://www.ccdatalab.org) and powered by [Alex's Lemonade Stand Foundation](https://www.alexslemonade.org). You can [support](https://www.ccdatalab.org/donate-link) the CCDL’s efforts to give researchers the tools to create a healthier, more prosperous future for kids fighting cancer and beyond.

## License

Distrubuted under [the 3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause).
