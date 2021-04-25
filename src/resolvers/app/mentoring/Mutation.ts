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
    ) => {

        const result = await db.collection("topic").insertOne({
            title,
            description,
            status: true,
            mentor,
            creater
        }).then(({ ops }) => ops[0])

        return await db.collection("user").insertOne({
            id: creater,
            topicId: result._id
        }).then(({ result }) => result.n === 1 ? true : false)
    },

    closeTopic: async (parent: void, { id }: { id: string }, { db }: { db: Db }) => {
        try {
            const _id = new ObjectId(id)
            const users = await db.collection("user").find({ topicId: _id }).toArray()
            await db.collection("topic").deleteMany({
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
            if (await db.collection("topic").findOne({ _id: postId }) === null) {
                throw new ApolloError("", "null")
            }
            return await db.collection("user").insertOne({
                topicId: postId,
                id: applicant
            }).then(({ result }) => result.n === 1 ? true : false)
        } catch (err) {
            if ("extensions" in err) {
                if (err.extensions.code === "null") {
                    throw new ApolloError("해당 게시글이 존재하지 않습니다.")
                }
                else {
                    throw new ApolloError("이미 신청한 유저입니다.")
                }
            }
            throw new ApolloError("topicId가 ObjectId가 아닙니다.")
        }

    }
}