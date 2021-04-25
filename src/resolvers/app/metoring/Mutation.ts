import { ApolloError } from "apollo-server-errors"
import { ObjectId, Db } from "mongodb"

export default {
    getAllTopic: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("topic").find({ status: true }).toArray(),
    getTopicById: async (parent: void, { id }: { id: string }, { db }: { db: Db }) => {
        try {
            const _id = new ObjectId(id)
            return await db.collection("topic").findOne({ _id })
        } catch {
            throw new ApolloError("id가 ObjectId가 아닙니다.")
        }
    }
}