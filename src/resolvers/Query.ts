import { Db } from "mongodb"

export default {
    test: () => "Server On",
    getOpenQNA: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("post").find({ status: true }).toArray(),
    getAllQNA: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("post").find({}).toArray(),
    getCloseQNA: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("post").find({ status: false }).toArray(),
    getMyQNA: async (parent: void, { id }: { id: string }, { db }: { db: Db }) => await db.collection("post").find({ id }).toArray()
}