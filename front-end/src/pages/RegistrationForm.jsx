import React, { useState } from "react";
import { useEffect } from "react";
import Options from "../components/Options";
import { useDispatch, useSelector } from "react-redux";
import { assignWalletAddress } from "../redux/actions/patientActions";
import PatientDetails from "./PatientDetails";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { borderRadius } from "@mui/system";
const RegistrationForm = (props) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [id, setId] = useState("");
  const tempwallet = useSelector((state) => state.walletAddress);
  const dispatch = useDispatch();

  const formStyles = {
    width: "500px",
    height: "450px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: " #fff",
    padding: "20px",
    border: "1px solid #333",
    color: "black",
    borderRadius: "5%",
  };
  console.log("Im in registration form");
  useEffect(() => {
    // e.preventDefault();
    const metaCheck = async () => {
      if (window.ethereum) {
        console.log("metaCheck");
        try {
          const curr_accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          await Promise.resolve(curr_accounts);
          setWalletAddress(curr_accounts[0]);
          console.log("walletAddress :: ", walletAddress);
          // dispatch({type: "SET_WALLET_ADDRESS", payload: walletAddress});
          const Info = {
            walletAddress: walletAddress,
            category: "",
          };

          dispatch(assignWalletAddress(Info));
          // dispatch(assignWalletAddress(walletAddress));
          console.log("tempwallet :: ", tempwallet);
        } catch (error) {
          console.log("Error connecting ..");
        }
      } else {
        console.log("not detected");
      }
    };
    metaCheck();
  }, [walletAddress, dispatch, tempwallet]);

  const radioStyles1 = {
    position: "absolute",
    width: "auto",
    padding: "5px",
    left: "30%",
    margin: "10px",
  };
  const radioStyles2 = {
    position: "absolute",
    width: "auto",
    padding: "5px",
    left: "30%",
    margin: "10px",
  };
  const buttonStyles = {
    width: " 60px",
    height: "30px",
    borderRadius: "2px",
    backgroundColor: "#1e90ff",
    color: "white",
    border: "none",
    margin: "10px",
  };

  const registerPageStye = {
    backgroundColor: "#1c1b1b",
    color: "white",
  };

  function handleOptionChange(x) {
    setSelectedOption(x);
  }
  const navigate = useNavigate();
  const navigateToDetails = () => {
    if (selectedOption === "patient") {
      navigate("/patientDetails");
    } else if (selectedOption === "insuranceCompany") {
      navigate("/insuranceCompanyDetailsForm");
    } else {
      navigate("/requestForm", { state: { data: selectedOption } });
    }
  };
  const handleRequest = async (func) => {
    try {
      fetch("http://localhost:3001/home/logIn", {
        method: "POST",
        body: JSON.stringify({ walletAddress, selectedOption }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("No such user exists");
          }
        })
        .then((data) => {
          setId(data);
          console.log(data, "id from registration form");
          const Info = {
            walletAddress: walletAddress,
            category: data.category,
          };
          dispatch(assignWalletAddress(Info));

          navigate(`/${data.category}/${data.id}`);
        })
        .catch((err) => {
          alert("No such user exists2");
        });
    } catch (err) {
      alert("No such user exists3");
    }
  };

  return (
    <>
      <div className="register-app" style={registerPageStye}>
        <h1>Health Block</h1>
        <form style={formStyles} className="register-app-form">
          <h3>Sign Up Options:</h3>
          <Options
            style={radioStyles1}
            handleOptionChange={handleOptionChange}
          />
          <button
            style={buttonStyles}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              navigateToDetails();
            }}
          >
            SignUp
          </button>
          <h3>Log In Options:</h3>
          {/* <h3>{walletAddress}</h3> */}
          <Options
            style={radioStyles2}
            option={selectedOption}
            handleOptionChange={setSelectedOption}
            type="login"
          />
          <button
            style={buttonStyles}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleRequest("logIn");
            }}
          >
            Log In{" "}
          </button>
        </form>
        <Link to="/home">Home</Link>
      </div>
      {/* <h1>{id}</h1> */}
    </>
  );
};

export default RegistrationForm;
