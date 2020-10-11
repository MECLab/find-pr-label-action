import * as core from '@actions/core'

async function run(): Promise<void> {
    try {
        const labels: string = core.getInput('labels')
        core.debug(`Finding ${labels}`)

        // core.setOutput('time', new Date().toTimeString())
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
