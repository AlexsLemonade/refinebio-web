# refinebio-web

Refinebio Client using [Next.js](https://nextjs.org/)

## Getting Started

### Run the local environment:

The following command starts both `client` and Storybook:

```bash
yarn compose up
```

**Ports**

- `client`: [7000](http://localhost:7000)

- Storybook: [6006](http://localhost:6006)

### Run only `client`:

```bash
yarn compose up client
```

### Run only Storybook:

```bash
yarn compose up storybook
```

### Stop the docker container:

```bash
yarn down
```

## Other resources

- [Vercel with Next.js](https://vercel.com/solutions/nextjs)
- [Next.js docs](https://nextjs.org/docs)
- [Storybook CLI](https://storybook.js.org/docs/react/api/cli-options)
