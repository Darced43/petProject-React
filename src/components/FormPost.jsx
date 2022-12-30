import React from "react";
import { useState } from "react";
import { MyButton } from "./UI/button/MyButton";
import { MyInput } from './UI/input/MyInput'
import { AddIndexedDB } from '../hooks/AddIndexedDB'

export const FormPost = ({create, addIndexedDB}) => {
    const [Itask, setTask] = useState({name:''})

    const addNewTask = (event) => {
        if(Itask.name !==''){
            event.preventDefault()
            const newTodoTask = {...Itask, id: Date.now()}
            create(newTodoTask)
            AddIndexedDB(Itask.name, newTodoTask.id)
            setTask({name:''})
        }else{
            event.preventDefault()
        }
    }

    return (
        <>
            <form className="flex flex-col" action="">
                <MyInput 
                    type='text'
                    placeholder="Название задачи"
                    value={Itask.name}
                    onChange={e => setTask({name:e.target.value})}
                />
                <MyButton onClick={addNewTask}>Cоздать</MyButton>
            </form>
        </>
    )
}