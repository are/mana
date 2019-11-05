module.exports = {
    description: `Initialize empty config file in your home directory.`,
    run: async ({ filesystem: fs, done, assert, template }) => {
        const configPath = fs.resolve(fs.homedir(), ".manarc")
        const configExists = await fs.existsAsync(configPath)

        assert(configExists === false, `config file already exists`)

        template.generate({
            template: ".manarc.ejs",
            target: configPath,
            props: { createdAt: new Date().toISOString() }
        })

        done()
    }
}
