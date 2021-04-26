import { Db, ObjectId } from "mongodb"
import { ApolloError } from "apollo-server-errors"

export default {
    test: () => "Server On",
    getOpenQNA: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("post").find({ status: true }).toArray(),
    getAllQNA: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("post").find({}).toArray(),
    getCloseQNA: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("post").find({ status: false }).toArray(),
    getMyQNA: async (parent: void, { id }: { id: string }, { db }: { db: Db }) => await db.collection("post").find({ id }).toArray(),
    getDateByQNA: async (parent: void, { date }: { date: number }, { db }: { db: Db }) => await db.collection("post").find({ date: { $gte: date } }).toArray(),
    getIdByQNA: async (parent: void, { qnaId }: { qnaId: string }, { db }: { db: Db }) => {
        try {
            const _id = new ObjectId(qnaId)
            return await db.collection("post").findOne({ _id })
        } catch {
            throw new ApolloError("qnaId가 ObjectId가 아닙니다.")
        }
    }
}