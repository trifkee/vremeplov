require('../models/database')
const party = require('../models/zurke')
const user = require('../models/users')
const bcrypt = require('bcrypt')
const { render } = require('ejs')



// HOMEPAGE GET
exports.homepage = async(req,res) =>{
    // LOGIKA RUTE
    res.render('index', {title:'vremeplov'})
}

// ZURKE GET
exports.zurke = async(req,res) =>{
    //LOGIKA RUTE
    try {
        // let zurke = req.params.name
        const zurka =  await party.find({}).sort({date:-1})
        res.render('zurke', {title:'žurke', zurka})
    } catch (error) {
        res.status(500).send( {message:error.message || "Nastala je greska!"})
    }
}

// ZURKA GET
exports.zurka = async(req,res) =>{
    // LOGIKA
    try {
        let zurkaId = req.params.id
        const zurka = await party.findById(zurkaId)
        
        res.render('zurka', {title:zurka.name, zurka})
    } catch (error) {
        res.status(500).send( {message:error.message || "Nastala je greska!"})
    }
}

// O NAMA
exports.onama = async(req, res)=>{
    let userId = req.params.id
    const User = await user.find()
    res.render('onama', {title:'o nama', User})
}

// dodaj zurku
exports.dodajzurku = async(req, res)=>{
    const User = req.params.id
    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')
    res.render('dodajZurku', {title:'nova zurka', infoErrorsObj, infoSubmitObj, User})
}
// dodaj zurku submit
exports.dodajzurkuSubmit = async(req, res) =>{
    try {
        const User = req.params.id
        let imageUploadFile
        let uploadPath
        let newImageName

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('Slika nije uplodovana!')
        }else{
          
            imageUploadFile = req.files.imageFirst
            newImageName = imageUploadFile.name

            uploadPath = require('path').resolve('./')+'/public/img/' + newImageName //Putanja gde se cuvaju slike, vazno zbog CSSa
            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err)
            })

        }

        const novaZurka = new party({
            name: req.body.name,
            date: req.body.date,
            location: req.body.location,
            description: req.body.description,
            firstdj: req.body.firstdj,
            seconddj: req.body.seconddj,
            price: req.body.price,
            NoOfCards: req.body.NoOfCards,
            imageFirst: newImageName,
            imageSecond: newImageName,
            imageThird: newImageName,
            imageFourth: newImageName,
        })

        await novaZurka.save()

        req.flash('infoSubmit', 'Zurka je dodata u bazu.')
        res.redirect('/')
    } catch (error) {
        req.flash('infoErrors', error)
        res.redirect('/zurke')
    }
}
// REGISTER
exports.register = async(req, res) =>{
    const User = req.params.id
    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')
    res.render('register', {title:'novi korisnik', infoErrorsObj, infoSubmitObj, User})

}
// REGISTER SUBMIT
exports.registerSubmit = async(req, res) =>{
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const noviKorisnik = new user({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role:req.body.role,
            cardsTotal:0,
            cardsLeft:0,
            cardsSold:0,
        })

        await noviKorisnik.save()

        req.flash('infoSubmit', 'Uspesno si kreirao nalog.')
        res.redirect('/login')
    } catch (error) {
        req.flash('infoErrors', 'Greska pri kreiranju naloga', + error)
        res.redirect('/')
    }
}

// LOGIN
exports.login = async(req, res)=>{
   try {
    const users = await user.find({})
    const User = req.params.id
    // const users = await user.find({})
    // const usersId = req.params.id
    // const User =  await user.findOne({username:req.body.username})
    res.render('login', {title:'login', users, User})
   } catch (error) {
    res.status(500).send({message:error.message})
   }
}

// LOGIN SUBMIT
exports.loginSubmit = async(req, res) =>{
    try {

    const users = await user.find({})
    const User =  await user.findOne({username:req.body.username})
    
    const cmp = await bcrypt.compare(req.body.password, User.password);
  
    if(!cmp){
        console.log("Greska");
        res.redirect('/login')
    } else{
        const zurke = await party.find({})
        const korisnici = await user.find({}) 
        res.render('dashboard', {title: ('dashboard - ') + User.username,users, User, korisnici, zurke})
    }
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

exports.karte = async(req,res)=>{
    try{
        const userId = req.query.id
        const User = await user.findById({_id:userId})

        if(User){
            res.render('karte', {korisnik:User})
        }else{
            res.redirect('/')
        }
    }catch{
        res.send('greska')
    }
}
exports.karteSubmit = async(req,res)=>{
    try{
        let korisnik = await user.findById(req.body.user_id)
        let karte = parseInt(req.body.prodateKarte)
        let ukupno = parseInt(korisnik.cardsSold + karte)
        console.log(ukupno)
        const User = await user.findByIdAndUpdate({_id:req.body.user_id}, {$set:{cardsSold:ukupno}})

        res.redirect('/')
    }catch(error){
        res.send(error)
    }
}


exports.obrisi = async(req, res ) =>{
    try{
        const User = await user.findByIdAndDelete({_id:req.body.user_id})
        res.redirect('/')
    }catch{
        res.status(500).send( {message:error.message || "Nastala je greska!"})
    }
}

// // IZMENI
// exports.izmeni = async(req, res) =>{
//     const userId = req.query.id
//     const User = await user.findById({_id:userId})

//     const infoErrorsObj = req.flash('infoErrors')
//     const infoSubmitObj = req.flash('infoSubmit')
//     res.render('izmeni', {title:'Izmeni', infoErrorsObj, infoSubmitObj, User, UserId,korisnik:User})

// }
// // IZMENI SUBMIT
// exports.izmeniSubmit = async(req, res) =>{
//     try {
//         let korisnik = await user.findById(req.body.user_id)
//         // const User = await user.findById({_id:userId})
//         const passwordNew = req.body.passwordNew
//         const User = await user.findByIdAndUpdate({_id:req.body.user_id}, {$set:{password:passwordNew}})

        
//     } catch (error) {
//         req.flash('infoErrors', 'Greska pri kreiranju naloga', + error)
//         res.redirect('/')
//     }
// }
//exports.logged = async(req, res)=>{
//     //DODAJ KOD ZA LOGIN
//     try {
//        res.send("ALO")

//        if(userData){

//        }else
//         user.findOneAndUpdate({_id: User}, {$set:{cardsSold:prodato}}, {new:true}), (err, docs) =>{
//             if(err){
//                 console.log('greska')
//             }else{
//                 res.render('dashboard1', {title: ('dashboard - ') + User.username, User, korisnici})
//             }
//         }
//     } catch (error) {
//         res.status(500).send( {message:error.message || "Nastala je greska!"})
//     }
// }

// exports.loggedSubmit = async(req, res) =>{
//     try {
        
//         let prodato = req.params.cardsSold + req.body.cardsSold

//         user.findOneAndUpdate(req.params.user_id, {set$:{cardsSold:prodato}}, (err, docs) =>{
//             if(err){
//                 console.log("greska");
//             }
//             else{
//                 res.redirect('/')
//             }
//         })
//     }
//     catch (error) {
//         res.status(404).send({error:"Greska"})
//     }
// }

// exports.cardsSold = async (req, res)=> {
//     try {
//         let User = req.params.id
//         let cardsTotal = req.params.cardsTotal
//         let cardsSold = req.params.cardsSold
//         let cardsSoldHTML = req.body.cardsSold
//         let prodateKarte = cardsSoldHTML + cardsSold

//         db.user.findOneAndUpdate({_id:User}, {$set:{cardsSold:prodateKarte}})
//         res.redirect('/login/:id')
//     } catch (error) {
//         res.send('Greska')
//     }
// }