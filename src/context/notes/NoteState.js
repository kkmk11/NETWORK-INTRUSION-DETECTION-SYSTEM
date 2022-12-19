// import NoteContext from "./noteContext";
// import { useState } from "react";

// const NoteState = (props)=>{
//   const host="http://localhost:5000"
//     const notesInitial = []
//       const [notes, setNotes] = useState(notesInitial)
//       //get notes
//       const getNotes=async()=>{
//         console.log("adding a new note")
//         //to do api call
//         const response=await fetch(`${host}/api/notes/fetchallnotes`,{
//           method: 'GET',
//           headers:{
//             'content-Type':'application/json',
//             'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ODMxM2QwYzhhNDAxMTExZjZlOGQ5In0sImlhdCI6MTY2NTY3NTYyOX0.5EhwhyQ47USMohMgvk-P1KOIYiF90NReD_Q4QxmNYf4'},
//          });
//          const json=await response.json();
//          console.log(json);
//          setNotes(json);
//       }

//       //add note
//       const addNote=async(title,description,tag)=>{
        
//         console.log("adding a new note")
//         //to do api call
//         const response=await fetch(`${host}/api/notes/addnote`,{
//           method: 'POST',
//           headers:{
//             'content-Type':'application/json',
//             'auth-token':localStorage.getItem('token')
//           },
//           body:JSON.stringify(title,description,tag)
//          });
//          const note={
//           "_id": "61322f195jhdsjhvjb537818ca8d0e08",
//           "user": "6131dc5e3e4037cd4734a066",
//           "title": "My Title of added notes",
//           "description": "added notes",
//           "tag": tag,
//           "date": "2021-09-03T14:20:09.668Z",
//           "__v": 0
//         };
//         setNotes(notes.concat(note))
//       }
//       // //delete note
//       // const deleteNote=async(id)=>{
//       //   const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
//       //     method: 'DELETE',
//       //     headers:{
//       //       'content-Type':'application/json',
//       //       'auth-token':localStorage.getItem('token')
//       //     }
//       //    });
//       //    const json=response.json();
//       //    console.log(json);
//       //   console.log("deleting node with id"+id)
        
//       //   const newNotes=notes.filter((note)=>{return note._id!==id})
//       //   setNotes(newNotes);
//       // }
//       // Delete a Note
//   const deleteNote = async (id) => {
//     // API Call
//     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: 'DELETE',
//       headers:{
//               'content-Type':'application/json',
//               'auth-token':localStorage.getItem('token')
//             }
//     });
//     const json = response.json();
//     console.log(json)

//     console.log("Deleting the note with id" + id);
//     const newNotes = notes.filter((note) => { return note._id !== id })
//     setNotes(newNotes)
//   }
//       //edit note
// //       const editNote=async(id,title,description,tag)=>{
// //         //api call
// //         const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
// //         method: 'POST',
// //         headers:{
// //           'Content-Type':'application/json',
// //           'auth-token':localStorage.getItem('token')
// //         },
// //         body:JSON.stringify(title,description,tag)
// //        });
// //        const json=response.json();
// //         //logic to edit in client
// //         for(let index=0;index<notes.length;index++){
// //           const element=notes[index];
// //           if(element._id===id){
// //             element.title=title;
// //             element.description=description;
// //             element.tag=tag;
// //           }
// //         }
// //       }
// //     return (
// //         <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
// //             {props.children}
// //         </NoteContext.Provider>
// //     )
// // }

// // export default NoteState;
//   const editNote = async (id, title, description, tag) => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: 'POST',
//       headers:{
//                   'Content-Type':'application/json',
                //   'auth-token':localStorage.getItem('token')
                // },
//       body: JSON.stringify({title, description, tag})
//     });
//     const json = response.json();

//     // Logic to edit in client
//     for (let index = 0; index < notes.length; index++) {
//       const element = notes[index];
//       if (element._id === id) {
//         element.title = title;
//         element.description = description;
//         element.tag = tag;
//       }

//     }
//   }

//   return (
//     <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//       {props.children}
//     </NoteContext.Provider>
//   )

// }
// export default NoteState;



import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const us=[]
  const [info,setInfo] =useState(us);
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  //get the details
  const getdetails = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchdetails`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    console.log("in line 177");
    const json = await response.json()
    console.log(json);
    console.log("information")
    setInfo(json);
    
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    console.log("Adding a new note")
    const note=await response.json()
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    let newNotes=JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      

    }
    console.log(notes);
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes,info, addNote, deleteNote, editNote, getNotes,getdetails}}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;