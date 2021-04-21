import assert from "assert"
import client from "test"
import { parse } from "lib"
import {
    qna1A,
    qna1Result,
    comment1A
} from "test/mock"

describe(`Create Test`, () => {
    describe(`Success`, () => {
        describe(`QNA - 1`, () => {
            it("Create Post", async () => {
                const mutation = `
                    mutation{
                        addQNA(
                            id:"${qna1A.id}",
                            content:"${qna1A.content}"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addQna, true)
            })
        })
    })
})