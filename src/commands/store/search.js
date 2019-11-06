module.exports = {
    run: async ({ parameters, fs, db, die, assert, done }) => {
        assert(parameters.first !== undefined, 'you need to pass id')

        const r = require('rethinkdb')

        try {
            const c = await db()

            const cursor = await r
                .table('docs')
                .filter(r.row('id').match(`^${parameters.first}`))
                .run(c)

            done(await cursor.toArray())
        } catch (e) {
            die(e.message)
        }
    }
}
