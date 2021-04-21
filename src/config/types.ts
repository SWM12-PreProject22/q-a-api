import { ReadStream } from "fs"
import { ObjectID } from "mongodb"
import DataLoader from "dataloader"

export interface Loaders {
    commentsLoader: DataLoader<ObjectID, any, ObjectID>
}

export interface File {
    filename: string
    mimetype: string
    encoding: string
    createReadStream: () => ReadStream
}

export interface QNA {
    id: string
    _id: ObjectID
    content: string
}

export interface Comment {
    id: string
    qnaId: ObjectID
    _id: ObjectID
    content: string
}