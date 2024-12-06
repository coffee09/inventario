//import Database from "better-sqlite3";
import Modelarticulos from "./model/modelarticulos.js";
import AppDaoBetterSQLite from "./db/DaoBetterSqlite3.js";

const controllerDB=new AppDaoBetterSQLite('app.db')
//const db = new Database('app.db')
const articulo=new Modelarticulos(controllerDB)
/*const query=`CREATE TABLE articulos(
    id INTEGER PRIMARY KEY,
    descripcion STRING NOT NULL,
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL
)    
`*/
//const query0= `DROP TABLE users ;`
const var1=articulo.insert([ ,"pepsi",18, 10])
console.log(var1);

//db.exec(var1)
//db.close()