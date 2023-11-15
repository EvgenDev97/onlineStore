require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const PORT = process.env.PORT || 5000
// .listen Starts a UNIX socket and listens for connections on the given path.
// This method is identical to Node’s http.Server.listen().
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleWare')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)
const start = async ()=>{
    try{
        //db connection
        await sequelize.authenticate()
        //checks the database state against the data schema
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server is working port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start().then()
