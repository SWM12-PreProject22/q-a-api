import { ObjectID } from "mongodb"
import DataLoader from "dataloader"

export interface Loaders {
    commentsLoader: DataLoader<ObjectID, any, ObjectID>
}

export interface QNA {
    id: string
    _id: ObjectID
    content: string
    status: Boolean
    comment: Comment[]
}

export interface Comment {
    id: string
    qnaId: ObjectID
    _id: ObjectID
    content: string
}