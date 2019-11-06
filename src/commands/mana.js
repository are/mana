module.exports = {
    run: async ({ done, meta }) => {
        done({
            commands: meta
                .commandInfo()
                .map(([name, description]) => ({ name, description }))
        })
    },
    hidden: true
}
