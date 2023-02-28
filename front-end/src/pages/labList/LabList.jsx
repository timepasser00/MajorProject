import React, { useEffect } from 'react'
import {useState} from 'react'
import HospitalCard from '../../components/hospitalCard/HospitalCard';
import { useNavigate } from "react-router-dom";


const LabList = () => {
    const navigate = useNavigate();
    const [labs, setLabs] = useState([]);
    const handleNavigation = (id) => {
        console.log(id, "id");
        navigate(`/lab/${id}`);
    };

    
    useEffect(() => {
       fetch('http://localhost:3001/lab/getAllLabs')
         .then(res => res.json())
            .then(data => {
                console.log(data, "data")
                setLabs(data.labs)
            }
            )
            .catch(err => {
                console.log(err);
            }
            )

    }, [])

  return (
    <div>

        {labs && labs.map((lab) => (
            <div onClick={() => handleNavigation(lab._id)}>
           <HospitalCard key={lab._id} hospitalData={lab} />
           </div>
        ))}
    </div>
  )
}

export default LabList