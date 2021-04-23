export const qna1A = {
    id: "pukuba",
    content: `GraphQL은 사용자가 쿼리를 작성하니 고의로 악의적인 쿼리를 날릴수 있는데 이런부분을 어떻게 해결하나요??`
}

export const comment1A = {
    id: "Eunhak Lee",
    content: `여러가지 방법이 있는데 대표적으로 query의 depth를 제한하는것과, 쿼리의 복잡도를 지정해 제한하는 방법이 있습니다.`
}

export const qna1Result = {
    id: "pukuba"
}

export const qna2A = {
    id: "pukuba",
    content: "GraphQL 장점이 뭔가요?"
}

export const comment2A = {
    id: "erolf0123",
    content: "endPoint가 하나면서, 쿼리를 작성하여 서버에 전송하기 때문에 언더패칭, 오버패칭을 해결합니다."
}

export const comment2B = {
    id: "pukuba",
    content: "쿼리를 전송하기 때문에 오히려 데이터 송수신에 있어 REST API 보다 비효율 적일수도 있겠네요?"
}

export const comment2C = {
    id: "erolf0123",
    content: "네 맞습니다. 언제나 고정적인 응답이면 REST API가 더 효율적일 수도 있습니다. 하지만 GQL을 사용한다 하더라도 Persisted Queries 를 이용해 쿼리에 사이즈를 줄여 고정적인 응답이여도 REST API와 비슷한 성능을 나타내게 할 수 있습니다. 다만 이런경우에는 GQL에 대한 숙련도가 좀 있어야합니다."
}