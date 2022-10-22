import { z } from "zod";

const validate = async (host: string, schema: string) => {
  return post(`${host}/admin/schema/validate`, schema)
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

const actions = {
  validate,
  push
}

const argsSchema = z.object({
  action: z.union([z.literal("validate"), z.literal("push")]),
  host: z.string().url(),
  schemaPath: z.string()
})

const args = await (async () => {
  const [, , action, host, schemaPath] = process.argv
  return argsSchema.parseAsync({ action, host, schemaPath })
})()

const fn = actions[args.action]

if (!fn) {
  console.error(`this action ${args.action} is not supported`)
  console.error(`pick one from ${Object.keys(actions).join(", ")}`)
  process.exit();
}

const schema = await readSchema(args.schemaPath)

const result = await fn(args.host, schema)

console.log(JSON.stringify(result, null, 2))