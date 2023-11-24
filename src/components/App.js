import React, { createContext, useState, useRef, useLayoutEffect } from 'react';
import IpBar from './IpBar';
import "./App.css";
import Map from './Map';
import Info from './Info';

export const IpContext = createContext(null);

export default () => {

  const [ipData, setIpData] = useState({
    ipAddress: "8.8.8.8",
    location: "Mountain View, California",
    timezone: "UTC -08:00",
    isp: "Google LLC",
    lat: 37.38605,
    lng: -122.08385,
  });

  const infoDivRef = useRef(null);
  const patternDivRef = useRef(null);
  const myMapDivRef = useRef(null);

  function updateIpData(data) {
    setIpData(data);
  }

  useLayoutEffect(() => {
    const infoDiv = infoDivRef.current;
    const patternDiv = patternDivRef.current;
    const myMapDiv = myMapDivRef.current;
    const bounds = infoDiv.getBoundingClientRect();
    const height = bounds.top + bounds.height/2.0;
    patternDiv.style.height = `${height}px`;
    myMapDiv.style.top = `${height}px`;
    myMapDiv.style.height = `calc(100% - ${height}px)`;
  }, []);

  return (
    <div className="mainContainer">
      <h1>IP Address Tracker</h1>
      <IpContext.Provider value={{ipData, updateIpData}}>
        <IpBar />
      </IpContext.Provider>
      <div className="bg">
        <div ref={patternDivRef} className="bgPattern"></div>

        <div ref={myMapDivRef} className="myMapDiv">
          <Map lat={ipData.lat} lng={ipData.lng} />
        </div>

        <Info ref={infoDivRef} 
          ipAddress={ipData.ipAddress} 
          location={ipData.location}
          timezone={ipData.timezone}
          isp={ipData.isp} />

      </div>
    </div>
  );
};
