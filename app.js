import express from 'express';
import cors from 'cors';
import AppDaoBetterSQLite from './db/DaoBetterSqlite3.js';
import Modelarticulos from "./model/modelarticulos.js";

const controllerDB=new AppDaoBetterSQLite('app.db')
const articulo=new Modelarticulos(controllerDB)

//usar Dao
//import ModelUsers from "./model.users.js";
const app=express()
//const mc=new ModelUsers(controllerDB)

// const resp=mc.insert(["jose luis cuevas","jcuevas"])
// const resp=mc.getAll()
//const resp= mc.get(3)


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.json());
app.use(cors());
//Establecemos los prámetros de conexión

app.get('/', function(req,res){
    res.send('INICIO');
});



//Mostrar todos los artículos
app.get('/api/articulos/:id', async(req, res) => {
    const var2 = await articulo.get(req.params.id, (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
    console.log(var2)
});

app.get('/api/articulos', async (req, res) => {
    try {
        const filas = await articulo.getAll(); // Llamada sin necesidad de parámetros adicionales
        res.send(filas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los artículos');
    }
});



app.post('/api/articulos', async (req, res) => {
    const data = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
    };

    try {
        // Usando insert con un array de parámetros
        const result = await articulo.insert([,data.descripcion, data.precio, data.stock]);
        res.send(result); // Enviar la respuesta al cliente
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).send({ message: 'Error al insertar el artículo.' });
    }
});

app.put('/api/articulos/:id', async (req, res) => {
    const data = {
        id: req.params.id, // Obtiene el ID de la URL (params)
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
    };

    try {
        // Asegúrate de pasar un objeto, no un array
        const result = await articulo.update(data); // Pasamos el objeto 'data'
        res.send(result); // Enviar la respuesta al cliente
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).send({ message: 'Error al actualizar el artículo.' });
    }
});


app.delete('/api/articulos/:id', (req, res) => {
    const var2 =  articulo.delete(req.params.id, (error, resultados) => {
        if (error) {
            throw error;
        } else {
            res.send(resultados);
        }
    });
    console.log(var2)
});


const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function(){
    console.log("Servidor Ok en puerto:"+puerto);
});