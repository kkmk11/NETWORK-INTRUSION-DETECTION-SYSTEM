// import React, { useContext, useEffect, useRef,useState } from 'react'
// import noteContext from "../context/notes/noteContext"
// import Noteitem from './Noteitem';
// import AddNote from './AddNote';

// const Notes = () => {
//     const context = useContext(noteContext);
//     const { notes, getNotes } = context;
//     useEffect(() => {
//         getNotes()
//     }, [])
//     const ref = useRef(null)
//     const [note, setNote] = useState({etitle: "", edescription: "", etag: ""})
//     const refClose=useRef(null)
//     const updateNote = (currentNote) => {
//         ref.current.click();
//         setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
//     }
//     const handleClick = (e)=>{
//         console.log("Updating the note...", note)
//         e.preventDefault(); 
//     }

//     const onChange = (e)=>{
//         setNote({...note, [e.target.name]: e.target.value})
//     }
//     return (
//         <>
//             <AddNote />
//             <button ref={ref} type="button" className="btn btn-primary " data-bs-toggle="modal"  data-bs-target="#exampleModal">
//             </button>

//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">editnote</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             ...
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="button" className="btn btn-primary">update</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="container my-3">
//                 <h1>You Notes</h1>
//                 <div className="row">

//                     {notes.map((note) => {
//                         return <Noteitem key={note._id} updateNote={updateNote} note={note} />
//                     })}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Notes


import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'
const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose=useRef(null)
    const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
        
    }

    const handleClick = (e)=>{
        console.log("Updating the note...", note)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        props.showAlert("updated successfully","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Edit Note</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" minLength={5} required value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" minLength={5} required value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-3">
                <h2>Your Notes</h2>
                <div className="row">
                    <div className="container">
                    {notes.length===0 && 'No notes to display'}</div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
                </div>
            </div>
        </>
    )
}

export default Notes