export const DeleteNote = (event) => {
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