import React , {useState} from 'react'

const Options = (props) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        const x = selectedOption;
    };

    

  return (
    <div>
        <label style={props.style}>
        <input type="radio" name="registration" value="patient" 
        onChange={handleOptionChange}/>Patient
        </label>
        <br />
        <label style={props.style}>
        <input type="radio" name="registration" value="hospital"
        onChange={handleOptionChange} />Hospital 
        </label>
        <br />
        <label style={props.style}>
        <input type="radio" name="registration" value="lab"
        onChange={handleOptionChange}/> Lab
        </label>
        <br />
        <br />
    </div>
  )
}
export default Options;