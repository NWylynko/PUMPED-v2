const axios = require("axios");
const path = require("path")
const fs = require("fs/promises")

const validate = async (host, schema) => {
  return post(`${host}/admin/schema/validate`, schema)
}

const push = async (host, schema) => {
  return post(`${host}/admin/schema`, schema)
}

const readSchema = (schemaPath) => fs.readFile(path.join(process.cwd(), schemaPath), "utf-8")

const post = async (url, schema) => {
  const body = Buffer.from(schema)

  const { data } = await axios.post(url, body)

  return data
}

const actions = {
  validate,
  push
}

const main = async (action, host, schemaPath) => {

  const fn = actions[action]

  if (!fn) {
    console.error(`this action ${action} is not supported`)
    console.error(`pick one from ${Object.keys(actions).join(", ")}`)
    return;
  }

  const schema = await readSchema(schemaPath)

  const result = await fn(host, schema)

  console.log(JSON.stringify(result, null, 2))
  return;

}

const [, , action, host, schemaPath] = process.argv

main(action, host, schemaPath)