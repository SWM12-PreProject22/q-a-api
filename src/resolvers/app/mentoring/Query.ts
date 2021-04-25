import { ApolloError } from "apollo-server-errors"
import { ObjectId, Db } from "mongodb"
import { Topic, User } from "config/types"
export default {
    getAllTopic: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("topic").find().toArray(),
    getTopicById: async (parent: void, { id }: { id: string }, { db }: { db: Db }) => {
        try {
            const _id = new ObjectId(id)
            const topics = await db.collection("topic").findOne({ _id })
            if (topics === null) {
                throw new ApolloError("")
            }
            return topics
        } catch (err) {
            if ("extensions" in err) {
                throw new ApolloError("해당 게시글이 존재하지 않습니다.")
            }
            throw new ApolloError("id는 ObjectId가 아닙니다.")
        }
    },
    getTopicByUserId: async (parent: void, { id }: { id: string }, { db }: { db: Db }) => {
        const ids: ObjectId[] = []
        const users = await db.collection("user").find({ id }).toArray()
        users.forEach((user: User) => {
            ids.push(user.topicId)
        })
        return await db.collection("topic").find({ _id: { $in: ids } }).toArray()
    }
}