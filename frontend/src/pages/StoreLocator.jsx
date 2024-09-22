import React, { useEffect } from 'react';
import L from 'leaflet';
import $ from 'jquery';
import { branches } from '../utils/config';

import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const OWM_API_KEY = '12d0c4bf314458418c4090773ae53b03';

const StoreLocator = () => {
  const getCoordinates = (city) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OWM_API_KEY}`,
        data: {
          appid: OWM_API_KEY,
          limit: 1,
          q: city,
        },
        dataType: 'json',
        success: (data) => {
          if (data.length > 0) {
            const { lon, lat } = data[0];
            console.log(`${city}-- Longitude: ${lon}, Latitude: ${lat}`);
            resolve({ lon, lat });
          } else {
            reject('No data found for the given address');
          }
        },
        error: (err) => {
          reject('Error fetching coordinates:', err);
        },
      });
    });
  };

  useEffect(() => {
    // Initialize the map and set the view to Israel
    const map = L.map('store-locator-map', {
      center: [31.4461, 34.8516], // Israel's latitude and longitude
      zoom: 8,
      minZoom: 7, // Default zoom level
      maxZoom: 18,
      attributionControl: false, // Disable attribution control
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    // Optional: Set map bounds to restrict to a specific area
    const southWest = L.latLng(29.453379, 33.43891); // Southern and western points of Israel
    const northEast = L.latLng(33.334076, 35.895023); // Northern and eastern points of Israel
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });

    // Add branches markers
    branches.map(async (branch) => {
      const location = await getCoordinates(branch.city);
      console.log(location);

      const popupContent = `
      <div class="max-w-xs p-2 bg-white rounded-lg shadow-lg rtl">
        <h3 class="text-right text-lg font-semibold text-emerald-500 rtl m-0 p-0">${branch.name}</h3>
        <p class="!m-0 atext-right text-gray-400 rtl "><strong>${branch.address}, ${branch.city}</strong></br> ${branch.region}</p>
        <p class="!m-0 !my-2 text-right text-gray-600 rtl"><strong>טלפון:</strong> ${branch.phone}</p>
        <h4 class="mt-1 text-right text-md font-semibold rtl ">שעות פתיחה:</h4>
        <ul class="list-none text-right pl-5 text-gray-600">
          <li><strong>• א-ד:</strong> ${branch.openHours['Mon-Thu']}</li>
          <li><strong>• ו:</strong> ${branch.openHours['Fri']}</li>
          <li><strong>• ש:</strong> ${branch.openHours['Sat']}</li>
        </ul>
      </div>
    `;

      L.marker([location.lat, location.lon]).addTo(map).bindPopup(popupContent);
      // .openPopup();
    });

    // Cleanup on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <section id="about-naot" className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 rtl">סניפי הרשת</h1>
      <div id="store-locator-map" className="h-[70vh] w-[50vw] mx-auto"></div>
    </section>
  );
};

export default StoreLocator;
