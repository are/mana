module.exports = {
    description: `get a value from the configuration`,
    run: async ({ parameters, assert, getConfig, setConfig, done }) => {
        const { first } = parameters

        assert(first !== undefined, `you must pass a key path`)

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

        const value = obj[finalKey] === undefined ? null : obj[finalKey]

        done({ key: first, value: value })
    }
}
