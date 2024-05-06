const express = require("express");
const dbConfig = require("./config/dbConfig");
const path = require('path')
const mongoose = require('mongoose')
const app = express();

const cors = require('cors')

require("dotenv").config();
app.use(express.json());


const user = require('./routes/user')
const bikeRoutes = require('./routes/bike')

const auth = require('./middleware/auth')


const fileUpload = require('express-fileupload')

app.use(
  fileUpload({
    debug: true,
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: 4
  })
)

mongoose
  .connect(process.env.MONGODB_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const publicDirectoryPath = path.join(__dirname, './view')

app.use(express.static(publicDirectoryPath))

app.use('/course-file', express.static('course-file'))

app.use(cors())
app.use('/users', user)
app.use('/bikes', bikeRoutes);


const port = process.env.port || 9000;

app.listen(port, () => console.log(`Node JS server listening on port ${port}`));