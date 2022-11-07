const { authenticate } = require('passport')
const localStrategy = require('passport-local')
const bcrypt = require('bcrypt')

async function initialize(passport, getUserByEmail){
    const  authenticateUser = (email, password, done) =>{
        const user = getUserByEmail(email)

        if(user == null){
            return done(null, false, {message:'Korisnik ne postoji'})
        } 

        try {

            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            
            else{
                return done(null, false, {message: 'Podaci se ne podudaraju'})
            }
            
        } catch (error) {
            return done(error)
        }
    }

    passport.use(new localStrategy({ usernameField:'email'}), authenticateUser)
    passport.serializeUser((user, done) =>{ })
    passport.deserializeUser((id, done) =>{ })
}

module.exports = initialize