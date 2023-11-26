require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')

//routes

const invoiceRouter = require('./src/routes/invoiceRoute')
const productRouter = require('./src/routes/ProductRoute')


app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.json());

app.listen(process.env.PORT, 'localhost', () => console.log(`server is 🚀`));


app.use('/invoice', invoiceRouter)
app.use('/product', productRouter)
