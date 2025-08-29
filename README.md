# Hotel Guest Management

A mini full-stack project using React + TypeScript + Tailwind (Vite) and PocketBase.

## Tech Stack
- React 18 + TypeScript (Vite)
- Tailwind CSS
- PocketBase (SQLite embedded) with JS SDK
- React Router, TanStack Query

## Prerequisites
- Node.js 18+
- Git
- PocketBase binary (download from https://pocketbase.io/)

## 🚀 Quick Demo / Test Setup

If you just want to test the system quickly without creating collections manually:

1. **Backend**
   ```bash
   cd server
   ./pocketbase serve

- Open the PocketBase Admin UI: http://127.0.0.1:8090/_/
- Login with the provided demo admin credentials:
- Email: pocketsample@gmail.com
- Password: ps@12345  (or pocketSample@1234)
- A preconfigured `guests` collection and sample records are already included.

**Frontend**
```bash
cd client
cp .env.example .env  # or create .env with VITE_PB_URL=http://127.0.0.1:8090
npm install
npm run dev
```
- Open http://localhost:5173 .

   
## Setup

### 1) Backend
- Put the PocketBase binary under `server/` and run `./pocketbase serve`.
- Admin UI: http://127.0.0.1:8090/_/
- Create `guests` collection with fields: first_name (text, req), last_name (text, req), email (email, req, unique), phone (text), address (text), date_of_birth (date).
- Set rules to `true` for list/view/create/update/delete.
- Add few sample records via Admin UI.

### 2) Frontend
```bash
cd client
cp .env.example .env  # or create .env with VITE_PB_URL=http://127.0.0.1:8090
npm install
npm run dev
```
- Open `http://localhost:5173`.

## Routes
- `/guests` — list with search & actions
- `/guests/new` — add form
- `/guests/:id` — detail + edit/delete

## Notes
- The demo setup allows public CRUD for simplicity.
- Before deploying, you must secure PocketBase rules.
- Error states are surfaced in the UI with SweetAlert2 dialogs.
- All data-fetching mutations are integrated with TanStack Query for caching and refetch.
```
