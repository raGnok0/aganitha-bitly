Here is a **clean, polished, production-quality README.md** for your project.\
` `It clearly explains your app, setup, architecture, features, database workflow, deployment, and API usage — perfect for GitHub + assignment submission.

-----
# <a name="_73kjkalqouml"></a>**📘 Aganitha URL Shortener — Next.js + Prisma + Neon + Vercel**
A modern, full-stack URL Shortener built using:

- **Next.js App Router**\

- **Prisma ORM**\

- **PostgreSQL (Neon Serverless)**\

- **Tailwind CSS**\

- **Vercel Deployment**\


This project supports **auto-generated short codes**, **custom short codes**, **analytics**, and **a dashboard** to manage all shortened links.

-----
## <a name="_ge7vaprz3h58"></a>**🚀 Features**
### <a name="_5fu4bf2v0eng"></a>**✅ URL Shortening**
- Auto short-code creation
- Custom short-code support
- Duplicate code validation
- Unique short ID generator
### <a name="_104wbowd8hvo"></a>**📊 Dashboard**
- List all shortened links
- Show:
  - Short code
  - Target URL
  - Total click count
  - Last clicked timestamp
- Delete link
- Search / filter (optional)
### <a name="_z524i6vnlm9r"></a>**📈 Stats Page (/stats/[code])**
Shows detailed stats for a specific short link:

- Total clicks
- Redirect destination
- Created time
- Last clicked time
### <a name="_lbf7qgvyeqwn"></a>**🔄 Redirect API**
/api/[shortId]

- Redirects to actual target URL
- Tracks clicks
- Updates last clicked time
### <a name="_yupsz6ysonp9"></a>**🩺 Health Check Page**
/health\
` `Shows:

- API working status
- Server time
- Uptime
### <a name="_asol0j2mxgx1"></a>**🗄 Database**
- Prisma ORM
- Neon PostgreSQL
- Clean migration flow
- Works locally using SQLite (development)
- Production uses Postgres
-----
## <a name="_38pgekj3uxjt"></a>**🛠 Tech Stack**

|**Layer**|**Technology**|
| :-: | :-: |
|Frontend|Next.js 15 + App Router|
|UI|Tailwind CSS|
|Backend|Next.js API Route Handlers|
|Database ORM|Prisma|
|Database|Neon PostgreSQL|
|Hosting|Vercel|
|Dev DB|SQLite|

-----
# <a name="_6t9t2kfxojyi"></a>**📂 Project Structure**
root

│── prisma/

│   ├── schema.prisma      # Prisma schema (Postgres)

│   └── migrations/        # Migration SQL files

│

│── src/

│   ├── app/

│   │   ├── page.tsx       # Homepage

│   │   ├── dashboard/     # Main dashboard

│   │   ├── stats/[code]/  # Stats page

│   │   ├── api/

│   │   │   ├── shorten/   # POST /api/shorten

│   │   │   └── [shortId]/ # GET /api/[shortId]

│   │   └── health/        # System status

│   │

│   ├── components/        # UI components

│   └── lib/

│       ├── db.ts          # Prisma client

│       └── shortIdGenerator.ts

│

│── .env                   # Secrets (ignored)

│── .gitignore

│── package.json

-----
# <a name="_jrsmbyi1u4sd"></a>**⚙️ Local Development Setup**
### <a name="_4151w2xdb1ke"></a>**1️⃣ Install dependencies**
npm install

or

pnpm install

-----
## <a name="_1z0rvk5jc270"></a>**2️⃣ Local DB (SQLite) for development**
In prisma/schema.prisma:

datasource db {

`  `provider = "sqlite"

`  `url      = "file:./dev.db"

}

Create your local DB:

npx prisma migrate dev --name init

Open Prisma Studio:

npx prisma studio

-----
# <a name="_77yvhapp17cc"></a>**🟦 Switch to Production DB (Neon PostgreSQL)**
### <a name="_h5f9kl7zwkzf"></a>**1️⃣ Replace datasource with Postgres**
datasource db {

`  `provider = "postgresql"

`  `url      = env("DATABASE\_URL")

}

### <a name="_jh5b7xhff0ne"></a>**2️⃣ Add Neon connection string to .env**
DATABASE\_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"

### <a name="_ybfv0l9nn7yn"></a>**3️⃣ Reset migration history when switching from SQLite**
rm -rf prisma/migrations

rm prisma/migration\_lock.toml

### <a name="_79eg5hzhjz9s"></a>**4️⃣ Create fresh migration for Postgres**
npx prisma migrate dev --name init

-----
# <a name="_p0ysakvn47sf"></a>**🟩 Deploying to Vercel**
### <a name="_lahrey24ua44"></a>**1️⃣ Push code to GitHub**
### <a name="_u2idfxx1fyt5"></a>**2️⃣ Go to Vercel → Import GitHub repo**
### <a name="_5xm4qu8g58vd"></a>**3️⃣ Add environment variable:**
DATABASE\_URL=<your Neon PG connection string>

### <a name="_z8rqcrqqd4ub"></a>**4️⃣ Deploy**
-----
# <a name="_829u4ncz412g"></a>**⚡ API Endpoints**
## <a name="_pwjyfyg4hhec"></a>**🔹 POST /api/shorten**
Create a short link.

**Request:**

{

`  `"url": "https://google.com",

`  `"customCode": "google123"  // optional

}

**Response:**

{

`  `"link": {

`    `"id": 1,

`    `"code": "google123",

`    `"url": "https://google.com"

`  `}

}

-----
## <a name="_8j7kfkvydgfk"></a>**🔹 GET /api/stats**
Returns list of all short links.

-----
## <a name="_ks0dcd6s46il"></a>**🔹 GET /api/[shortId]**
Redirects to target URL & increments click counter.

-----
# <a name="_d2s10zexjzn"></a>**🧹 .gitignore (Important)**
node\_modules/

.next/

.env

.env.\*

.vercel/

prisma/dev.db

prisma/dev.db-journal

prisma/migrations/migration\_lock.toml

-----
# <a name="_o5vukw2vxcl7"></a>**📈 Future Improvements**
- Add charts to stats page
- Add QR code generation
- Add pagination to dashboard
- Add rate limiting
- Add authentication (Clerk/Supabase Auth)
- Implement analytics over time
- Add expiration dates for short links
-----
# <a name="_xan4sav7l3rx"></a>**🧑‍🏫 Author**
**Sudeep Barua**

- Full-stack Developer
- Experience with React, Next.js, Python, Prisma
- Passionate about building production-ready systems
-----
# <a name="_w3o81lq9ydj4"></a>**🎉 Done!**
Your README is now clean, professional, and submission-ready.

If you want:\
` `📌 Add screenshots\
` `📌 Add deployment link\
` `📌 Add badges (Vercel, Neon, GitHub stars)

…just tell me and I’ll generate those too.

