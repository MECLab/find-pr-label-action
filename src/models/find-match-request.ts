import {WebhookPayload} from "@actions/github/lib/interfaces"

export class FindMatchRequest {
    constructor(readonly matchLabelsInput: string, readonly payload: WebhookPayload) {}

    getMatchLabels(): string[] {
        const regex = new RegExp(/[,;| ] */g)
        return this.matchLabelsInput.split(regex)
    }

    getPRLabels(): string[] | null {
        return this.payload.pull_request?.labels
    }
}

// export interface PullRequestLabels {
//
// }
