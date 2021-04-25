import env from "config/env"
import { MongoClient, Db } from "mongodb"

let db: Db | null = null
let instance: number = 0
const connectDB = () => {
    if (process.env.MOD === "TEST") process.env.DB_HOST = "mongodb://localhost:27017/test"
    const connect = async () => {

        try {
            const client = await MongoClient.connect(
                process.env.DB_HOST || env.DB_HOST
                , {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            const _db = client.db()
            return _db
        } catch (e) {
            console.log(e)
            return null
        }
    }

    const get = async () => {
        try {
            ++instance
            console.log(`DB called ${instance} times`)
            if (db != null) {
                return db
            } else {
                console.log(`getting new db connection`)
                db = await connect()
                return db
            }
        }
        catch (e) {
            return e
        }
    }

    return { get }
}

export default connectDB()