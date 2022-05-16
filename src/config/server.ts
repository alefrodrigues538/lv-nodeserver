const app = require('../app')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const port = 3000;

app.listen(3000,()=>{
    console.log('SERVER IS RUNNING ON PORT=',port)
});