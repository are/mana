module.exports = {
    description: `set a value in the configuration`,
    run: async ({ parameters, assert, getConfig, setConfig, done }) => {
        const { first, second } = parameters

        assert(first !== undefined, `you must pass a key path and it's value`)

        const config = await getConfig()

        const keyPath = first.split('.')
        const path = keyPath.slice(0, -1)
        const finalKey = keyPath.slice(-1)[0]

        let obj = config
        for (let key of path) {
            if (obj[key] === undefined) {
                obj[key] = {}
            }

            obj = obj[key]
        }

        obj[finalKey] = second

        await setConfig(config)

        done(config)
    }
}
