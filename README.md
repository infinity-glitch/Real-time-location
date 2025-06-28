# 🌍 Real-Time Location Sharing App

A web application that enables users to share their live GPS location in real-time on an interactive map using Node.js, Express, Socket.IO, and Leaflet.js.

Open the app on multiple devices or browser tabs to see live user locations updating on the map in real-time.

## How It Works

- The frontend uses the browser's Geolocation API to track user location.
- Location data is sent to the server via Socket.IO.
- The server broadcasts the location to all connected clients.
- Clients display all users on a Leaflet.js map with real-time marker updates.

## Technologies Used

- Node.js  
- Express.js  
- Socket.IO  
- EJS  
- Leaflet.js  
- OpenStreetMap  
- HTML, CSS, JavaScript

## Project Structure

MAP/  
├── public/  
│   └── script.js  
├── views/  
│   └── index.ejs  
├── app.js  
├── package.json  
└── README.md

## Setup Instructions

1. Clone the repository:
```
git clone https://github.com/infinity-glitch/Real-time-location.git
cd Real-time-location
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
node app.js
```

4. Open in browser:
```
http://localhost:3000
```

## Dependencies

```
npm install express socket.io ejs
```

## Features

- Real-time location updates with WebSockets
- Live marker tracking for all connected users
- Centering map on your own device
- Leaflet.js map with OpenStreetMap tiles
- Responsive and mobile-friendly
- Optional disconnect logic for removing user markers

## Privacy

No location data is stored. All communication happens live over WebSocket and is not persisted.

## Future Ideas

- Nicknames for users  
- Custom avatars on markers  
- Group tracking rooms  
- Authentication and user management  
- HTTPS deployment

## License

MIT License — free to use, clone, and modify.

---

Made with ❤️ using Node.js, Socket.IO & Leaflet.
