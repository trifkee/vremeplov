Vremeplov web app - beta v1

aplikacija je idalje u razvoju, neke funkcije ne rade. aplikacija prikazuje sve zurke koje su realizovane ili su u planu. Takodje, clanovi tima "vremeplov" imaju mogucnost pristupa dashboardu gde mogu da "prodaju" karte i olaksano prate stanje.

Instalacija:
- npm install

Startovanje aplikacija:
- npm start

Test korisnici:
-admin:admin 
-promoter:promoter

Realizovane rute aplikacije:
- router.get('/', vremeplovController.homepage)
- router.get('/zurke', vremeplovController.zurke)
- router.get('/zurke/:id', vremeplovController.zurka)
- router.get('/onama', vremeplovController.onama)
- router.get('/login/:id/dodajzurku', vremeplovController.dodajzurku)
- router.post('/dodajzurku', vremeplovController.dodajzurkuSubmit)
- router.get('/login/:id/register', vremeplovController.register)
- router.post('/register', vremeplovController.registerSubmit)
- router.get('/login', vremeplovController.login)
- router.post('/login', vremeplovController.loginSubmit)
- router.get('/karte', vremeplovController.karte)
- router.post('/karte', vremeplovController.karteSubmit)
- router.post('/obrisi/:id', vremeplovController.obrisi)

// REGISTER TEST
- router.get('/register', vremeplovController.register)
- router.post('/register', vremeplovController.registerSubmit)
