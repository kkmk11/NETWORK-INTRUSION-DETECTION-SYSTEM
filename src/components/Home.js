// // import Notes from './Notes';

// // export const Home = (props) => {
// //     const {showAlert}=props
// //     return (
// //         <div>
// //             <Notes showAlert={showAlert}/>
// //         </div>
// //     )
// // }
// // export default Home;
// import Notes from './Notes';
// // const {PythonShell}= require("python-shell");
// // let options={
// //     scriptPath:"E:/project school/inotebook2/src/components",
// //     args:["this is from home file",2002],
// // };
// // PythonShell.run("pypgrm.py",options,(err,res)=>{
// //     if(err) console.log(err);
// //     if(res) console.log(res);
// // })
// // importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js");
// const onChange = (e)=>{
//     pythonExec(e.target.name);
// }


// const pythonExec =async()=>{
//     // const python_code=`
//     // print("hello from python")
//     // `;
//     // const pyodide=window.pyodide;
//     // pyodide.runPython(python_code);
//     let pyodide = await window.loadPyodide();
//     // await pyodide.runPythonAsync(`
//     //         from pyodide.http import pyfetch
//     //         response = await pyfetch("/inputfile.txt")
//     //         await response.unpack_archive()
//     //         print(response);
//     //         `)
//         pyodide.runPython(`
            
            
//             n=int(input())
           
//             res=n*n
//         `);
//         pyodide.runPython("print(1 + 2)");
//         console.log(pyodide.globals.get('n'));
//         document.getElementById("para").innerHTML=pyodide.globals.get('res')
    
// }

// export const Home = (props) => {
//     const {showAlert}=props
//     return (
//         <div>
//             <Notes showAlert={showAlert}/>
//         {/* <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp"/> */}

//             <button onClick={pythonExec} onChange={onChange}>Test</button>
//             <p id="para"></p>
//         </div>
//     )
// }
// export default Home;
import Notes from './Notes';
import React, {useState,useEffect} from "react";
import {useNavigate,Link} from "react-router-dom";
import axios from "axios";
import mahesh from './me.jpeg';
import koushik from './jako.jpeg';
import arun from './baa.jpeg';
import prasanna from './prasanna.jpeg';
import {BsTriangle} from "react-icons/bs";
import {AiFillFileText} from "react-icons/ai";
import {AiFillContacts} from "react-icons/ai";
import {FaInstagramSquare, FaLinkedin, FaLinkedinIn} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
// import network from './network.svg';
import teju from './teju.jpeg';
export const Home = (props) => {
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
    let url1="https://www.unb.ca/cic/datasets/nsl.html";
    let url3="https://www.geeksforgeeks.org/mern-stack/";
    let url2="https://www.geeksforgeeks.org/k-nearest-neighbors-with-python-ml/#:~:text=The%20K%2DNearest%20Neighbors%20(KNN,are%20near%20to%20each%20other.";
    let ele2=<a class="link-light text-decoration-none" href={url2}>Click here</a>
    let ele3=<a class="link-light text-decoration-none" href={url3}>Click here</a>
    let ele1=<a class="link-light text-decoration-none" href={url1}>Click here</a>
    let u1="https://github.com/kkmk11";
    let m1=<a class="link-dark" href={u1}><FaGithub/></a>
    let u2="https://www.linkedin.com/in/maheshkumar-kottakota-18a346194/";
    let m2=<a class="link-dark" href={u2}><FaLinkedinIn/></a>
    let u3="https://www.secure.instagram.com/kkmk_11/";
    let m3=<a class="link-dark" href={u3}><FaInstagramSquare/></a>
    let v1="https://github.com/prsanna123";
    let l1=<a class="link-dark" href={v1}><FaGithub/></a>
    let v2="https://www.linkedin.com/in/chilukuri-lakshmi-prasanna-16a180203/";
    let l2=<a class="link-dark" href={v2}><FaLinkedinIn/></a>
    let v3="https://www.instagram.com/lakshmiprasanna_chilukuri/";
    let l3=<a class="link-dark" href={v3}><FaInstagramSquare/></a>
    let w1="https://github.com/arun306";
    let a1=<a class="link-dark" href={w1}><FaGithub/></a>
    let w2="https://www.linkedin.com/in/sabba-arun/";
    let a2=<a class="link-dark" href={w2}><FaLinkedinIn/></a>
    let w3="https://www.instagram.com/sabba639/";
    let a3=<a class="link-dark" href={w3}><FaInstagramSquare/></a>
    let x1="";
    let t1=<a class="link-dark" href={x1}><FaGithub/></a>
    let x2="";
    let t2=<a class="link-dark" href={x2}><FaLinkedinIn/></a>
    let x3="";
    let t3=<a class="link-dark" href={x3}><FaInstagramSquare/></a>
    let y1="";
    let k1=<a class="link-dark" href={y1}><FaGithub/></a>
    let y2="";
    let k2=<a class="link-dark" href={y2}><FaLinkedinIn/></a>
    let y3="";
    let k3=<a class="link-dark" href={y3}><FaInstagramSquare/></a>
    return (
        <div>
      <section className="p-5">
          <div className="container">
            <div className="row text-center g-4">
              <div className="col-md">
                <div className="card bg-dark text-light">
                  <div className="card-body text-center">
                    <div className="h1 mb-3">
                      < AiFillFileText/>
                    </div>
                    <h3 className="card-title mb-3">DATASETS</h3>
                    <p className="card-text">
                      Used NSL-KDD dataset and predicted the attack classes.
                    </p>
                    <button className="btn btn-primary">{ele1}</button>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="card bg-dark text-light">
                  <div className="card-body text-center">
                    <div className="h1 mb-3">
                      {/* <i className="bi bi-triangle"></i> */}
                      <BsTriangle/>
                    </div>
                    <h3 className="card-title mb-3">ALGORITHM</h3>
                    <p className="card-text">
                      Used KNN(k-nearest neighbors algorithm) and predicted the attack classes.
                    </p>
                    <button className="btn btn-primary">{ele2}</button>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="card bg-dark text-light">
                  <div className="card-body text-center">
                    <div className="h1 mb-3">
                      <AiFillContacts/>
                    </div>
                    <h3 className="card-title mb-3">FrontEnd</h3>
                    <p className="card-text">
                      Used MERN stack to build the User Interface and Integrated with Backend.
                    </p>
                    <button className="btn btn-primary">{ele3}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="learn" className="p-5 bg-dark text-light">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-md p-5">
                <h2>HOW TO USE THIS ?</h2><br></br>
                <p>
                  • Firstly login to the website.(If no login id, then sign up and move on to the website). <br></br>
                  • Now create a .txt file with name "inputfile" and move it into the "Local disk-C". <br></br>
                  • Now Enter the following parameters with space seperated between 2 parameters and save it. <br></br>
                  • Parameters to enter into the file in a single line are : <br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration, protocol_type, service, flag, src_bytes, <br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dst_bytes, land, wrong_fragment, urgent, hot,<br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num_failed_logins, logged_in, num_compromised, root_shell, su_attempted,<br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num_root, num_file_creations, num_shells, num_access_files, num_outbound_cmds,<br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_host_login, is_guest_login, count, srv_count, serror_rate,<br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;srv_serror_rate, rerror_rate, srv_rerror_rate, same_srv_rate, diff_srv_rate,<br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;srv_diff_host_rate, dst_host_count, dst_host_srv_count, dst_host_same_srv_rate, dst_host_diff_srv_rate,<br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dst_host_same_src_port_rate, dst_host_srv_diff_host_rate, dst_host_serror_rate, dst_host_srv_serror_rate,<br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dst_host_rerror_rate, dst_host_srv_rerror_rate, label, difficulty_level <br></br>
                  • Press the submit button to predict the score and the type of attack class. <br></br>
                </p>
            </div>
          </div>
          </div>
        </section>
        <section id="questions" className="p-5">
          <div className="container">
            <h2 className="text-center mb-4">Frequently Asked Questions</h2>
            <div className="accordion accordion-flush" id="questions">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-one"
                  >
                  Brief Network Intrusion Detection system?
                  </button>
                </h2>
                <div
                  id="question-one"
                  className="accordion-collapse collapse"
                  data-bs-parent="#questions"
                >
                  <div className="accordion-body">
                    NIDS is nothing but a tool that can be deployed in the network or host level with the purpose to protect the system from malicious traffic. Any of the harmful traffic coming to the network is detected by NIDS.
                  </div>
                </div>
              </div> 
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-two"
                  >
                  What are the Pros of a NIDS ?
                  </button>
                </h2>
                <div
                  id="question-two"
                  className="accordion-collapse collapse"
                  data-bs-parent="#questions"
                >
                  <div className="accordion-body">
                    • Provides IDS security across the entire network. <br></br>
                    • A few strategically placed NIDS can monitor an enterprise-size network. <br></br>
                    • A passive device that does not compromise network availability or throughput. <br></br>
                    • Relatively easy to secure and hide from intruders. <br></br>
                    • Covers networks parts where traffic is most vulnerable. <br></br>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-three"
                  >
                  We know that Intrusion Prevention System is dependent on IDS to understand the attack.How does IDS identify malicious traffic?
                  </button>
                </h2>
                <div
                  id="question-three"
                  className="accordion-collapse collapse"
                  data-bs-parent="#questions"
                >
                  <div className="accordion-body">
                    The intrusion detection system works with the IPS to detect and prevent malicious traffic from harming the system. In order to identify the traffic, IDS uses anomalies detection under which is concerned with raising the alarm when any activity apart from the normal activity is done. The other approach is to understand the traffic signature, and these signatures are stored in the database.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-four"
                  >
                  What are the different types of attack classes of intrusion detection system?
                  </button>
                </h2>
                <div
                  id="question-four"
                  className="accordion-collapse collapse"
                  data-bs-parent="#questions"
                >
                  <div className="accordion-body">
                    <li>
                      <b><u>Probe attacks</u></b>
                      <p>
                        The probe attacks are aimed at acquiring information about
                        the target network from a source that is often external to the
                        network. Hence, basic connection level features such as the
                        “duration of connection” and “source bytes” are significant
                        while features like “number of files creations” and “number
                        of files accessed” are not expected to provide information
                        for detecting probes.
                      </p>
                    </li>
                    <li>
                      <b><u>DoS Attacks</u></b>
                      <p>
                        The DoS attacks are meant to force the target to stop the
                        service(s) that is (are) provided by flooding it with probes
                        illegitimate requests. Hence, for the DoS attack to be
                        detected, traffic features such as the “percentage of
                        connections having same destination host and same service”
                        and packet level features such as the “source bytes” and
                        “percentage of packets with errors” are significant. To
                        detect DoS attacks, it may not be important to know whether
                        a user is “logged in or not.”
                      </p>
                    </li>
                    <li>
                      <b><u>R2L Attacks</u></b>
                      <p>
                        The R2L attacks are one of the most difficult to detect as
                        they involve the network level and the host level features.
                        We therefore select both the network level features such as
                        the “duration of connection” and “service requested” and
                        the host level features such as the “number of failed login
                        attempts” among others for detecting R2L attacks.
                      </p>
                    </li>
                    <li>
                      <b><u>U2R Attacks</u></b>
                      <p>
                        The U2R attacks involve the semantic details that are very
                        difficult to capture at an early stage. Such attacks are often
                        content based and target an application. Hence, for U2R
                        attacks, features such as “number of file creations” and 
                        “number of shell prompts invoked,” are selected while
                        features such as “protocol” and “source bytes are ignored. 
                      </p>
                    </li>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-five"
                  >
                    How to sign in?
                  </button>
                </h2>
                <div
                  id="question-five"
                  className="accordion-collapse collapse"
                  data-bs-parent="#questions"
                >
                  <div className="accordion-body">
                    • On the top most right corner we have the sign in option. <br></br>
                    • Click there. <br></br>
                    • Now enter the email id and new password and then confirm your password. <br></br>
                    • Now click on the sign in button. <br></br>
                    • There You get signed in. <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
        
        <br></br>
        <br></br>
        <div className="text-center"><Link className="btn btn-dark  text-center"  to="/model"role="button">Click here to test</Link></div>
        <br></br>
        <br></br>
        <section id="instructors" className="p-5 bg-primary">
          <div className="container">
            <h2 className="text-center text-white">DEVELOPER</h2><br></br>
            <div className="row g-3 justify-content-center">
              {/* <div className="col-md-3 col-lg-2">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <img
                      src={prasanna}
                      className="rounded-circle mb-3"
                      alt=""
                      width="120px"
                      height="130px"
                    />
                    <h6 className="card-title mb-3">LAKSHMI <br></br> PRASANNA</h6>
                    <p className="card-text">
                      BIO
                    </p>
                    {l1}&nbsp;&nbsp;
                    {l2}&nbsp;&nbsp;
                    {l3}&nbsp;&nbsp;
                  </div>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="col-md-3 col-lg-2">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <img
                      src={koushik}
                      className="rounded-circle mb-3"
                      alt=""
                      width="120px"
                      height="130px"
                    />
                    <h6 className="card-title mb-3">KOUSHIK</h6>
                    <p className="card-text">
                      BIO
                    </p>
                    {k1}&nbsp;&nbsp;
                    {k2}&nbsp;&nbsp;
                    {k3}&nbsp;&nbsp;
                    </div>
                </div>
              </div> */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="col-md-3 col-lg-5">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <img
                      src={mahesh}
                      className="rounded-circle mb-3"
                      alt="" 
                      width="120px"
                      height="130px"
                    />
                    <h6 className="card-title mb-8">MAHESH KUMAR</h6>
                    <p className="card-text">
                      <small>I am a student majoring in Computer Science Engineering. Looking for new opportunities to work and contribute to new projects.</small><br></br>
                      <small><i className="bi bi-telephone-fill"></i>+91-81068 42412</small>
                    </p>
                    {m1}&nbsp;&nbsp;
                    {m2}&nbsp;&nbsp;
                    {m3}&nbsp;&nbsp;
                    </div>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <div className="col-md-3 col-lg-2">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <img
                      src={teju}
                      className="rounded-circle mb-3"
                      alt=""
                      width="120px"
                      height="130px"
                    />
                    <h6 className="card-title mb-3">TEJASWINI</h6>
                    <p className="card-text">
                      BIO
                    </p>
                    {t1}&nbsp;&nbsp;
                    {t2}&nbsp;&nbsp;
                    {t3}&nbsp;&nbsp;
                    </div>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="col-md-3 col-lg-2">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <img
                      src={arun}
                      className="rounded-circle mb-3"
                      alt=""
                      width="120px"
                      height="130px"
                    />
                    <h6 className="card-title mb-3">ARUN SABBA</h6>
                    <p className="card-text">
                      BIO
                    </p>
                    {a1}&nbsp;&nbsp;
                    {a2}&nbsp;&nbsp;
                    {a3}&nbsp;&nbsp;
                    </div>
                </div>
              </div> */}
            </div>
          </div>
        </section><br></br>
        
              
          
        <section className="p-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-md">
                <h2 className=" mb-4">&nbsp; Contact Info</h2>
                <ul className="list-group list-group-flush lead">
                  <li className="list-group-item">
                    <span className="fw-bold"><i className="bi bi-geo-alt-fill"></i>
                    </span> KMIT, Narayanaguda, Hyderabad
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold"><i className="bi bi-telephone-fill"></i></span> 9876543210
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold"><i className="bi bi-envelope"></i></span> abcd@gmail.com
                  </li>
                </ul>
              </div>
              <div className="col-md">
                <div id="map"></div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade"
          id="enroll"
          tabindex="-1"
          aria-labelledby="enrollLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="enrollLabel">Enrollment</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="lead">Fill out this form and we will get back to you</p>
                <form>
                  <div className="mb-3">
                    <label for="first-name" className="col-form-label">
                      First Name:
                    </label>
                    <input type="text" className="form-control" id="first-name" />
                  </div>
                  <div className="mb-3">
                    <label for="last-name" className="col-form-label">Last Name:</label>
                    <input type="text" className="form-control" id="last-name" />
                  </div>
                  <div className="mb-3">
                    <label for="email" className="col-form-label">Email:</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="mb-3">
                    <label for="phone" className="col-form-label">Phone:</label>
                    <input type="tel" className="form-control" id="phone" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
    
            {/* <Notes showAlert={showAlert}/> */}
        {/* <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp"/> */}
        {/* <div className="d-flex justify-content-center" style={{paddingTop:"3rem",paddingBottom:"5rem"}}>
            <h2>Choose File for Prediction</h2>
        </div>

        <div className="d-flex justify-content-center" style={{borderStyle: 'dashed',borderRadius: 0,width:"100%"}}>
            <input  id="file-input" type="file" className="btn btn-primary" accept=".txt" name="FileName" onChange={updateFileName}/> 
        </div>
        <div className="d-flex justify-content-center" id="loading">
            {loading===true?<img src={require('D:/MERNdemostration/inotebook2/src/components/icons8-spinner.gif')} alt='loading...'/>:<img src="" alt=""/>}
        </div>
        <button className="btn btn-primary" onClick={predictKNN} disabled={filename.FileName===""?true:false}>Predict by KNN</button>
            <p id="para"></p>
            <h5>Truth value:</h5>
            <h5 id="truth"></h5>
            <h5>Prediction:</h5>
            <h5 id="Prediction"></h5> */}
        </div>
    )
}
export default Home;