import * as core from "@actions/core"
import {FindMatchRequest} from "../models/find-match-request"

export class LabelMatchingService {
    findMatches(req: FindMatchRequest): {match?: string} | null {
        core.startGroup("matching-service")

        core.debug("retrieving match labels and PR labels")
        const match_labels = req.getMatchLabels().map(label => label.toLowerCase())
        const pr_labels = req.getPRLabels()?.map(label => label.toLowerCase())

        if (!pr_labels) {
            core.info("Skip matching... No labels exists on the PR")
            return null
        }

        core.debug("Retrieving matches")
        const match = pr_labels.find(pr_label => match_labels.some(match_label => pr_label === match_label))

        core.endGroup()
        return {match}
    }
}
