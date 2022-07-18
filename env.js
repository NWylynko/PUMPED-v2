const { loadEnvConfig } = require("@next/env")

loadEnvConfig(".")

console.log('DOMAIN:', process.env.DOMAIN)
console.log('DGRAPH_API:', process.env.DGRAPH_API)