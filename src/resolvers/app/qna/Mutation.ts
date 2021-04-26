import { ApolloError } from "apollo-server-errors"
import { ObjectId, Db } from "mongodb"
import env from "config/env"

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
            db,
            token
        }: {
            db: Db,
            token: string
        }
    ) => {
        if (token !== env.token) {
            throw new ApolloError("API KEY가 유효하지 않습니다.")
        }
        try {
            const _id = new ObjectId(qnaId)
            const flag = await db.collection("post").findOne({ _id, status: true })
            if (flag === null) {
                throw new ApolloError("")
            }
            return await db.collection("comment").insertOne({
                qnaId: _id,
                id,
                content
            }).then(({ result }) => result.n === 1 ? true : false)
        } catch (err) {
            if ("extensions" in err) {
                throw new ApolloError("해당 id의 QNA가 존재하지 않습니다.")
            }
            throw new ApolloError("qnaId가 ObjectId가 아닙니다.")
        }
    },

    addQNA: async (
        parent: void, {
            id,
            content
        }: {
            id: string,
            content: string
        }, {
            db,
            token
        }: {
            db: Db,
            token: string
        }
    ) => {
        if (token !== env.token) {
            throw new ApolloError("API KEY가 유효하지 않습니다.")
        }
        return await db.collection("post").insertOne({
            id,
            content,
            status: true,
            date: new Date().valueOf()
        }).then(({ result }) => result.n === 1 ? true : false)
    },

    closeQNA: async (
        parent: void, {
            id,
            qnaId,
            answererId
        }: {
            id: string,
            qnaId: ObjectId,
            answererId: string
        }, {
            db,
            token
        }: {
            db: Db,
            token: string
        }
    ) => {
        if (token !== env.token) {
            throw new ApolloError("API KEY가 유효하지 않습니다.")
        }
        try {
            const _id = new ObjectId(qnaId)
            const result = await db.collection("post").updateOne({
                _id,
                id,
                status: true
            }, { $set: { status: false } }).then(({ result }) => result.n === 1 ? true : false)
            if (result === true) {
                await db.collection("rank").updateOne({
                    id: answererId
                }, { $inc: { cnt: 1 } }, { upsert: true })
            }
            return result
        } catch {
            throw new ApolloError("qnaId가 ObjectId가 아닙니다.")
        }
    }
}