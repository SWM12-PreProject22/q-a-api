import assert from "assert"
import client from "test"
import { parse } from "lib"
import DB from "config/connectDB"
import { Db } from "mongodb"
import {
    qna1A,
    comment1A
} from "test/mock"

describe(`Query Test`, () => {
    after(async () => {
        const db: Db = await DB.get()
        await db.collection("post").deleteMany({})
        await db.collection("comment").deleteMany({})
    })
    before(async () => {
        const mutation1 = `
                mutation{
                    addQNA(
                        id:"${qna1A.id}",
                        content:"${qna1A.content}"
                    )
                }
            `
        const res1 = await client.mutate({
            mutation: mutation1
        })
        const data1 = parse(res1)
        assert.deepStrictEqual(data1.data.addQNA, true)

        const db = await DB.get()
        const user = await db.collection("post").findOne({ id: qna1A.id })
        const mutation2 = `
                    mutation{
                        addComment(
                            qnaId:"${user._id}",
                            id:"${comment1A.id}",
                            content:"${comment1A.content}"
                        )
                    }
                `
        const res2 = await client.mutate({
            mutation: mutation2
        })
        const data2 = parse(res2)
        assert.deepStrictEqual(data2.data.addComment, true)
    })
    describe(`Success`, () => {
        describe(`QNA - 1`, () => {
            it(`get Open QNA`, async () => {
                const query = `
                    query{
                        getOpenQNA{
                            status
                            content
                            id
                            qnaId
                            status
                            comment{
                                content
                                commentId
                                id
                                qnaId
                            }
                        }
                    }
                `
                const res = await client.query({
                    query
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.getOpenQNA[0].status, true)
                assert.deepStrictEqual(data.data.getOpenQNA[0].content, qna1A.content)
                assert.deepStrictEqual(data.data.getOpenQNA[0].id, qna1A.id)
                assert.deepStrictEqual(data.data.getOpenQNA[0].comment[0].content, comment1A.content)
                assert.deepStrictEqual(data.data.getOpenQNA[0].comment[0].id, comment1A.id)
            })

            it(`get All QNA`, async () => {
                const query = `
                    query{
                        getAllQNA{
                            qnaId
                            comment{
                                qnaId
                            }
                        }
                    }
                `
                const res = await client.query({
                    query
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.getAllQNA[0].qnaId, data.data.getAllQNA[0].comment[0].qnaId)
            })

            it(`get my QNA`, async () => {
                const query = `
                    query{
                        getMyQNA(
                            id:"${qna1A.id}"
                        ){
                            id
                        }
                    }
                `
                const res = await client.query({
                    query
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.getMyQNA[0].id, qna1A.id)
            })
        })
    })
})