const app = require('../app');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch((err: any) => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;

app.listen(port, (err: any) => {
  if (err) {
    if (err.code === 'EADDRINUSE') {
      console.error(`Porta ${port} já está em uso. Tente outra porta.`);
    } else {
      console.error(err);
    }
    process.exit(1);
  } else {
    console.log('SERVER IS RUNNING ON PORT=', port);
  }
});