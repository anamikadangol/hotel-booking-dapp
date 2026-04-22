# Hotel Booking DApp
A **Hybrid Decentralized Application (DApp)** for hotel room booking, developed as part of the **CN6035 module**.  
This project combines a **React front end**, **Node.js + Express back end**, and **Algorand TestNet integration** to demonstrate a modern hybrid DApp architecture for reservation management.

## Repository of Admin Panel
https://github.com/anamikadangol/hotel-booking-dapp

## Project Overview
The Hotel Booking DApp allows users to:

- Browse available hotel rooms
- View room details
- Create bookings
- Choose between **Pay Later** and **Pay Now**
- Validate payment details on the booking page
- Store booking data through a backend API
- Demonstrate blockchain-ready architecture using **Algorand TestNet**

This project was developed using an **open-source hotel booking project as inspiration/reference** for UI structure, and was significantly adapted and extended with custom booking logic, backend APIs, payment simulation, and blockchain integration.


## Technologies Used

### Front End
- React
- Vite
- React Router DOM
- CSS / Custom Styling

### Back End
- Node.js
- Express
- TypeScript

### Blockchain
- Algorand TestNet
- algosdk

### Version Control
- Git
- GitHub


## Features
- Responsive hotel booking interface
- Home page with featured rooms
- Rooms listing page
- Individual room details page
- Booking page with:
  - Guest details form
  - Date selection
  - Guest selection
  - **Pay Later** option
  - **Pay Now** option
- Card validation for **Pay Now**:
  - 16-digit card number
  - MM/YY expiry format
  - 3-digit CVV
- Backend booking API (`/api/bookings`)
- Booking records stored in JSON for prototype demonstration
- Hybrid DApp architecture with Algorand-ready backend integration

## Project Structure
``` id="lw43uv"
hotel-booking-dapp/
│
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── Components/
│   │   ├── pages/
│   │   ├── images/
│   │   └── ...
│   └── vite.config.js
│
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── data/
│   │   └── ...
│   └── .env               # local only (not pushed)
│
└── README.md

Go to the project directory
```bash
  cd /workspaces/hotel-booking-dapp/server
  npm run dev 
```
```bash
  cd /workspaces/hotel-booking-dapp/client
  npm run dev
```

Install dependencies
```bash
  npm install
```

Start the server
```bash
  npm start
```
