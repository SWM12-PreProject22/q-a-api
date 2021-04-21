import assert from "assert"
import client from "test"
import { parse } from "lib"

describe(`Server Init Test`, () => {

    it(`Server Running Test-1`, async () => {
        const query = `
            query{
                test
            }
        `
        const res = await client.query({
            query
        })
        const data = parse(res)
        assert.strictEqual(data.data.test, "Server On")
    })
    it(`Server Running Test-2`, async () => {
        const query = `
            query{
                test1
            }
        `
        const res = await client.query({
            query
        })
        const data = parse(res)
        assert.strictEqual(data.errors[0].message, 'Cannot query field "test1" on type "Query". Did you mean "test"?')
    })
})