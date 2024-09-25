import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster'; // Import leaflet marker clustering plugin
import $ from 'jquery';
import { branches, STORE_LOCATOR_API_KEY } from '../utils/config';

import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const StoreLocator = () => {
  const [currentLocation, setCurrentLocation] = useState([31.4461, 34.8516]);
  const mapRef = useRef(null); // Store map instance

  // Function to fetch user geolocation
  const fetchGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setCurrentLocation([latitude, longitude]); // Update state with user's location
      },
      (error) => {
        console.error('Error fetching geolocation:', error);
      }
    );
  };

  const getCoordinates = (city) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${STORE_LOCATOR_API_KEY}`,
        dataType: 'json',
        success: (data) => {
          if (data.length > 0) {
            const { lon, lat } = data[0];
            resolve({ lon, lat });
          } else {
            reject('No data found for the given city');
          }
        },
        error: (err) => {
          reject('Error fetching coordinates:', err);
        },
      });
    });
  };

  useEffect(() => {
    fetchGeolocation(); // Fetch user's geolocation on component mount

    if (!mapRef.current) {
      const map = L.map('store-locator-map', {
        center: currentLocation, // Israel's latitude and longitude
        zoom: 7,
        minZoom: 7, // Default zoom level
        maxZoom: 12,
        attributionControl: true, // Attribution control enabled
      });

      mapRef.current = map; // Save map instance to useRef

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Set map bounds to restrict to a specific area (Israel)
      const southWest = L.latLng(28.453379, 33.43891); // Southern and western points of Israel
      const northEast = L.latLng(34.334076, 35.895023); // Northern and eastern points of Israel
      const bounds = L.latLngBounds(southWest, northEast);
      map.setMaxBounds(bounds);
      map.on('drag', () => {
        map.panInsideBounds(bounds, { animate: false });
      });

      const markers = L.markerClusterGroup({ maxClusterRadius: 0 }); // Marker cluster group

      // Add branches markers
      branches.map(async (branch) => {
        const location = await getCoordinates(branch.city);

        const popupContent = `
          <div class="max-w-xs p-2 bg-white rounded-lg shadow-lg rtl">
            <h3 class="text-right text-lg font-semibold text-emerald-500 rtl m-0 p-0">${branch.name}</h3>
            <p class="!m-0 text-right text-gray-400 "><strong>${branch.address}, ${branch.city}</strong></br> ${branch.region}</p>
            <p class="!m-0 !my-2 text-right text-gray-600 rtl"><strong>טלפון:</strong> ${branch.phone}</p>
            <h4 class="mt-1 text-right text-md font-semibold rtl ">שעות פתיחה:</h4>
            <ul class="list-none text-right pl-5 text-gray-600">
              <li><strong>• א-ד:</strong> ${branch.openHours['Mon-Thu']}</li>
              <li><strong>• ו:</strong> ${branch.openHours['Fri']}</li>
              <li><strong>• ש:</strong> ${branch.openHours['Sat']}</li>
            </ul>
          </div>
        `;
        try {
          const marker = L.marker([location.lat, location.lon], {
            riseOnHover: true,
            opacity: 0.9,
          }).bindPopup(popupContent);

          // Add the marker to the cluster group
          markers.addLayer(marker);
        } catch (error) {}
      });

      // Add the marker cluster group to the map
      map.addLayer(markers);
    }
  }, []);

  // Update map view when currentLocation changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(currentLocation, 10); // Change the view to the updated currentLocation
    }
  }, [currentLocation]); // Dependency on currentLocation

  return (
    <section id="about-naot" className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 rtl">סניפי הרשת</h1>
      <div id="store-locator-map" className="h-[70vh] w-[80vw] mx-auto z-0"></div>
    </section>
  );
};

export default StoreLocator;
