import { Query as qna } from "resolvers/app/qna"
import { Query as mentoring } from "resolvers/app/mentoring"

export default {
    ...qna,
    ...mentoring
}