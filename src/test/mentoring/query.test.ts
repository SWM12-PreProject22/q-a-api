import assert from "assert"
import client from "test"
import { parse } from "lib"
import DB from "config/connectDB"
import { Db } from "mongodb"
import { User, Topic } from "config/types"

describe(`Query Test`, () => {
    after(async () => {
        const db: Db = await DB.get()
        await db.collection("user").deleteMany({})
        await db.collection("topic").deleteMany({})
    })
    const topicIds: string[] = []
    describe("Success", () => {
        it("getAllTopic", async () => {
            const query = `
                query{
                    getAllTopic{
                        id
                        users{
                            id
                        }
                    }
                }
            `
            const res = await client.query({
                query
            })
            const data = parse(res)
            data.data.getAllTopic.forEach((topic: Topic) => {
                topicIds.push(topic.id)
            })
            assert.deepStrictEqual(data.data.getAllTopic[0].users[1].id, "erolf0123")
            assert.deepStrictEqual(data.data.getAllTopic[0].users[4].id, "SeungWon")
        })

        it("getTopicById", async () => {
            const query = `
                query{
                    getTopicById(
                        id:"${topicIds[0]}"
                    ){
                        id
                        title
                        mentor
                        creator
                    }
                }
            `
            const res = await client.query({
                query
            })
            const data = parse(res)
            assert.deepStrictEqual(data.data.getTopicById.title, "MSA 200% 활용하기")
            assert.deepStrictEqual(data.data.getTopicById.mentor, "남승원")
            assert.deepStrictEqual(data.data.getTopicById.creator, "213213521312")
        })

        it("getTopicByUserId", async () => {
            const query = `
                query{
                    getTopicByUserId(
                        id:"erolf0123"
                    ){
                        title
                        id
                    }
                }
            `
            const res = await client.query({
                query
            })
            const data = parse(res)
            assert.deepStrictEqual(data.data.getTopicByUserId[0].title, "MSA 200% 활용하기")
            assert.deepStrictEqual(data.data.getTopicByUserId[1].title, "테스팅 200% 하는법!")
            assert.deepStrictEqual(data.data.getTopicByUserId[2].title, "문제해결능력과 개발의 연관성?")
        })
    })

    describe("Failure", () => {
        it("getTopicById - 1", async () => {
            const query = `
                query{
                    getTopicById(
                        id:"aaaabbbbccccaaaabbbbcccc"
                    ){
                        id
                        title
                        mentor
                        creator
                    }
                }
            `
            const res = await client.query({
                query
            })
            const data = parse(res)
            assert.deepStrictEqual(data.errors[0].message, "해당 게시글이 존재하지 않습니다.")
        })
        it("getTopicById - 2", async () => {
            const query = `
                query{
                    getTopicById(
                        id:"ㅁㄴㅇㄹ"
                    ){
                        id
                        title
                        mentor
                        creator
                    }
                }
            `
            const res = await client.query({
                query
            })
            const data = parse(res)
            assert.deepStrictEqual(data.errors[0].message, "id는 ObjectId가 아닙니다.")
        })
    })
})