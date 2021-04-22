# Q&A 게시판 API

[![Build Status](https://travis-ci.com/SWM12-PreProject22/qna-api.svg?branch=master)](https://travis-ci.com/SWM12-PreProject22/qna-api)

## 문서
Document & Schema: https://pukuba.ga/api

플레이 그라운드에서 오른쪽 중단에 DOCS / Schema 버튼을 눌러 각 문서를 확인할 수 있습니다.

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

- 지금 서버는 성능이 좋지 않아서 매우 느려요, 늦어도 1주 뒤까지 옮길 거에요.

- 더 필요한 쿼리나, 도움이 필요한 부분이 있으면 언제든지 불러주세요!