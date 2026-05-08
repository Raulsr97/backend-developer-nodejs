const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Servidor listo')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);    
})