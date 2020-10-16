import {FindMatchRequest} from "../../../src/models/find-match-request";

describe("getMatchLabels", () => {

    test("it should return the single value", () => {
        // arrange
        const labels = "major"
        const sut = new FindMatchRequest(labels, {})

        // act
        const target = sut.getMatchLabels()

        // assert
        expect(target.length).toBe(1)
        expect(target).toContain("major")
    })

    test("it should split a comma delimited string", () => {
        // arrange
        const labels = "major,minor"
        const sut = new FindMatchRequest(labels, {})

        // act
        const target = sut.getMatchLabels()

        // assert
        expect(target.length).toBe(2)
        expect(target).toContain("major")
        expect(target).toContain("minor")
    })

    test("it should split a comma delimited (with space) string", () => {
        // arrange
        const labels = "major, minor,patch"
        const sut = new FindMatchRequest(labels, {})

        // act
        const target = sut.getMatchLabels()

        // assert
        expect(target.length).toBe(3)
        expect(target).toContain("major")
        expect(target).toContain("minor")
        expect(target).toContain("patch")
    })

    test("it should split a semi-colon delimited string", () => {
        // arrange
        const labels = "major;minor"
        const sut = new FindMatchRequest(labels, {})

        // act
        const target = sut.getMatchLabels()

        // assert
        expect(target.length).toBe(2)
        expect(target).toContain("major")
        expect(target).toContain("minor")
    })

    test("it should split a pipe delimited string", () => {
        // arrange
        const labels = "major|minor"
        const sut = new FindMatchRequest(labels, {})

        // act
        const target = sut.getMatchLabels()

        // assert
        expect(target.length).toBe(2)
        expect(target).toContain("major")
        expect(target).toContain("minor")
    })

    test("it should split a mixed delimited string", () => {
        // arrange
        const labels = "major| minor,patch"
        const sut = new FindMatchRequest(labels, {})

        // act
        const target = sut.getMatchLabels()

        // assert
        expect(target.length).toBe(3)
        expect(target[0]).toContain("major")
        expect(target[1]).toContain("minor")
        expect(target[2]).toContain("patch")
    })
})

describe("getPRLabels", () => {
    test("it should return null when pull_request is null", () => {
        // arrange
        const request = new FindMatchRequest("major", {})

        // act
        const target = request.getPRLabels()

        // assert
        expect(target).toBeUndefined()
    })

    test("it should return the PR labels when they exist on the PR", () => {
        // arrange
        const request = new FindMatchRequest("major", {
            pull_request: {
                labels: [
                    {id: "id", name: "foo", color: "color", default: false, description: "", node_id: "node_id", url: "url"},
                    {id: "id", name: "major", color: "color", default: false, description: "", node_id: "node_id", url: "url"},
                ]
            }
        })

        // act
        const target = request.getPRLabels()

        // assert
        expect(target).toContainEqual("foo")
        expect(target).toContainEqual("major")
    })
})