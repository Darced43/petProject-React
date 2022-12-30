import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import '../app.scss'
import { FormPost } from "../components/FormPost"
import TodoTask from "../components/TodoTask"
import Modal from "../components/UI/modal/Modal"
import { GetStorIndex } from '../hooks/GetStorIndex'

export const TodoList = () => {
    const [IshowModal, setShowModal] = useState(false)
    const [IListName, setListName] = useState([])
    const arr = [
        {name:'a'},
        {name:'b'},
        {name:'c'},
        {name:'d'},
        {name:'e'}
    ]
    function createTask(newTask){
        setListName([...IListName, newTask])
    }

useEffect(() => GetStorIndex(setListName),[])

    return(
        <section className='Todo'>
            {IshowModal?
            <Modal setShowModal={setShowModal}>
                <FormPost create={createTask}/>
            </Modal>
            :
            <></>
            }
            <div style={{borderRight:'2px solid rgb(254 226 226)'}} className='ml-2'>
                <h1>Список задач</h1>
                {IListName.map( post => 
                    <TodoTask post={post} key={post.id} IListName={IListName} setListName={setListName}/>
                )}
                <button onClick={() => setShowModal(true)}>+</button>
            </div>
            <div>
            </div>
        </section>
    )
}