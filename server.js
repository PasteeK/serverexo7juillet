const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/BddDeFou', {}).then(() => {
  console.log('Connecté à Mongol DB');
}).catch((err) => {
  console.error('Erreur de connexion: ', err);
});

app.use('/api', userRoutes);
app.use('/api', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'execution sur le port ${PORT}`);
});
