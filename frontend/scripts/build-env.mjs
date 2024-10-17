import {networkInterfaces} from 'os'
import {writeFile} from 'node:fs/promises'
import {dirname, resolve} from 'node:path'

function getLocalIP() {
  const interfaces = networkInterfaces()
  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address
      }
    }
  }
}

// local 1 --production=false <local-ip>
const envname = process.argv[2] ?? 'local'
const filepath = resolve(dirname(process.argv[1]), '..', 'src', 'environments', `environment.${envname}.ts`)
const defaultId = process.argv[3]
  ? parseInt(process.argv[3])
  : 1
const production = !!(process.argv[4] ?? '').match(/^production="?true"?$/)
const ip = process.argv[5] ?? getLocalIP() ?? 'localhost'

const envJson = {
  production,
  defaultId,
  headers: {},
  placeUrl: `http://${ip}:3888/places/`
}
const envContent = `export const environment = ${JSON.stringify(envJson, null, 2)}\n`

writeFile(filepath, envContent)
    .then(() => console.log(filepath, 'generated with ip', ip))
    .catch(err => console.error(err))
