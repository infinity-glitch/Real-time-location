// Connect to the Socket.IO server
const socket = io(); // This automatically connects to the server where the HTML page was served from

// Check if the browser supports geolocation
if (navigator.geolocation) {
    // Watch for changes in the user's position
    navigator.geolocation.watchPosition(
        (position) => {
            // Extract latitude and longitude from the position object
            const { latitude, longitude } = position.coords;
            // Emit the location data to the server
            socket.emit("send-location", { latitude, longitude });
        },
        (err) => {
            // Log any geolocation errors
            console.error("Geolocation error:", err);
        },
        {
            // Geolocation options
            enableHighAccuracy: true, // Request the most accurate position possible
            timeout: 5000,           // Maximum time (ms) to wait for a position
            maximumAge: 0,           // Force a fresh position reading every time
        }
    );
} else {
    console.error("Geolocation is not supported by your browser.");
}

// Initialize the Leaflet map
// Set an initial view (e.g., [0, 0] for Null Island) and zoom level
const map = L.map("map").setView([0, 0], 10);

// Add OpenStreetMap tiles to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data © OpenStreetMap contributors",
}).addTo(map);

// Object to store Leaflet markers, keyed by socket ID
const markers = {};

// Listen for 'receive-location' events from the server
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    // *** IMPORTANT FIX FOR SHOWING YOUR OWN ACCURATE LOCATION ***
    // Only update the map view to center on your own location
    if (id === socket.id) {
        map.setView([latitude, longitude], 16); // Zoom in closer for your own location
    }

    // Check if a marker already exists for this user ID
    if (markers[id]) {
        // If yes, update its position
        markers[id].setLatLng([latitude, longitude]);
    } else {
        // If no, create a new marker and add it to the map
        markers[id] = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("User: " + id) // Add a popup with the user's ID
            .openPopup(); // Open the popup immediately (optional)
    }
});

// Optional: Handle user disconnection (to remove markers)
// socket.on("user-disconnected", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//         console.log("Removed marker for disconnected user:", id);
//     }
// });