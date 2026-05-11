#  📌Laboration 4 – Autentisering och säkerhet i webbtjänst

## 🧾 Beskrivning

Detta repository innehåller del 1 av Laboration 4 i kursen Backend-baserad webbutveckling.
Uppgiften går ut på att skapa funktionaliet för autentisering med registrering av användarkonton samt inloggning.

I uppgiften används JWT's för sessionshantering för att förhindra obehörig åtkomst till resurser.

---

## 🎯 Syfte

Syftet med uppgiften är att:

- Kunna skapa funktionalitet för autentisering med registrering av användarkonton samt inloggning.
- Kunna använda JWT's för sessionshantering för att förhindra obehörig åtkomst till resurser.
- Kunna skydda känslig data så som lösenord i databasen.

---

## 🛠️ Tekniker

Projektet är byggt med:

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- CORS
- dotenv

---

## 📦 Datamodell

### User

Varje användare lagras som ett dokument i MongoDB och innehåller följande fält:

- _id (ObjectId) – unikt id genererat av MongoDB
- username (string, unikt)
- password (string, hashat med bcrypt)
- createdAt (date)

### Event

Varje event lagras som ett dokument i MongoDB och innehåller följande fält:

- _id (ObjectId)
- title (string)
- date (date)
- endDate (date)
- time (string)
- endTime (string)
- category (string)
- description (string)
- userId (ObjectId, koppling till användare)
- createdAt / updatedAt (automatiskt via Mongoose)

### ToDo

Varje todo lagras som ett dokument i MongoDB och innehåller följande fält:

- _id (ObjectId)
- text (string)
- completed (boolean)
- userId (ObjectId, koppling till användare)
- createdAt / updatedAt (automatiskt via Mongoose)

---

## 🔐 Autentisering

Webbtjänsten använder JWT (JSON Web Token) för autentisering.

Vid lyckad inloggning skapas en token som skickas tillbaka till klienten. Tokenen används sedan för att autentisera användaren vid anrop till skyddade routes.

Skyddade routes kräver en giltig JWT-token skickad via Authorization-headern:

```txt
Authorization: Bearer TOKEN
```

---

## 🔁 Funktionalitet (CRUD)

Webbtjänsten stödjer följande funktionalitet:

### Auth
- Registrera användare
- Logga in användare
- Skapa JWT-token vid inloggning

### Events 
- Hämta användarens events
- Skapa nya events
- Uppdatera events
- Ta bort events

### ToDos
- Hämta användarens todos
- Skapa nya todos
- Uppdatera todos
- Ta bort todos

Alla svar returneras i JSON-format.

---

## 🔗 API-endpoints

### Auth

| Metod  | Endpoint                 | Beskrivning                  |
|--------|--------------------------|------------------------------|
| POST   | /api/auth/register       | Registrera användare         |
| POST   | /api/auth/login          | Logga in användare           |

### Events

| Metod  | Endpoint                 | Beskrivning                  |
|--------|--------------------------|------------------------------|
| GET    | /api/events              | Hämtar användarens events    |
| POST   | /api/events              | Skapar nytt event            |
| PUT    | /api/events/:id          | Uppdaterar event             |
| DELETE | /api/events/:id          | Tar bort event               |

### ToDos

| Metod  | Endpoint                 | Beskrivning                  |
|--------|--------------------------|------------------------------|
| GET    | /api/todos               | Hämtar användarens todos     |
| POST   | /api/todos               | Skapar ny todo               |
| PUT    | /api/todos/:id           | Uppdaterar todo              |
| DELETE | /api/todos/:id           | Tar bort todo                |



### Exempel på request body

#### Registrera användare

```json
{
  "username": "fredrika",
  "password": "test123"
}
```

#### Skapa event

```json
{
  "title": "Picknick på stranden",
  "date": "2026-06-15",
  "endDate": "2026-06-15",
  "time": "13:00",
  "endTime": "16:00",
  "category": "fun",
  "description": "Ta med solstol, solkräm och jordgubbar"
}
```

#### Skapa ToDo

```json
{
  "text": "Köp solkräm"
}
```

---

## ✅ Validering

- Alla obligatoriska fält måste vara ifyllda
- Username måste vara unikt
- Lösenord hash-as innan lagring
- Skyddade routes kräver giltig JWT-token
- Felaktiga requests returnerar tydliga felmeddelanden och statuskoder

---

## 🌍 CORS

Webbtjänsten stödjer Cross-Origin Requests (CORS) för att kunna användas från externa klienter.

---

## 📁 Installation (lokalt)

1. Klona repositoryt

```bash
git clone https://github.com/fredrikastjernlof/Lab4_Summer_Planner_Backend.git
```

2. Installera dependencies

```bash
npm install
```

3. Skapa en `.env`-fil:

```env
PORT=3000
MONGODB_URI=din_connection_string
JWT_SECRET=din_hemliga_nyckel
```

4. Starta utvecklingsservern

```bash
npm run dev
```

eller:

```bash
npm start
```

---

## 🌐 Publicering

Webbtjänsten är publicerad via Render och använder MongoDB Atlas som databas.

[Öppna webbtjänst](https://lab4-SummerPlansAPI.onrender.com)

---

## ✅🙌 Det här tar jag med mig från uppgiften

I denna laboration har jag arbetat med autentisering och säkerhet i en webbtjänst genom att bygga ett eget login-system med JWT och bcrypt.

Det som tog längst tid för mig att förstå var egentligen själva flödet kring tokens, middleware och skyddade routes. I början kändes det ganska rörigt att förstå hur allt hängde ihop, hur tokenen skickas med i requests och hur man faktiskt testar skyddade endpoints på rätt sätt. Men när bitarna väl började falla på plats blev det mycket tydligare hur hela kedjan fungerar.

Jag tycker också att det varit lärorikt att fundera över projektstrukturen och hur man delar upp koden på ett bra sätt. Jag valde att arbeta med separata routes, controllers och modeller för att hålla projektet mer organiserat och lättare att förstå. Det tog lite extra tid i början, men jag tycker att det gjorde stor skillnad när projektet växte och fler routes och funktioner lades till.

Överlag känns det som att jag fått en mycket bättre förståelse för hur autentisering fungerar i praktiken och hur man kan skydda användarspecifik data i en backend-applikation.