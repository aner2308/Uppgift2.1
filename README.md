# Uppgift 2.1 i kursen DT207G, Back-end.
*Anton Eriksson, aner2308*

Denna README-fil dokumenterar funktionaliteten för min webbapplikation, en enkel webbtjänst för hantering av jobberfarenheter.

### Beskrivning
Min Webbapplikation tillhandahåller ett API för att hantera jobberfarenheter. Användare kan utföra CRUD-åtgärder (skapa, läsa, uppdatera, radera) på jobberfarenhetsposter via detta API.

### Installation
1. Klona detta repo till din lokala maskin.
2. Installera alla dependencies genom att köra npm install.
3. Konfigurera miljövariabler genom att skapa en .env-fil och fylla i nödvändig information enligt .env.sample.
4. Kör install.js filen för att skapa en tabell i din postgreSQL databas.

### Användning
### URI:er för CRUD
- **GET /api/workexperience:** Hämta alla jobberfarenheter.
- **POST /api/workexperience:** Skapa en ny jobberfarenhet. *Kräver JSON-data med fält som companyname, jobtitle, location, startdate, enddate, description. Se exempel:*
```
  {
  "companyname": "1337forU",
  "jobtitle": "Software Engineer",
  "location": "Sundsvall",
  "startdate": "2022-01-01",
  "enddate": "2023-12-31",
  "description": "Arbetade med utveckling av webbapplikationer och mjukvaruprodukter."
}
```
- **DELETE /api/workexperience/:id:** Radera en jobberfarenhet med den angivna id:en.
- **PUT /api/workexperience/:id:** Uppdatera en befintlig jobberfarenhet med den angivna id:en. (Ännu inte implementerad)
Exempel på användning av API:et kan hittas i index.html-filen i detta repo.

### Dependencies:
- Express.js
- cors
- dotenv
- PostgreSQL
