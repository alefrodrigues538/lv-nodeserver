const app = require('../app')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('SERVER IS RUNNING ON PORT=', port)
});