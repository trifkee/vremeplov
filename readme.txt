Vremeplov web app - beta v1

Aplikacija je i dalje u razvoju, neke funkcije ne rade. Aplikacija prikazuje sve žurke koje su realizovane ili su u planu. Takodje, članovi tima "vremeplov" imaju mogućnost pristupa dashboard-u gde mogu da "prodaju" karte i olakšano prate stanje.

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
