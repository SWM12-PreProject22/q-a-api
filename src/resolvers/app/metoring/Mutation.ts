import { ApolloError } from "apollo-server-errors"
import { ObjectId, Db } from "mongodb"

export default {
    addTopic: async (
        parent: void, {
            title,
            mentor,
            description,
            creater
        }: {
            title: string,
            mentor: string,
            description: string,
            creater: string
        }, {
            db
        }: {
            db: Db
        }
    ) => await db.collection("post").insertOne({
        title,
        description,
        status: true,
        mentor,
        creater
    }).then(({ result }) => result.n === 1 ? true : false),

    closeTopic: async (parent: void, { id }: { id: string }, { db }: { db: Db }) => {
        try {
            const _id = new ObjectId(id)
            const users = await db.collection("user").find({ topicId: _id }).toArray()
            await db.collection("post").deleteMany({
                _id
            })
            await db.collection("user").deleteMany({
                topicId: _id
            })
            return users
        } catch {
            throw new ApolloError("id가 ObjectId가 아닙니다.")
        }
    },

    signTopic: async (
        parent: void, {
            topicId,
            applicant
        }: {
            topicId: string,
            applicant: string
        }, {
            db
        }: { db: Db }
    ) => {
        try {
            const postId = new ObjectId(topicId)
            const result = await db.collection("user").findOne({
                topicId: postId,
                id: applicant
            })
            if (result !== null) {
                throw new ApolloError("")
            }
            await db.collection("user").insertOne({
                topicId: postId,
                id: applicant
            })
        } catch (err) {
            if ("extensions" in err) {
                throw new ApolloError("이미 신청한 유저입니다.")
            }
            throw new ApolloError("qnaId는 ObjectId가 아닙니다.")
        }

    }
}