import { z } from "zod";

const validate = async (host: string, schema: string) => {
  const response = await post(`${host}/admin/schema/validate`, schema)

  if (response.errors[0].message !== "Schema is valid") {
    log(response)
    throw new Error(response.errors[0].message)
  }

  return response
}

const push = async (host: string, schema: string) => {
  return post(`${host}/admin/schema`, schema)
}

const readSchema = async (schemaPath: string) => {
  const blob = Bun.file(schemaPath);
  const schema = await blob.text();
  return schema;
}

const post = async (url: string, schema: string) => {
  const body = Buffer.from(schema)

  const response = await fetch(url, {
    method: "POST",
    body: body,
  })

  const result = await response.blob()
  const data = await result.json()

  return data
}

const actions = new Map([
  ["validate", validate],
  ["push", push]
])

const getArgs = async () => {
  const argsSchema = z.object({
    action: z.union([z.literal("validate"), z.literal("push")]),
    host: z.string().url(),
    schemaPath: z.string()
  })
  
  const [, , action, host, schemaPath] = process.argv
  return argsSchema.parseAsync({ action, host, schemaPath })
}

const log = (message: object) => {
  console.log(JSON.stringify(message, null, 2))
}

const args = await getArgs()
const fn = actions.get(args.action)
const schema = await readSchema(args.schemaPath)
const result = await fn(args.host, schema)
log(result);