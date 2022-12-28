import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import '../app.scss'
import { FormPost } from "../components/FormPost"
import TodoTask from "../components/TodoTask"
import Modal from "../components/UI/modal/Modal"

export const TodoList = () => {
    const [IshowModal, setShowModal] = useState(false)
    const [IListName, setListName] = useState([])

    function createTask(newTask){
        setListName([...IListName, newTask])
    }

    function addIndexedDB(message, idNumber){
        let db
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        let dbRequest = indexedDB.open("taskThree", 1);

        dbRequest.onupgradeneeded = (event) => {
            db = event.target.result
            let task = db.createObjectStore('task', {autoIncrement: true})
            if(!db.objectStoreNames.contains('task')){
              task = db.createObjectStore('task', {autoIncrement: true})
            }else{
              task = dbRequest.transaction.objectStore('task')
            }
            if (!task.indexNames.contains('idName')) {
              task.createIndex('idName', 'id');
            }
        }
        dbRequest.onsuccess = (event) => {
            db = event.target.result;
            addStickyNote(db, message, idNumber);
        }
        dbRequest.onerror = (event) => {
            db = event.target.result;
            console.log('error')
        }
        const addStickyNote = (db, message, idNumber) => {
            let tx = db.transaction(['task'], 'readwrite');
            let store = tx.objectStore('task');
            let note = {name: message, id: idNumber};
            store.add(note);

            tx.oncomplete = () => {
              console.log(note)
              
            }
            tx.onerror = (event) => {
              alert('всё плохо');
            }
          }
    }

function getStorIndex(){
    let db
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    let dbRequest = indexedDB.open("taskThree", 1);

    dbRequest.onupgradeneeded = (event) => {
      db = event.target.result
      let task = db.createObjectStore('task', {autoIncrement: true})
      if(!db.objectStoreNames.contains('task')){
        task = db.createObjectStore('task', {autoIncrement: true})
      }else{
        task = dbRequest.transaction.objectStore('task')
      }
      if(!task.indexNames.contains('idName')){
        task.createIndex('idName', 'id')
      }
    }
    dbRequest.onsuccess = (event) => {
        db = event.target.result;
        getAndDisplayNotes(db)
    }
    dbRequest.onerror = (event) => {
        db = event.target.result;
        console.log('bongo')
    }
    const getAndDisplayNotes = (db) => {
        let tx = db.transaction(['task'], 'readonly');
        let store = tx.objectStore('task');
        let req = store.openCursor();
        let allNotes = [];
        req.onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor != null) {
            allNotes.push(cursor.value);
            setListName(prev => [...prev, cursor.value])
            cursor.continue();
        } else {
            console.log('готово')
          }
        }
        req.onerror = (event) => {
          alert('error in cursor request ' + event.target.errorCode);
        }
      }
}


//==========================
const deleteNote = (event) => {
        let db
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        let dbRequest = indexedDB.open("taskThree", 1);

        dbRequest.onupgradeneeded = (event) => {
            db = event.target.result
          }
          dbRequest.onsuccess = (event) => {
            db = event.target.result;
            deleteText(db)
        }
        dbRequest.onerror = (event) => {
            db = event.target.result;
            console.log('error')
        }
        function deleteText(db){
          const valueTimestamp = parseInt(event.target.parentElement.getAttribute('id'));
          const tx = db.transaction(['task'], 'readwrite');
          console.log(tx)
          tx.oncomplete = (event) => {
            console.log('Transaction completed.')
            // getStorIndex(db); // под вопросом
          };
          tx.onerror = function(event) {
            alert('error in cursor request ' + event.target.errorCode);
          };
        
          const store = tx.objectStore('task');
          const index = store.index("idName");
          const req = index.getKey(valueTimestamp)
          req.onsuccess = (event) => {  
            const key = req.result;
            let deleteRequest = store.delete(key);
            deleteRequest.onsuccess = (event) => {
              console.log('Delete request successful')
            };
          }
        }
}

//============================================
useEffect(getStorIndex,[])

    return(
        <section className='Todo'>
            {IshowModal?
            <Modal setShowModal={setShowModal}>
                <FormPost create={createTask} addIndexedDB={addIndexedDB}/>
            </Modal>
            :
            <></>
            }
            <div style={{borderRight:'2px solid rgb(254 226 226)'}} className='ml-2'>
                <h1>Список задач</h1>
                {IListName.map( post => 
                    <TodoTask post={post} key={post.id} IListName={IListName} setListName={setListName} deleteNote={deleteNote}/>
                )}
                <button onClick={() => setShowModal(true)}>+</button>
            </div>
        </section>
    )
}