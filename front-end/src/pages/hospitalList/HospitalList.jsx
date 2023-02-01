import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HospitalCard from "../../components/hospitalCard/HospitalCard";
import { useNavigate } from "react-router-dom";

const HospitalList = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  console.log(keyword, "keyword");
  const handleNavigation = (id) => {
    console.log(id, "id");
    navigate(`/hospital/${id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/patient/searchHospital/${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        setFlag(true);
        // console.log(hospitals, 'hospitals')
        console.log(data, "data");
        // const {hospital}=data
        // setHospitals({hospital})
        console.log(hospitals, "hospitals");
        setHospitals(data);
        setLoading(false);
      });
  }, [keyword]);

  // console.log(hospitals.hopital, 'hospitals.hopital')

  return (
    <div >
      {hospitals &&
        hospitals.map((item, index) => (
          <div onClick={() =>handleNavigation(item._id)}>
          <HospitalCard key={item._id} hospitalData={item} />
          </div>
        ))}
  </div>
  );
};

export default HospitalList;
