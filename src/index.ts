import dotenv from "dotenv"
dotenv.config()
import env from "config/env"

import { express as voyagerMiddleware } from "graphql-voyager/middleware"
import { ApolloServer, ApolloError } from "apollo-server-express"
import { readFileSync } from "fs"
import { createServer } from "http"
import queryComplexity, { simpleEstimator } from "graphql-query-complexity"
import depthLimit from "graphql-depth-limit"
import DB from "config/connectDB"
import { commentsLoader, usersLoader } from "lib"

import express from "express"
import expressPlayground from "graphql-playground-middleware-express"
import { bodyParserGraphQL } from "body-parser-graphql"
import resolvers from "resolvers"
const typeDefs = readFileSync("src/typeDefs.graphql", "utf-8")

const app = express()
app.use(bodyParserGraphQL())
app.use("/graphql", expressPlayground({ endpoint: "/api" }))
app.use("/voyager", voyagerMiddleware({ endpointUrl: "/api" }))
app.use("/api-docs", express.static("docs"))
const start = async () => {
    const db = await DB.get()
    if (db === null) {
        process.exit(0)
    }
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
            return {
                db,
                loaders: {
                    commentsLoader: commentsLoader(),
                    usersLoader: usersLoader()
                }
            }
        },
        validationRules: [
            depthLimit(5),
            queryComplexity({
                estimators: [
                    simpleEstimator({ defaultComplexity: 1 })
                ],
                maximumComplexity: 1000,
                onComplete: (complexity: number) => {
                    console.log(`Query Complexity: ${complexity}`)
                },
                createError: (max: number, actual: number) => {
                    return new ApolloError(`Query is too complex: ${actual}. Maximum allowed complexity: ${max}`);
                },
            })
        ],
        playground: false
    })

    server.applyMiddleware({
        app,
        path: "/api"
    })

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    httpServer.listen({ port: env.PORT }, () => {
        console.log(`GraphQL Server Running at http://localhost:${env.PORT}/api`)
    })
}

start()