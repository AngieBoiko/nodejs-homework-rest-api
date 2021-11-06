const mongoose=require('mangoose')
const app = require('../app')

const {PORT=3000,DB_HOST}=process.env


mongoose.connect(DB_HOST).then(()=>app.listen(PORT)
).then(()=>console.log( "Database connection successful")).catch(error)

