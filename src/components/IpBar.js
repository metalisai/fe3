import React from 'react';
import { useContext } from 'react';
import "./IpBar.css";
import IconArrow from "../Assets/Images/icon-arrow.svg";
import { IpContext } from './App.js';

export default function IpBar() {
  const { ipData, updateIpData } = useContext(IpContext);

  // https://stackoverflow.com/questions/4460586/javascript-regular-expression-to-check-for-ip-addresses
  function isValidIP(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    }  
    return (false)  
  }  

  const handleSearch = (e) => {
    e.preventDefault();

    const ip = document.getElementById("ipAddress").value;
    if (!isValidIP(ip)) {
      alert("Invalid IP Address");
      return;
    }

    const key = process.env.REACT_APP_IPIFY_API_KEY;
    if (key === undefined) {
      console.error("IPIFY API Key is undefined");
    }
    const url = `https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateIpData({
          ipAddress: data.ip,
          location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
          timezone: `UTC ${data.location.timezone}`,
          isp: data.isp,
          lat: data.location.lat,
          lng: data.location.lng,
        });
        console.log(ipData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="searchBar">
      <input className="searchInput" id="ipAddress" type="text" placeholder="Search for any IP address or domain" />
      <button className="searchButton" onClick={handleSearch}>
        <img src={IconArrow} alt="arrow" />
      </button>
    </div>
  );
}
