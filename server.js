const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurazione della sessione
app.use(session({
    secret: 'playswap-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // In produzione impostare su true se si usa HTTPS
}));

// Servire file statici
app.use(express.static(path.join(__dirname)));

// Database simulato (in un'app reale si userebbe un vero database)
let usersDB = [];

// Carica utenti esistenti se il file esiste
const usersFilePath = path.join(__dirname, 'users.json');
if (fs.existsSync(usersFilePath)) {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        usersDB = JSON.parse(data);
    } catch (err) {
        console.error('Errore nel caricamento degli utenti:', err);
    }
}

// Salva gli utenti nel file
const saveUsers = () => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(usersDB), 'utf8');
    } catch (err) {
        console.error('Errore nel salvataggio degli utenti:', err);
    }
};

// Middleware per verificare l'autenticazione
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Non autorizzato' });
    }
};

// Rotte API

// Registrazione
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Validazione base
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Tutti i campi sono obbligatori' });
    }
    
    // Verifica se l'email è già registrata
    if (usersDB.some(user => user.email === email)) {
        return res.status(400).json({ success: false, message: 'Email già registrata' });
    }
    
    // Crea nuovo utente (in un'app reale si cripterebbe la password)
    const newUser = { id: Date.now().toString(), name, email, password };
    usersDB.push(newUser);
    saveUsers();
    
    res.status(201).json({ success: true, message: 'Registrazione completata con successo' });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Validazione base
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email e password sono obbligatori' });
    }
    
    // Trova l'utente
    const user = usersDB.find(user => user.email === email && user.password === password);
    
    if (!user) {
        return res.status(401).json({ success: false, message: 'Email o password non validi' });
    }
    
    // Crea sessione (rimuovi la password per sicurezza)
    const { password: _, ...userWithoutPassword } = user;
    req.session.user = userWithoutPassword;
    
    res.json({ success: true, user: userWithoutPassword });
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Errore durante il logout' });
        }
        res.json({ success: true, message: 'Logout effettuato con successo' });
    });
});

// Ottieni profilo utente
app.get('/api/profile', requireAuth, (req, res) => {
    res.json({ success: true, user: req.session.user });
});

// Rotte per le pagine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index2.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'dashboard.html'));
    } else {
        res.redirect('/login');
    }
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
    console.log(`- Accedi alla pagina di login: http://localhost:${PORT}/login`);
    console.log(`- Accedi alla dashboard: http://localhost:${PORT}/dashboard`);
});