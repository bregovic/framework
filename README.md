# Moderní Webový Framework

Tento projekt slouží jako univerzální základ pro nové webové aplikace. Je postaven na nejmodernějších technologiích a připraven pro snadné nasazení na Railway.

## 🚀 Technologie
- **Next.js 15+** (App Router)
- **TypeScript**
- **Prisma** (PostgreSQL)
- **NextAuth.js** (Autentizace)
- **Vanilla CSS** (Moderní design systém s proměnnými)
- **Lucide React** (Ikony)

## 🛠️ Funkce
- **Administrační sekce**: Správa parametrů (Obecné/Technické) chráněná admin heslem.
- **Uživatelský profil**: Nahrávání fotek, správa údajů, notifikace, změna hesla.
- **Moderní Design**: Mobile-first, čistý vzhled, plynulé animace.
- **Technická konfigurace**: Předpřipravené sloty pro Mailserver, Cloud Storage, Git a ChatGPT API.

## 🏃 Jak začít
1. **Instalace závislostí**:
   ```bash
   npm install
   ```

2. **Konfigurace prostředí**:
   Zkopírujte `.env.example` do `.env` a vyplňte potřebné údaje (zejména `DATABASE_URL`).

3. **Databáze**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Spuštění**:
   ```bash
   npm run dev
   ```

## ☁️ Nasazení na Railway
Při nasazování na Railway můžete využít připravenou šablonu v souboru `railway-variables.txt`.

1. Otevřete soubor `railway-variables.txt`.
2. Doplňte hodnoty.
3. V Railway jděte do **Variables** -> **Bulk Import** a vložte obsah souboru.

### Klíčové proměnné:
- `DATABASE_URL`: URL vaší PostgreSQL databáze.
- `NEXTAUTH_URL`: Automaticky se nastaví na vaši Railway doménu.
- `NEXTAUTH_SECRET`: Náhodný řetězec (např. vygenerovaný přes `openssl rand -base64 32`).
- `ADMIN_EMAIL` & `ADMIN_PASSWORD`: Přihlašovací údaje pro prvního admina.

Pro automatickou inicializaci databáze při nasazení můžete v Railway nastavit **Start Command**:
`npm run db:deploy && npm start`

## 🔐 Přihlašovací údaje (Default)
Pokud nenastavíte proměnné prostředí, výchozí údaje jsou:
- **Email**: `admin@framework.cz`
- **Heslo**: `admin123`

## 📁 Struktura
- `src/app/admin`: Administrační rozhraní.
- `src/app/profile`: Uživatelský profil.
- `src/app/api`: API endpointy (Auth, Profile update).
- `src/components`: Znovupoužitelné UI komponenty.
- `prisma/`: Schéma databáze a seed skripty.
