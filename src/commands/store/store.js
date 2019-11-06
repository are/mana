module.exports = {
    run: async ({ parameters, fs, db, die, done }) => {
        const r = require('rethinkdb')

        let data = parameters.first === '-' ? fs.stdin() : ''
        let created_at = new Date().toISOString()
        let name = parameters.options.name || 'no name'

        try {
            const c = await db()

            const { generated_keys } = await r
                .table('docs')
                .insert({
                    name,
                    data,
                    created_at
                })
                .run(c)

            done({ id: generated_keys[0], name, data, created_at })
        } catch (e) {
            die(e.message)
        }
    }
}
