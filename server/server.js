const express = require('express'),
    cors = require('cors'),
    router = require('./router'),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express"),
    bodyParser = require('body-parser'),
    errorHandling = require('./app/middlewares/errorHandling');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "QH Mock API",
            version: "0.1.0",
            description: "This is a simple API for any frontend to training",
            contact: {
                name: "QH",
                email: "ariteknologi@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./router/*.js"],
};
      
const specs = swaggerJsdoc(options);

const server = async () => {
    const app = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
    app.use('/uploads', express.static('uploads'))
    app.use('/api', router)
    app.use(errorHandling)
    app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));
    app.get('/api/check-health', (_, res) => {
      res.status(200).send('Application Up')
    })
    
    // handle 404
    app.get('*', (_, res) => {
      res.status(404).send('Opps! not found...')
    })
  
    return app
}

module.exports = server