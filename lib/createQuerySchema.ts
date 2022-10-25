import { z } from "zod"

// const schema = createQuerySchema("id", "id2", "id3")
// use schema.parse(router.query) to parse
export const createQuerySchema = <QueryItems extends Readonly<string[]>>(...queryItems: QueryItems) => {

  type keys = typeof queryItems[number]

  const schemaItems = queryItems.reduce((accumulator, value) => {

    return { ...accumulator, [value]: z.string() };
  
  }, {} as { [key in keys]: z.ZodString })

  return z.object(schemaItems)
}

