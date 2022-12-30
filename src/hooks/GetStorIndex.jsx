export function GetStorIndex(setListName){
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