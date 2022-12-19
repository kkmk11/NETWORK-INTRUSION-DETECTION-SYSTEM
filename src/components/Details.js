import React,{useContext,useEffect} from 'react'
import noteContext from "../context/notes/noteContext"
import {Link} from 'react-router-dom'
export const Details = () => {
  const context = useContext(noteContext);
  const {info,getdetails} = context;
  let id;
  let name;
  let email;
  useEffect(() => {
    if(localStorage.getItem('token')){
        getdetails()
    }
    
    // eslint-disable-next-line
}, [])
  {info.map((note) => {
    id=note._id;
    name=note.name;
  email=note.email})}
    
  return (
    <form>
      <div className="container text-center bg-primary w-25 mt-3">
      <i className="fa fa-user-o fa-10x mt-2" aria-hidden="true" ></i>
  <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="form-label mt-2">{name} </label>
    <label></label>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label mt-2">{email}</label>
    
  </div>
  <div>
  <Link className="btn btn-primary mx-1"  to="/"role="button">close</Link></div></div>
</form>
  )
}
export default Details