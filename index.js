require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');

//routes

const invoiceRouter = require('./src/routes/invoiceRoute')


const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.listen
    (
        process.env.PORT, () => console.log(`server is 🚀`)
    );

app.use('/invoice', invoiceRouter)
