import * as core from '@actions/core'
import {context} from '@actions/github'

async function run(): Promise<void> {
    try {
        const labels: string = core.getInput('anyOf')
        const pr_labels = context.payload.pull_request?.labels || []

        core.debug(`find using: ${JSON.stringify({labels, pr_labels}, null, 2)}`)

        // core.setOutput('time', new Date().toTimeString())
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
