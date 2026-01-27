import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Constants for icon and API key
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Fixed college location
const collegeLocation = {
    latitude: 30.272795,
    longitude: 78.000610
};

const Mapcomponent2 = ({ location }) => {
    const [route, setRoute] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;

    useEffect(() => {
        if (location.latitude && location.longitude) {
            // Calculate the route to the college location
            calculateRoute(location, collegeLocation);
        }

        // Update location every 10 seconds
        const intervalId = setInterval(() => {
            updateCurrentLocation();
        }, 10000); // 10 seconds in milliseconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount

    }, [location]);

    const calculateRoute = async (startLocation, endLocation) => {
        const apiKey = '5b3ce3597851110001cf6248ce224fea7a7a4d72af394656f251256f';

        try {
            const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
                params: {
                    api_key: apiKey,
                    start: `${startLocation.longitude},${startLocation.latitude}`,
                    end: `${endLocation.longitude},${endLocation.latitude}` // Using college location
                }
            });

            const routeData = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setRoute(routeData);
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const updateCurrentLocation = async () => {
        try {
            await axios.post('http://localhost:8100/api/auth/update-location', {
                userId: userId,
                latitude: location.latitude,
                longitude: location.longitude
            });

            // Reload the page after a successful update
            window.location.reload();
        } catch (error) {
            console.error('Error updating location:', error);
        }
    };

    return (
        <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '70%', width: '80%', borderRadius: '0.5rem' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[location.latitude, location.longitude]} icon={redIcon}>
                <Popup>
                    Your current location.
                </Popup>
            </Marker>

            <Marker position={[collegeLocation.latitude, collegeLocation.longitude]} icon={redIcon}>
                <Popup>
                    College Location
                </Popup>
            </Marker>

            {route.length > 0 && (
                <Polyline positions={route} color="blue" />
            )}
        </MapContainer>
    );
};

export default Mapcomponent2;
