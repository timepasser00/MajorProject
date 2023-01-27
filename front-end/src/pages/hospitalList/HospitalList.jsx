import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HospitalCard from "../../components/hospitalCard/HospitalCard";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  console.log(keyword, "keyword");

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
    <>
      {hospitals &&
        hospitals.map((item, index) => (
          <HospitalCard key={item._id} hospitalData={item} />
        ))}
    </>
  );
};

export default HospitalList;
