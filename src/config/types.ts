import { ReadStream } from "fs"
import { ObjectID } from "mongodb"
export interface File {
    filename: string
    mimetype: string
    encoding: string
    createReadStream: () => ReadStream
}

export interface QNA {
    id: string
    qnaId: ObjectID
    content: string
}

export interface Comment {
    id: string
    qndId: ObjectID
    contentId: ObjectID
    content: string
}