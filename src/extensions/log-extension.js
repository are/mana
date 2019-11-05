module.exports = toolbox => {
    toolbox.print = message => {
        process.stdout.write(`${JSON.stringify(message)}\n`)
    }

    toolbox.die = message => {
        process.stderr.write(
            `${JSON.stringify({ ok: false, error: message })}\n`
        )
        process.exit(1)
    }

    toolbox.done = (data = {}) => {
        process.stdout.write(`${JSON.stringify({ ok: true, ...data })}\n`)
        process.exit(0)
    }

    toolbox.assert = (condition, message) => {
        if (condition !== true) {
            process.stderr.write(
                `${JSON.stringify({ ok: false, error: message })}\n`
            )
            process.exit(1)
        }
    }
}
