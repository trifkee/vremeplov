const express = require('express')
const router = express.Router()
const vremeplovController = require('../controllers/vremeplovController')

// RUTE APLIKACIJA

router.get('/', vremeplovController.homepage)
router.get('/zurke', vremeplovController.zurke)
router.get('/zurke/:id', vremeplovController.zurka) //DODAJ /:ID
router.get('/onama', vremeplovController.onama)
// DODAVANJE ZURKA
router.get('/login/:id/dodajzurku', vremeplovController.dodajzurku)
router.post('/dodajzurku', vremeplovController.dodajzurkuSubmit)
// REGISTER-----------------
router.get('/login/:id/register', vremeplovController.register)
router.post('/register', vremeplovController.registerSubmit)
// REGISTER TEST
router.get('/register', vremeplovController.register)
router.post('/register', vremeplovController.registerSubmit)
// LOGIN----------------------
router.get('/login', vremeplovController.login)
router.post('/login', vremeplovController.loginSubmit)
// KARTE
router.get('/karte', vremeplovController.karte)
router.post('/karte', vremeplovController.karteSubmit)
// OBRISI
router.post('/obrisi/:id', vremeplovController.obrisi)
// router.get('/izmeni/:id', vremeplovController.izmeni)


// EXPORT APLIKACIJE
module.exports = router;