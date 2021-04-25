import assert from "assert"
import client from "test"
import { parse } from "lib"
import DB from "config/connectDB"
import {
    qna1A,
    qna1Result,
    comment1A,
    qna2A,
    comment2A,
    comment2B,
    comment2C
} from "test/qna/mock"

describe(`Mutation Test`, () => {
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
                const user = await db.collection("post").findOne({ content: qna1A.content })
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

        describe("QNA - 2", () => {
            it("Create Post", async () => {
                const mutation = `
                    mutation{
                        addQNA(
                            id:"${qna2A.id}",
                            content:"${qna2A.content}"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addQNA, true)
            })
            it("Create Comment - 1", async () => {
                const db = await DB.get()
                const user = await db.collection("post").findOne({ content: qna2A.content })
                const mutation = `
                    mutation{
                        addComment(
                            qnaId:"${user._id}",
                            id:"${comment2A.id}",
                            content:"${comment2A.content}"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addComment, true)
            })
            it("Create Comment - 2", async () => {
                const db = await DB.get()
                const user = await db.collection("post").findOne({ content: qna2A.content })
                const mutation = `
                    mutation{
                        addComment(
                            qnaId:"${user._id}",
                            id:"${comment2B.id}",
                            content:"${comment2B.content}"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addComment, true)
            })

            it("Create Comment - 3", async () => {
                const db = await DB.get()
                const user = await db.collection("post").findOne({ content: qna2A.content })
                const mutation = `
                    mutation{
                        addComment(
                            qnaId:"${user._id}",
                            id:"${comment2C.id}",
                            content:"${comment2C.content}"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addComment, true)
            })
        })
    })

    describe("Failure", () => {
        it("Create Comment - 1", async () => {
            const mutation = `
                mutation{
                    addComment(
                        qnaId:"FailureCase",
                        id:"kkzkk1234",
                        content:"🤔"
                    )
                }
            `
            const res = await client.mutate({
                mutation
            })
            const data = parse(res)
            assert.deepStrictEqual(data.errors[0].message, "qnaId가 ObjectId가 아닙니다.")
        })
        it("Create Comment - 2", async () => {
            const mutation = `
                mutation{
                    addComment(
                        qnaId: "Failure-Case",
                        id:"kkzkk1234",
                        content:":thinking_face:"
                    )
                }
            `
            const res = await client.mutate({
                mutation
            })
            const data = parse(res)
            assert.deepStrictEqual(data.errors[0].message, "해당 id의 QNA가 존재하지 않습니다.")
        })
        it("Close Post - 1", async () => {
            const mutation = `
                mutation{
                    closeQNA(
                        qnaId:"FailureCase",
                        id:"kkzkk1234"
                    )
                }
            `
            const res = await client.mutate({
                mutation
            })
            const data = parse(res)
            assert.deepStrictEqual(data.errors[0].message, "qnaId가 ObjectId가 아닙니다.")
        })
        it("Close Post - 2", async () => {
            const mutation = `
                mutation{
                    closeQNA(
                        qnaId:"Failure-Case",
                        id:"kkzkk1234"
                    )
                }
            `
            const res = await client.mutate({
                mutation
            })
            const data = parse(res)
            assert.deepStrictEqual(data.data.closeQNA, false)
        })
    })
})