class Modelarticulos{
    constructor(controller){
        this.dbController=controller
    }
    /**
     *
     * @param {*} id entero que representa el id
     * @returns
     */
    get(id){
        const sql=`select * from articulos where id=?;`
        this.dbController.open()
        const data = this.dbController.get(sql,[id])
        this.dbController.close()
        return data
    }
    /**
     * Devuelve la lista de todos los usuarios
     * @returns objeto con la lista de datos
     */
    getAll(){
        const sql=`select * from articulos;`
        this.dbController.open()
        const data = this.dbController.all(sql,[])
        this.dbController.close()
        return data
    }
    /**
     * Inserta un registro en users
     * @param {*} datos arreglo de parametros [name,username]
     * @returns
     */
 
 
    insert(datos){
        const sql='insert into articulos(id, descripcion, precio, stock) values(?, ?, ?, ?)'
        this.dbController.open()
        const data = this.dbController.run(sql,datos)
        this.dbController.close()
        return data
    }

    update(datos) {
        // Asegúrate de que 'id' es parte de 'datos' para poder hacer el UPDATE correctamente
        const sql = 'UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?';
        this.dbController.open();
        // El orden de los valores debe coincidir con el orden en el SQL
        const result = this.dbController.run(sql, [datos.descripcion, datos.precio, datos.stock, datos.id]);
        this.dbController.close();
        return result;
    }
    
 
 
    delete(id){
        const sql=`DELETE FROM articulos WHERE id = ?;`
        this.dbController.open()
        const data = this.dbController.run(sql,[id])
        this.dbController.close()
        return data
    }
    //agregue el método put para actualizar todos los campos de un registro
    //agregue patch para actualizar un campo específico
    //agregue delete para borrar un registro
}
export default Modelarticulos