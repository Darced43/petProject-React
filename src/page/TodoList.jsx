import React from "react"
import { useState } from "react"
import '../app.scss'
import { FormPost } from "../components/FormPost"
import Modal from "../components/UI/modal/Modal"

export const TodoList = () => {
    let count = 0
    const [IshowModal, setShowModal] = useState(false)
    const [IListName, setListName] = useState([])

    function createTask(newTask){
        setListName([...IListName, newTask])
    }

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
                {IListName.map( item => {
                    return <div key={count += 1} className='todo__name'>
                                <div className="todo__circul"></div>
                                {item.name}
                            </div>
                })}
                <button onClick={() => setShowModal(true)}>+</button>
            </div>
        </section>
    )
}