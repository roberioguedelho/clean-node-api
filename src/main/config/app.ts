import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routres'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app
