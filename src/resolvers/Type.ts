import { QNA, Comment } from "config/types"

export default {
    QNA: {
        qnaId: (parent: QNA) => parent._id + "",
        // comments: (parent: Comment, args: void, { loaders }: { loaders: Loaders }) => loaders.commentsLoader.load(parent._id)
    },
    Comment: {
        commentId: (parent: Comment) => parent._id + ""
    }
}