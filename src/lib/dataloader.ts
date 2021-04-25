import DataLoader from "dataloader"
import DB from "config/connectDB"
import { Comment, User } from "config/types"
import { ObjectId } from "mongodb"

const batchLoadCommentFn = async (postIds: readonly ObjectId[]) => {
    const db = await DB.get()
    const comments = await db.collection("comment").find({ qnaId: { $in: postIds } }).toArray()
    const table = new Map()
    const resultArr: Comment[][] = Array.from(Array(postIds.length), () => [])
    postIds.forEach((postId: ObjectId, idx: number) => table.set(postId + "", idx))
    comments.forEach((comment: Comment) => resultArr[table.get(comment.qnaId + "")].push(comment))
    return resultArr
}

const batchLoadUserFn = async (topicIds: readonly ObjectId[]) => {
    const db = await DB.get()
    const comments = await db.collection("user").find({ qnaId: { $in: topicIds } }).toArray()
    const table = new Map()
    const resultArr: User[][] = Array.from(Array(topicIds.length), () => [])
    topicIds.forEach((topicId: ObjectId, idx: number) => table.set(topicId + "", idx))
    comments.forEach((users: User) => resultArr[table.get(users.topicId + "")].push(users))
    return resultArr
}

export const commentsLoader = () => new DataLoader(batchLoadCommentFn)

export const usersLoader = () => new DataLoader(batchLoadUserFn)