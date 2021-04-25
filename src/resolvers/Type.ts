import { QNA, Comment, Loaders, Topic } from "config/types"

export default {
    QNA: {
        qnaId: (parent: QNA) => parent._id + "",
        comment: (parent: QNA, args: void, { loaders }: { loaders: Loaders }) => loaders.commentsLoader.load(parent._id)
    },
    Comment: {
        commentId: (parent: Comment) => parent._id + ""
    },
    Topic: {
        ids: (parent: Topic, args: void, { loaders }: { loaders: Loaders }) => loaders.usersLoader.load(parent._id)
    }
}