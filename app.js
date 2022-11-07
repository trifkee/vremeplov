const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')
const morgan = require('morgan')
const helmet = require('helmet')

// const initializePassport = require('./passport-config')
// initializePassport(
//     passport,
//     email =>{
//     user.find(user => user.email === email)
// })

const app = express();
const port = process.env.PORT || 3000

require('dotenv').config()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(expressLayouts)

app.use(cookieParser('Secure'))
app.use(session({
    secret:'Secure',
    saveUninitialized:false,
    resave:true,
}))
// app.use(passport.initialize())
// app.use(passport.session())
app.use(flash())
app.use(fileUpload())

app.use(express.json())
// app.use(helmet())
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }))
app.use(morgan("common"))

app.set('layout', './layouts/main') 
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

const routes = require('./server/routes/vremeplovRoutes.js');
// const passport = require('passport');
app.use('/', routes)

app.listen(port, () => console.log(`server na portu ${port}`))