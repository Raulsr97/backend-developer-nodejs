const express = require('express')
const productos = [
    {
        id: 1,
        nombre: 'iphone 14 pro max',
        precio: 30000
    },
    {   id: 2,
        nombre: 'samsung s24 fe',
        precio: 10000
    }

]

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor listo')
})

app.get('/productos', (req, res) => {
    res.send(productos)
})

app.get('/productos/:id', (req, res) => {
    const idProducto = Number(req.params.id)
    const productoEncontrado = productos.find(producto => producto.id === idProducto)

    if (!productoEncontrado) {
        return res.status(404).send('El producto solicitado no existe')
    }
    res.send(productoEncontrado)
})

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body
    
    if (!nuevoProducto.nombre) {
        return res.status(400).send('El nombre del producto es obligatorio')
    }
      
    if (!nuevoProducto.precio) {
        return res.status(400).send('El precio del producto es obligatorio')
    }
    
    productos.push(nuevoProducto)
        
    res.send(nuevoProducto)
    
})

app.put('/productos/:id', (req, res) => {
    const idProducto = Number(req.params.id)
    const productoEncontrado = productos.find(producto => producto.id === idProducto)

    if(!productoEncontrado) {
        return res.status(404).send('Producto no encontrado')
    }
    
    const datosActualizados = req.body
    productoEncontrado.nombre = datosActualizados.nombre
    productoEncontrado.precio = datosActualizados.precio
    res.send(productoEncontrado)
})

app.delete('/productos/:id', (req, res) => {
    const idProducto = Number(req.params.id)
    const indexProducto = productos.findIndex(producto => producto.id === idProducto)

    if (indexProducto === -1) {
        return res.status(404).send('Producto no encontrado')
    }

    productos.splice(indexProducto, 1)
    res.send('Producto eliminado')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);    
})