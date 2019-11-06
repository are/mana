const r = require('rethinkdb')

module.exports = toolbox => {
    const { getConfig } = toolbox

    let connection = null

    toolbox.db = async () => {
        const { rethinkdb } = await getConfig()
        if (rethinkdb === undefined) {
            throw new Error(`database is not configured`)
        }

        connection = await r.connect({
            host: rethinkdb.host,
            port: rethinkdb.port,
            db: rethinkdb.db
        })

        return connection
    }
}
