const {Pool, Client} = require('pg')
const PORT = process.env.PORT || 5432;

//connection pool TBC

const pool = process.env.PORT ? 
//production listener
new Pool ({
    connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
    ssl: {
      rejectUnauthorized: false // don't check for SSL cert
    }
}) :
//dev listener
new Pool ({
    user:'nshryock',
    host: 'localhost',
    database: 'memorizer',
    password: 'rock10den',
    port: PORT,
    connectionTimeoutMillis : 5000,
    idleTimeoutMillis : 30000
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}