module.exports = {
    alias: 's',
    description: `create a scratch file and open it`,
    run: async ({ parameters, system, done, fs }) => {
        const filepath = await fs.tempfile()

        await fs.touch(filepath)

        const result = await system.run(`sublime -nw ${filepath}`)

        const contents = await fs.readFile(filepath, 'utf8')

        await fs.unlink(filepath)

        done(contents)
    }
}
