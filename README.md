# PlaySwap - Sistema di Login

Questo progetto implementa un sistema di login completo per il sito PlaySwap, con funzionalità di autenticazione e gestione delle sessioni.

## Caratteristiche

- Registrazione utenti
- Login e autenticazione
- Gestione delle sessioni
- Dashboard utente protetta
- Interfaccia utente moderna e responsive

## Struttura del Progetto

- `index2.html` - Pagina principale del sito
- `login.html` - Pagina di login e registrazione
- `dashboard.html` - Dashboard utente (accessibile solo dopo il login)
- `server.js` - Server Node.js con Express per gestire l'autenticazione
- `package.json` - Configurazione delle dipendenze

## Requisiti

- Node.js (versione 14 o superiore)
- npm (gestore pacchetti di Node.js)

## Installazione

1. Clona o scarica questo repository
2. Apri un terminale nella cartella del progetto
3. Installa le dipendenze:

```bash
npm install
```

## Avvio del Server

Per avviare il server di sviluppo:

```bash
npm run dev
```

Oppure per avviare il server normale:

```bash
npm start
```

Dopo l'avvio, il server sarà accessibile all'indirizzo: http://localhost:3000

## Utilizzo

1. Accedi alla pagina di login: http://localhost:3000/login
2. Registra un nuovo account o accedi con le credenziali di test:
   - Email: test@example.com
   - Password: password
3. Dopo il login, verrai reindirizzato alla dashboard utente

## Funzionamento del Sistema di Login

Il sistema utilizza:

- **Frontend**: HTML, CSS e JavaScript per l'interfaccia utente
- **Backend**: Node.js con Express per gestire le richieste
- **Autenticazione**: Express-session per la gestione delle sessioni
- **Archiviazione dati**: File JSON locale (in un ambiente di produzione si utilizzerebbe un database)

## Note di Sicurezza

Questo è un sistema dimostrativo e include alcune semplificazioni per scopi didattici:

- Le password non sono crittografate (in produzione si dovrebbe usare bcrypt o simili)
- Non include protezioni avanzate contro attacchi comuni
- Utilizza localStorage per la persistenza lato client (in produzione si preferirebbero i cookie HttpOnly)

Per un ambiente di produzione, si consiglia di implementare misure di sicurezza aggiuntive.