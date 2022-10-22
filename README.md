This uses Next.js, read here [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js

## First Setup

1. `bun install` to install dependencies (we use https://bun.sh for dependency installs)
2. `bun run database:start` to bring up the database (runs in docker)
3. `cp .env.local.example .env.local` and set local env variables
4. `bun run schema:validate` to check the schema is valid
5. `bun run schema:push` to push the schema to the database
6. `bun run generate-types` to generate the graphql types
7. download service account from firebase console and save as
   `service-account.json`
8. `bun run dev` to bring up next.js

Next.js will only check types of the code your currently running, you can run `bun run typecheck:watch` to typecheck the entire codebase

commands:
 - use `bun run database:start` and `bun run database:stop` to start and stop the database
 - run `bun run schema:validate` and `bun run schema:push` to update the schema (found at ./schema.graphql)
 - run `bun run generate-types` if the schema has changed to pull the correct types in to the project
 - use `bun run dev` to start the next.js development server and open http://localhost:3000 to view