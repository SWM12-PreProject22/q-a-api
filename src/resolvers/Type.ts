import { QNA, Comment, Loaders, Topic } from "config/types"

export default {
    QNA: {
        qnaId: (parent: QNA) => parent._id + "",
        comment: (parent: QNA, args: void, { loaders }: { loaders: Loaders }) => loaders.commentsLoader.load(parent._id),
        date: (parent: QNA) => new Date(parent.date + 1000 * 60 * 60 * 9).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },
    Comment: {
        commentId: (parent: Comment) => parent._id + ""
    },
    Topic: {
        id: (parent: Topic) => parent._id + "",
        users: (parent: Topic, args: void, { loaders }: { loaders: Loaders }) => loaders.usersLoader.load(parent._id)
    }
}