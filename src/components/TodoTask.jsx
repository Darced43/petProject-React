import React from "react";

function TodoTask({post, IListName, setListName, deleteNote}){
    function removeTodo(event){
        setListName(IListName.filter(elem => elem.id !== post.id));
        deleteNote(event)
    }

    return(
        <div className='todo__name' id={post.id}>
            <div style={{display:'flex', alignItems: 'center', cursor: 'pointer'}}>
                <div className="todo__circul"></div>
                {post.name}
            </div>
            <span style={{cursor: 'pointer', marginRight: '10px'}} onClick={(event) => removeTodo(event)}>удалить</span>
        </div>
    )
}

export default TodoTask