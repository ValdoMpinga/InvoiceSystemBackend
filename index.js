require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');

//routes

const invoiceRouter = require('./src/routes/invoiceRoute')
// const crimeOccurenceRouter = require('./api/routes/crimeOccurence')
// const crimePrepertratorRouter = require('./api/routes/crimeprepertrator')
// const migrationRouter = require('./api/routes/migration')
// const murderVictimRouter = require('./api/routes/murderVictims')
// const graphRouter = require('./api/routes/graphQueries')


const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.listen
    (
        process.env.PORT, () => console.log(`server is 🚀`)
    );

app.use('/invoice', invoiceRouter)

// app.use('/migration', migrationRouter)

// app.use('/crime/occurence', crimeOccurenceRouter)

// app.use('/crime/prepertrator', crimePrepertratorRouter)

// app.use('/murder/victim', murderVictimRouter)

// app.use('/murdersGraph', expressGraphQL({
//     schema: schema,
//     graphiql: true
// }))
