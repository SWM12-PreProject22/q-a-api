import { ObjectID } from "mongodb"
import DataLoader from "dataloader"

export interface Loaders {
    commentsLoader: DataLoader<ObjectID, any, ObjectID>
    usersLoader: DataLoader<ObjectID, any, ObjectID>
}

export interface QNA {
    id: string
    _id: ObjectID
    content: string
    status: Boolean
    comment: Comment[]
    date: number
    title: string
}

export interface Comment {
    id: string
    qnaId: ObjectID
    _id: ObjectID
    content: string
}

export interface Topic {
    title: string
    mentor: string
    description: string
    creater: string
    ids: User[]
    _id: ObjectID
    id: string
}

export interface User {
    topicId: ObjectID
    id: string
    _id: ObjectID
}