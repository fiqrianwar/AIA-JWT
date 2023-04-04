require('dotenv').config()
const server = require('./server'),
    PORT = process.env.PORT || 3000

async function startServer () {
    const app = await server()
    app.listen(PORT, async () => console.log(`Server ready at localhost:${PORT}/api`))
}
  
startServer()