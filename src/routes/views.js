const { Router } = require('express')

const router = Router()

router.get('/', (_, res) => {
    const data = {
        firstName: 'Lucas',
        lastName: 'Pereyra',
        title: 'Mi pagina', // este placeholder está en layouts/main
        scripts: ['product.js'],
        styles: ['product.css'],
        useWS: true
    }
    
    res.render('index', data)
})




module.exports = router