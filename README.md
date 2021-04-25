# Q&A 게시판 API

[![Build Status](https://travis-ci.com/SWM12-PreProject22/qna-api.svg?branch=master)](https://travis-ci.com/SWM12-PreProject22/qna-api)

## 문서
`Document: ` <a href="https://pukuba.ga/api-docs">https://pukuba.ga/api-docs</a>
Q&A API Server의 문서입니다.

`Graph Relationships: ` <a href="https://pukuba.ga/voyager">https://pukuba.ga/voyager</a>
GraphQL API 서버의 Graph 관계입니다.

`Play Ground: ` <a href="https://pukuba.ga/graphql">https://pukuba.ga/graphql</a>
쿼리, 뮤테이션을 직접 날릴수 있는 PlayGround 입니다.

`API EndPoint: ` <a href="https://pukuba.ga/api">https://pukuba.ga/api</a>
API 엔드 포인트 입니다.

문서 보고 이해 안 되시는 부분, 모르시는 부분은 언제든지 연락주세요!

<hr>

## Request Example

예제에서는 JS의 fetch를 사용하였습니다.

`지금까지 등록된 모든 질문과, 답변을 가져오는 쿼리의 예제는 아래와 같습니다.`

``` js
const callAPI = async () => {
    const query = `
        query {
            getAllQNA {
                qnaId
                content
                comment {
                    content
                    commentId
                }
            }
        }
    `
    const endPoint = "https://pukuba.ga/api"
    const response = await fetch(
        `${endPoint}?query=${query}`, {
        method: "GET"
    })
    const result = await response.json()
    console.log(result)
}
callAPI()
```



`Q&A 게시글을 작성하는 뮤테이션의 예제는 아래와 같습니다.`
```js
const callAPI = async() => {
    const user = {
        id: "2351231512"
    }
    const query = `
        mutation {
            addQNA(
                id:"${user.id}",
                content:"http://boj.kr/8d82c36e86ca4bd5a0c5cd3b3a398396 반례 부탁드립니다."
            )
        }
    `
    const endPoint = "https://pukuba.ga/api"
    const response = await fetch(endPoint,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query })
        })
    const result = await response.json()
    console.log(result)
}
```

## 기타

- 더 필요한 쿼리나, 도움이 필요한 부분이 있으면 언제든지 불러주세요!