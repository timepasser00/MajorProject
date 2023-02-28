import React , {useState} from 'react'

const Options = (props) => {
    // const [selectedOption, setSelectedOption] = useState("")

    

  return (
    <div >
        <label style={props.style}>
        <input type="radio" name="registration" value="patient" 
        onChange={(e)=>
        props.handleOptionChange(e.target.value)}/>Patient
        </label>
        <br />
        <label style={props.style}>
        <input type="radio" name="registration" value="hospital"
        onChange={(e)=>
        props.handleOptionChange(e.target.value)} />Hospital 
        </label>
        <br />
        <label style={props.style}>
        <input type="radio" name="registration" value="lab"
        onChange={(e)=>
        props.handleOptionChange(e.target.value)}/> Lab
        </label>
        <br />
        <label style={props.style}>
        <input type="radio" name="registration" value="insuranceCompany"
        onChange={(e)=>
        props.handleOptionChange(e.target.value)}/> Insurance Company
        </label>
        <br />
        {props.type === "login" && <>
        <label style={props.style}>
        <input type="radio" name="registration" value="doctor"
        onChange={(e)=>
        props.handleOptionChange(e.target.value)}/> Doctor
        </label> <br />
        </>}
        {props.type === "login" && <>
        <label style={props.style}>
        <input type="radio" name="registration" value="labTech"
        onChange={(e)=>
        props.handleOptionChange(e.target.value)}/> Lab Technician
        </label> <br />
        </>}
       
        <br/>
    </div>
  )
}
export default Options;