import { ApolloError } from "apollo-server-errors"
import { ObjectId, Db } from "mongodb"

export default {
    addComment: async (
        parent: void, {
            qnaId,
            id,
            content,
        }: {
            qnaId: ObjectId,
            id: string,
            content: string
        }, {
            db
        }: {
            db: Db
        }
    ) => {
        const flag = await db.collection("post").findOne({ $or: [{ _id: new ObjectId(qnaId), qna: true }] })
        if (flag === null) {
            throw new ApolloError("해당 id의 QNA가 존재하지 않습니다.")
        }
        return await db.collection("comment").insertOne({
            qnaId,
            id,
            content
        }).then(({ result }) => result.n === 1 ? true : false)
    },

    addQNA: async (
        parent: void, {
            id,
            content
        }: {
            id: string,
            content: string
        }, {
            db
        }: {
            db: Db
        }
    ) => await db.collection("post").insertOne({
        id,
        content
    }).then(({ result }) => result.n === 1 ? true : false)

}