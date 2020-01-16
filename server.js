require('dotenv').config()

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import methodOverride from 'method-override' 

import errorHandler from './helpers/errorHandler'
import jwt from './helpers/jwt'
import router from './router'

let app = express(), port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(jwt())

app = router(app)

app.use(methodOverride())
app.use(errorHandler)

app.listen(port);