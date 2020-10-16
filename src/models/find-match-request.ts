export class FindMatchRequest {
    constructor(readonly matchLabelsInput: string, readonly payload: GitHubWebhookPayload) {}

    getMatchLabels(): string[] {
        const regex = new RegExp(/[,;| ] */g)
        return this.matchLabelsInput.split(regex)
    }

    getPRLabels(): string[] | null {
        return (this.payload.pull_request?.labels as PullRequestLabels[])?.map(label => label.name)
    }
}

export interface PullRequestLabels {
    id: string
    name: string
    color: string
    default: boolean
    description: string
    node_id: string
    url: string
}

export interface GitHubWebhookPayload {
    pull_request?: {
        labels?: PullRequestLabels[]
    }
}
