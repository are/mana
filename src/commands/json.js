module.exports = {
    run: async ({ done, fs, die, parameters: { first } }) => {
        const jquery = require('json-query')

        const input = await fs.stdin()
        const query = first === undefined ? '.' : first

        try {
            const data = JSON.parse(input)

            done(
                jquery(query, {
                    data: data,
                    locals: {
                        parse: input => {
                            return JSON.parse(input)
                        }
                    }
                }).value
            )
        } catch (e) {
            die(e.message)
        }
    },
    hidden: true
}
