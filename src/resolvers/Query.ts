import { Db } from "mongodb"

export default {
    test: () => "Server On",
    getOpenQNA: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("post").find({ status: true }).toArray(),
}