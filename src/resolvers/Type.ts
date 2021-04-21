import { QNA, Comment, Loaders } from "config/types"

export default {
    QNA: {
        qnaId: (parent: QNA) => parent._id + "",
        comment: (parent: QNA, args: void, { loaders }: { loaders: Loaders }) => loaders.commentsLoader.load(parent._id)
    },
    Comment: {
        commentId: (parent: Comment) => parent._id + ""
    }
}