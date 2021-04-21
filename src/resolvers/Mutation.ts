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
        const flag = await db.collection("post").findOne({ _id: new ObjectId(qnaId), status: true })
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
        content,
        status: true
    }).then(({ result }) => result.n === 1 ? true : false),

    closeQNA: async (
        parent: void, {
            id,
            qnaId
        }: {
            id: string,
            qnaId: ObjectId
        }, {
            db
        }: {
            db: Db
        }
    ) => await db.collection("post").updateOne({
        _id: new ObjectId(qnaId),
        id,
        status: true
    }, { $set: { status: false } }).then(({ result }) => result.n === 1 ? true : false)
}