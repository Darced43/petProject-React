export function AddIndexedDB(message, idNumber){
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