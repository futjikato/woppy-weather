import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

const CityDetails = ({ location }) => {
  if (typeof location !== 'object') {
    return '';
  }

  const { city, state_name, zip } = location;
  return (
    <div>
      <h2>{zip} {city} ( {state_name} )</h2>
      <div className="map">
        <Map center={[location.lat, location.lng]} zoom="7" style={{height: '400px'}}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lng]} />
        </Map>
      </div>
      <p>
        View on <a target="_blank" href={`http://www.google.com/maps/place/${location.lat},${location.lng}`}>google maps</a>
      </p>
      <style jsx>{`
        .map {
          width: 100%;
          height: 400px;
        }
      `}</style>
    </div>
  );
};

export default CityDetails;