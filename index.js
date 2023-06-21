const express = require('express');
const myswl2 = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json())

const nuevoSchema = mongoose.Schema({
   
});

const modelo = mongoose.model('Producto', nuevoSchema); // Definir el modelo

function createConnection() {
    const connection = myswl2.createConnection({
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'docker',
      database: process.env.DATABASE_NAME || 'Segundo_parcial',
    });
    return connection;
  }



app.get('/check-mongodb-connection', (req, res) => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    res.send('Conexión exitosa a mongodb');
    // Resto del código de tu servidor
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
});

app.get('/check-mysql-connection',  (_req, res) => {
   
  
    const connection = createConnection();
  
    connection.connect((err, result) => { // Utiliza "connection" en lugar de "conn"
      if (err) {
        return res.status(500).json({
          message: 'Error al traer datos'
        });
      }
      res.send('Conectado a la base de datos');
    });
  });
  

app.listen(4000);
console.log('Servidor corriendo en el puerto', 4000);
