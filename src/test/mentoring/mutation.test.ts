import assert from "assert"
import client from "test"
import { parse } from "lib"
import DB from "config/connectDB"
import { User, Topic } from "config/types"

describe(`Mutation Test`, () => {
    const topicIds: string[] = []
    describe(`Create Topic`, () => {
        describe("Success", () => {
            it("Create Topic - 1", async () => {
                const mutation = `
                    mutation{
                        addTopic(
                            title:"MSA 200% 사용하기",
                            description:"MSA에 관해서 같이 멘토링 듣고싶은분들 모여요!",
                            mentor:"남승원",
                            creater:"213213521312"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addTopic, true)
            })

            it("Create Topic - 2", async () => {
                const mutation = `
                    mutation{
                        addTopic(
                            title:"테스팅 200% 로 하는법!",
                            description:"테스팅에 대해서 멘토링 듣고싶은분들 손!",
                            mentor:"pukuba",
                            creater:"213213521315"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addTopic, true)
            })

            it("Create Topic - 3", async () => {
                const mutation = `
                    mutation{
                        addTopic(
                            title:"문제해결능력과 개발의 연관성?",
                            description:"문제해결능력과 개발의 연관성에 대해서 알고싶으신분?",
                            mentor:"kkzkk1234",
                            creater:"213213521317"
                        )
                    }
                `

                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.addTopic, true)
            })
        })
        after(async () => {
            const db = await DB.get()
            const reuslt: Topic[] = await db.collection("topic").find({}).toArray()
            for (const topic of reuslt) {
                topicIds.push(topic._id + "")
            }
        })
    })

    describe("sign Topic", () => {
        describe("Success", () => {
            it("signTopic - 1", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"${topicIds[0]}",
                            applicant:"erolf0123"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.signTopic, true)
            })

            it("signTopic - 2", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"${topicIds[0]}",
                            applicant:"namjs1540"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.signTopic, true)
            })

            it("signTopic - 3", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"${topicIds[0]}",
                            applicant:"kkzkk1234"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.signTopic, true)
            })

            it("signTopic - 4", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"${topicIds[0]}",
                            applicant:"SeungWon"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.signTopic, true)
            })

            it("signTopic - 5", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"${topicIds[1]}",
                            applicant:"erolf0123"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.signTopic, true)
            })

            it("signTopic - 6", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"${topicIds[2]}",
                            applicant:"erolf0123"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.data.signTopic, true)
            })
        })
        describe("Failure", () => {
            it("signTopic - 1", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"${topicIds[0]}",
                            applicant:"erolf0123"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.errors[0].message, "이미 신청한 유저입니다.")
            })

            it("signTopic - 2", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"ㅁㄴㅇㄹ",
                            applicant:"erolf0123"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.errors[0].message, "topicId가 ObjectId가 아닙니다.")
            })

            it("signTopic - 3", async () => {
                const mutation = `
                    mutation{
                        signTopic(
                            topicId:"123412341234123412341234",
                            applicant:"erolf0123"
                        )
                    }
                `
                const res = await client.mutate({
                    mutation
                })
                const data = parse(res)
                assert.deepStrictEqual(data.errors[0].message, "해당 게시글이 존재하지 않습니다.")
            })
        })
    })
})