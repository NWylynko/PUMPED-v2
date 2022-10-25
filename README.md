Pumped is an online store with the focus on shoes, built to be a simple and easy platform for customers. This is an example project and is absolutely not production ready. To Build a production ready online store look in to using Shopify.

## Frameworks, Tools, Libraries:
- [<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"/>](https://nextjs.org)
- [<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>](https://beta.reactjs.org)
- [tRPC](https://trpc.io/docs/v10)
- [Genql](https://genql.vercel.app)
- [<img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white"/> Auth](https://firebase.google.com/products/auth)
- [Bun](https://bun.sh) - just for dependencies
- [<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>](https://styled-components.com)
- [Zod](https://zod.dev)
- [<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>](https://typescriptlang.org)
- [Dgraph](https://dgraph.io)

## Initial Setup

1. `bun install` to install dependencies (we use https://bun.sh for dependency installs)
2. `bun run database:start` to bring up the database (runs in docker)
3. `cp .env.local.example .env.local` and set local env variables
4. `bun run schema:validate` to check the schema is valid
5. `bun run schema:push` to push the schema to the database
6. `bun run generate-graphql` to generate the graphql types
7. Download service account from firebase console and save as `service-account.json`
8. `bun run dev` to bring up next.js

Next.js will only check types of the code your currently running, you can run `bun run typecheck:watch` to typecheck the entire codebase

## Commands
 - use `bun run database:start` and `bun run database:stop` to start and stop the database
 - run `bun run schema:validate` and `bun run schema:push` to update the schema (found at ./schema.graphql)
 - run `bun run generate-graphql` if the schema has changed to pull the correct types in to the project
 - use `bun run dev` to start the next.js development server and open http://localhost:3000 to view