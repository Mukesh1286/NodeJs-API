const app = require('./app')
const connectDatabase = require('./config/database')


const dotenv = require('dotenv');

//Handle Uncaught exceptions
process.on('UncaughtException', err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to Uncaught exceptions');
    
        process.exit(1)
   
})

//Setting up config file
dotenv.config({path: 'backend/config/config.env'})



// Connecting to database
connectDatabase();



const server=app.listen(process.env.PORT, ()=>{
    console.log(`Server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handle Unhandle Promise rejection
process.on('unhandledRejection', err =>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promice rejection');
    server.close(()=>{
        process.exit(1)
    })
})