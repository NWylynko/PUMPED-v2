This uses Next.js, read here [Next.js Documentation](https://nextjs.org/docs) -
learn about Next.js

## First Setup

1. `yarn install` to install dependencies
2. `docker-compose up` to bring up the database (append `-d` to run in the background)
3. `cp .env.local.example .env.local` and set local env variables
4. `yarn schema:push` to push the schema to the database
5. `yarn generate-types:watch` to generate the types and functions
6. download service account from firebase console and save as
   `service-account.json`
7. `yarn dev` to bring up next.js

You will have 3 terminal windows open, 4 if you want to run `yarn typecheck:watch` to
watch for type errors
