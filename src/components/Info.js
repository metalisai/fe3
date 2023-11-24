import React from 'react';
import "./Info.css";

export const IpContext = React.createContext(null);

const Info = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="infoContainer">
      <div className="info">
        <h2>IP ADDRESS</h2>
        <p id="ipAddress">{props.ipAddress}</p>
      </div>
      <div className="info">
        <h2>LOCATION</h2>
        <p id="location">{props.location}</p>
      </div>
      <div className="info">
        <h2>TIMEZONE</h2>
        <p id="timezone">{props.timezone}</p>
      </div>
      <div className="info">
        <h2>ISP</h2>
        <p id="isp">{props.isp}</p>
      </div>
    </div>
  )
});

export default Info;
