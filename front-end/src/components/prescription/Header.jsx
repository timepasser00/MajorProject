import React from "react";
import med_symbol from "../../Assets/images/med_symbol.jpg";

const Header = () => {
  return (
    <div className="pres-head-container">
      <div className="pres-head-left">
        <h3 className="dr-name-text">Dr temproary</h3>
        <div>M.B.B.S, M.D, M.S | Reg No:29319038</div>
        <div>Phone No:994359024</div>
      </div>
      <img src={med_symbol} alt="med_symbol" className="pres-head-img" />
      <div className="pres-head-right">
        <h3 className="dr-name-text">Appolo Hospitals Ltd.</h3>
        <div>Safdargunj ,New Delhi</div>
        <div>Phone No:994359024</div>
      </div>
    </div>
  );
};

export default Header;
