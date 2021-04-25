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
            await db.collection("post").updateOne({
                _id,
                status: true
            }, { $set: { status: false } }).then(({ result }) => result.n === 1 ? true : false)
            return await db.collection("user").find({ topicId: _id }).toArray()
        } catch {
            throw new ApolloError("qnaId는 ObjectId가 아닙니다.")
        }
    }
}