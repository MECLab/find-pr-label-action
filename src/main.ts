import * as core from "@actions/core"
import {context} from "@actions/github"
import {FindMatchRequest} from "./models/find-match-request"
import {LabelMatchingService} from "./services/label-matching-service"

async function run(): Promise<void> {
    try {
        const matchInputs: string = core.getInput("match_any")
        const request = new FindMatchRequest(matchInputs, context.payload)

        const matchingService = new LabelMatchingService()
        const output = matchingService.findMatches(request)

        core.setOutput("matches", output)
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
