
import axios from "axios";
import Notes from './Notes';
import React, {useState,useEffect} from "react";
import {useNavigate,Link} from "react-router-dom";
export const Model = (props) => {
    const {showAlert}=props
    let navigate = useNavigate();
    const [filename,setfilename] = useState({FileName:""})
    const [loading, setloading] = useState(false);

    const predictKNN = ()=>{
        document.getElementById('truth').textContent="";
        document.getElementById('Prediction').textContent = "";
        setloading(true);
        const url = `http://localhost:5000/api/auth/predictKNN?Input=${JSON.stringify(filename)}`
        axios.get(url).then(response=>{
            console.log(response);
            document.getElementById('truth').textContent = response.data.result;
            formatResult();
            setloading(false);
        }).catch(error=>{
            console.log(error)
        })
        
    }
    useEffect(() => {
        const func = ()=>{
            if(localStorage.getItem("token")===null)
            navigate("/login");
        }
        func()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])
    const updateFileName=(e)=>{
        setfilename({...filename,[e.target.name]:e.target.value.slice(12)})
    }

    useEffect(() => {
        console.log(filename)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateFileName])
    const formatResult = ()=>{
        let result = document.getElementById("truth").textContent.split("\r\n");
        console.log(result)
        document.getElementById("truth").textContent = result[0]
        document.getElementById("Prediction").textContent = result[1]
    }
  return (
    <div>
        <div className="d-flex justify-content-center" style={{paddingTop:"3rem",paddingBottom:"5rem"}}>
            <h2>Choose File for Prediction</h2>
        </div>
        <div className="d-flex justify-content-center form-control shadow-none" style={{borderStyle: 'dashed',borderRadius: 0,width:"100%"}}>
            <input  id="file-input" type="file" className="btn btn-primary" accept=".txt" name="FileName" onChange={updateFileName}/> 
        </div>
        <br></br>
        <br></br>
        <button className="btn btn-dark d-grid gap-2 col-3 mx-auto" onClick={predictKNN} disabled={filename.FileName===""?true:false}>Predict</button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="d-flex justify-content-center" id="loading">
            {loading===true?<img src={require("D:/INTRUSION/nids/src/components/loader.gif")} alt='loading...'/>:<img src="" alt=""/>}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <p id="para"></p>
        <h5>Accuracy rate:</h5>
        <h5 id="truth"></h5>
        <br></br>
        <h5>Predicted Attack Class:</h5>
        <h5 id="Prediction"></h5>
        <br></br>

    </div>
  )
}
export default Model;