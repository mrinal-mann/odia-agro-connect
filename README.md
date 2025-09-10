# Agri Supply Chain Portal (PWA)

Mobile-first PWA with role-based portals for Farmer, Hub Authority, and Buyer. Implements booking → approval → inventory → tender → purchase using mock localStorage data and simulated IoT stream.

## Tech
- React + Vite + TypeScript + Tailwind + shadcn/ui
- React Router, React Query
- PWA (manifest + service worker)
- i18n (EN/Odia)
- Charts via Recharts, QR via react-qr-code

## How to run
1. npm install
2. npm run dev
3. Open the preview URL. Installable as a PWA.

Test logins (OTP 123456):
- Farmer: +919999900001 → redirected to /farmer/dashboard
- Hub: +919999900002 → /hub/dashboard, /hub/queue, /hub/tenders
- Buyer: +919999900003 → /buyer/market, /buyer/orders

## Features
- Landing with role selection
- Mock OTP auth with role-based guard and redirection
- Farmer: Slot booking, QR generation, notice board, bookings table
- Hub: Pending queue accept/reject with drop window; capacity, IoT live tiles, tenders CRUD
- Buyer: Market with inventory + tenders; cart and checkout; orders list
- Notifications panel, language switch EN/Odia

## Notes
- Data is stored in localStorage and seeded on first run.
- IoT stream is simulated every 5s. ALERT shows if temp > 8°C sustained.
- This MVP uses client mocks; swap mockApi with your backend as needed.
