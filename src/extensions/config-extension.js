const fs = require('fs').promises
const os = require('os')
const path = require('path')

const YAML = require('js-yaml')

module.exports = toolbox => {
    const configPath = path.resolve(os.homedir(), '.manarc')

    const getConfig = async () => {
        let contents

        try {
            contents = await fs.readFile(configPath, 'utf8')
        } catch (e) {
            contents = `# mana configuration file\ncreated_at: ${new Date().toISOString()}`
        }

        return YAML.safeLoad(contents)
    }

    const setConfig = async config => {
        const contents = YAML.safeDump(config)

        try {
            const file = await fs.open(configPath, 'w')

            await file.writeFile(contents, 'utf8')

            await file.close()
        } catch (e) {
            toolbox.die(e.message)
        }
    }

    toolbox.getConfig = getConfig
    toolbox.setConfig = setConfig
}
