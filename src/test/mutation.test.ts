import assert from "assert"
import client from "test"
import { parse } from "lib"
import DB from "config/connectDB"
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
                assert.deepStrictEqual(data.data.addQNA, true)
            })

            it("Create Comment", async () => {
                const db = await DB.get()
                const user = await db.collection("post").findOne({ id: qna1A.id })
                const mutation = `
                    mutation{
                        addComment(
                            qnaId:"${user._id}",
                            id:"${comment1A.id}",
                            content:"${comment1A.content}"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addComment, true)
            })

            it("Close Post", async () => {
                const db = await DB.get()
                const user = await db.collection("post").findOne({ id: qna1A.id })
                const mutation = `
                    mutation{
                        closeQNA(
                            qnaId:"${user._id}",
                            id:"${qna1Result.id}"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.closeQNA, true)
            })
        })
    })
})