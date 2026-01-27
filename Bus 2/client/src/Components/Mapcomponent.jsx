import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Define the college location
const collegeLocation = {
    latitude: 30.272795,
    longitude: 78.000610
};

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const MapComponent = ({ location, drivers }) => {
    const [routes, setRoutes] = useState([]);
    const [driverDetails, setDriverDetails] = useState({});

    useEffect(() => {
        if (location.latitude && location.longitude && drivers.length > 0) {
            calculateRoutes(drivers);
        }
    }, [location, drivers]);

    const calculateRoutes = async (drivers) => {
        const newRoutes = [];
        const apiKey = '5b3ce3597851110001cf6248ce224fea7a7a4d72af394656f251256f';

        for (const driver of drivers) {
            const { location: driverLocation, seat, username } = driver;
            const [longitude, latitude] = driverLocation.coordinates;

            // Fetch route from driver to college
            const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
                params: {
                    api_key: apiKey,
                    start: `${longitude},${latitude}`,
                    end: `${collegeLocation.longitude},${collegeLocation.latitude}`
                }
            });

            const route = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            const distance = response.data.features[0].properties.segments[0].distance / 1000; // Distance in kilometers
            const duration = response.data.features[0].properties.segments[0].duration / 60; // Duration in minutes

            newRoutes.push(route);

            setDriverDetails(prevDetails => ({
                ...prevDetails,
                [driver._id]: {
                    username,
                    seat,
                   
                    distance: distance.toFixed(2),
                    duration: duration.toFixed(2)
                }
            }));
        }
        setRoutes(newRoutes);
    };

    return (
        <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '70%', width: '80%', borderRadius: '0.5rem' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marker for the college */}
            <Marker position={[collegeLocation.latitude, collegeLocation.longitude]} icon={redIcon}>
                <Popup>
                    College Location
                </Popup>
            </Marker>

            {/* Marker for the user's current location */}
            <Marker position={[location.latitude, location.longitude]} icon={redIcon}>
                <Popup>
                    Your current location.
                </Popup>
            </Marker>

            {/* Markers for drivers */}
            {drivers.map(driver => (
                <Marker
                    key={driver._id}
                    position={[driver.location.coordinates[1], driver.location.coordinates[0]]}
                >
                    <Popup>
                        {driverDetails[driver._id] && (
                            <>
                                <strong>{driverDetails[driver._id].username}</strong><br />
                                Number of Seats: {driverDetails[driver._id].seat}<br />
                
                                Distance to College: {driverDetails[driver._id].distance} km<br />
                                Estimated Time: {driverDetails[driver._id].duration} min
                            </>
                        )}
                    </Popup>
                </Marker>
            ))}

            {/* Polyline routes from drivers to the college */}
            {routes.map((route, index) => (
                <Polyline key={index} positions={route} color="blue" />
            ))}
        </MapContainer>
    );
};

export default MapComponent;
