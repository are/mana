const os = require('os')
const path = require('path')
const crypto = require('crypto')
const fss = require('fs')
const fs = fss.promises

module.exports = ctx => {
    const tempfile = async () => {
        const tempfile = crypto.randomBytes(8).toString('hex')
        const tempdir = await fs.mkdtemp(path.join(os.tmpdir(), 'mana-'))

        return path.resolve(tempdir, tempfile)
    }

    const touch = async filepath => {
        await fs.writeFile(filepath, '', 'utf8')
    }

    const stdin = () => {
        return fss.readFileSync(0, 'utf8')
    }

    ctx.fs = {
        ...fs,
        tempfile,
        touch,
        stdin
    }
}
