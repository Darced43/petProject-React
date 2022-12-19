import React from "react";
import { useState } from "react";
import { MyButton } from "./UI/button/MyButton";
import { MyInput } from './UI/input/MyInput'

export const FormPost = ({create}) => {
    const [Itask, setTask] = useState({name:''})

    const addNewTask = (event) => {
        if(Itask.name !==''){
            event.preventDefault()
            const newTodoTask = {...Itask, id: Date.now()}
            create(newTodoTask)
            setTask({name:''})
            console.log(Itask)
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
                    onChange={e => setTask({...Itask, name:e.target.value})}
                />
                <MyButton onClick={addNewTask}>Cоздать</MyButton>
            </form>
        </>
    )
}