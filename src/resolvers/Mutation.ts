import { Mutation as qna } from "resolvers/app/qna"
import { Mutation as mentoring } from "resolvers/app/mentoring"

export default {
    ...qna,
    ...mentoring
}
