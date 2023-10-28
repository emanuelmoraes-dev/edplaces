const { promisify } = require('node:util')
const cmd = require('node:child_process')

const exec = promisify(cmd.exec)

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = async (req, res, next) => {
    let point = ''

    try {
        const putingPlace = req.method === 'PUT' &&
            req.url.match(/^\/places\/\d+/) &&
            req.header('Content-Type') === 'application/json'

        if (!putingPlace) {
            return next()
        }
        
        const route = req.body?.route
        const position = req.body?.position

        if (!route || typeof position !== 'number') {
            return next()
        }

        point = route[position]

        if (typeof point !== 'string') {
            point = point['System Name']
        }

        if (!point) {
            return next()
        }

        await exec(`echo|set /p="${point}" | clip`)

        console.log(`'${point}' copiado para o clipboard!`)

        return next()
    } catch (err) {
        res.status(500).json({ message: err?.message ?? `Não foi possível copiar '${point || ''}' para o clipboard!` })
        res.end()
    }
}