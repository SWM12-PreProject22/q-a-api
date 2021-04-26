import assert from "assert"
import client from "test"
import { parse } from "lib"
import DB from "config/connectDB"
import { Db } from "mongodb"
import {
    qna1A,
    comment1A,
    qna2A,
    comment2A,
    comment2B,
    comment2C
} from "test/qna/mock"
import { Comment } from "config/types"

describe(`Query Test`, () => {
    after(async () => {
        const db: Db = await DB.get()
        await db.collection("post").deleteMany({})
        await db.collection("comment").deleteMany({})
        await db.collection("rank").deleteMany({})
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
                const {
                    status,
                    content,
                    id,
                    comment
                } = data.data.getOpenQNA[0]

                assert.deepStrictEqual(status, true)
                assert.deepStrictEqual(id, qna2A.id)
                assert.deepStrictEqual(content, qna2A.content)
                assert.deepStrictEqual(comment[0].id, comment2A.id)
                assert.deepStrictEqual(comment[1].id, comment2B.id)
                assert.deepStrictEqual(comment[2].id, comment2C.id)
            })
            it(`get Close QNA`, async () => {
                const query = `
                    query{
                        getCloseQNA{
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
                const {
                    status,
                    content,
                    id,
                    comment
                } = data.data.getCloseQNA[0]
                assert.deepStrictEqual(status, false)
                assert.deepStrictEqual(id, qna1A.id)
                assert.deepStrictEqual(content, qna1A.content)
                assert.deepStrictEqual(comment[0].id, comment1A.id)
                assert.deepStrictEqual(comment[0].content, comment1A.content)
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
                data.data.getAllQNA.forEach(({ qnaId, comment }: { qnaId: string, comment: Comment[] }) => {
                    comment.forEach((item: Comment) => assert.deepStrictEqual(qnaId, item.qnaId))
                })
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

            it(`get User Ranking`, async () => {
                const query = `
                    query{
                        getAnswererRank{
                            id
                            cnt
                        }
                    }
                `
                const res = await client.query({ query })
                const data = parse(res)
                assert.deepStrictEqual(data.data.getAnswererRank[0].id, comment1A.id)
                assert.deepStrictEqual(data.data.getAnswererRank[0].cnt, 1)
            })

            it(`get Id By QNA`, async () => {
                const db: Db = await DB.get()
                const post = await db.collection("post").findOne({ content: qna2A.content })
                const query = `
                    query{
                        getIdByQNA(
                            qnaId:"${post._id}"
                        ){
                            content
                            id
                            status
                        }
                    }
                `
                const res = await client.query({ query })
                const data = parse(res)
                assert.deepStrictEqual(data.data.getIdByQNA.content, "GraphQL 장점이 뭔가요?")
                assert.deepStrictEqual(data.data.getIdByQNA.id, "pukuba")
                assert.deepStrictEqual(data.data.getIdByQNA.status, true)
            })
        })
    })
})