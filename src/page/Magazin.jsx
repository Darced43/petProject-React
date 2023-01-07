import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import MagazinProducts from "../components/MagazinProducts"
import { MySelect } from "../components/UI/select/Myselect"
import { MyInput } from '../components/UI/input/MyInput'
import { MyButton } from "../components/UI/button/MyButton"
import { Link } from "react-router-dom"

export const Magazin = () => {
    const [ IshowModal, setShowModal] = useState(false)
    const [ Iproducts, setProducts ] = useState([]) 
    const [ IselectSort, setSelectSort ] = useState('')
    const [ IserchQuery, setSearchQuery ] = useState('')

    const sortedPost =  () => {
        if(IserchQuery){
            if(IselectSort === 'title'){
                // setProducts([...Iproducts].sort((a, b) => a[IselectSort].localeCompare(b[IselectSort])))
                setProducts([...Iproducts.filter( prod => console.log(prod.title.includes(IserchQuery)))])
                console.log(Iproducts)
            }else if(IselectSort === 'price'){
                // setProducts([...Iproducts].sort((a, b) => {return a[IselectSort] - b[IselectSort]}))
                setProducts([...Iproducts.filter( prod => console.log(prod.title.includes(IserchQuery)))])
                console.log(Iproducts)
            }
        } else {
            return Iproducts
        }
    }

    async function getProduct(){
        try{
            const respons = await axios.get('https://fakestoreapi.com/products')
            setProducts(...Iproducts, respons.data)
            setShowModal(true)
        }
        catch{
            console.log('error')
            setShowModal(false)
        }
    }

    const sortProd = (sort) => {
        setSelectSort(sort)
        if(sort === 'title'){
            setProducts([...Iproducts].sort((a, b) => a[sort].localeCompare(b[sort])))
        }else if(sort === 'price'){
            setProducts([...Iproducts].sort((a, b) => {return a[sort] - b[sort]}))
        }
        console.log(sort)
    }

    useEffect(() => {getProduct()},[])

    return(
        <div>
            <div>
            <MyInput
                value={IserchQuery}
                onChange={e => setSearchQuery(e.target.value)} // что введено передаёться в инпут
                placeholder='поиск...'
            />
            <MyButton onClick={sortedPost}>Поиск</MyButton>
            <MySelect 
                value={IselectSort}
                onChange={sortProd}
                option={[
                    {value:'title', name:'По названию'},
                    {value:'price', name:'По цене'}
                ]} 
                defaultValue='сортировка по'
                />
            </div>
            {IshowModal?
            Iproducts.map((prod, index) =>
                <Link to={`/magazin/${prod.id}`} key={index}>
                    <MagazinProducts prod={prod} />
                </Link>
            )
            :
            <p>загрузка</p>
            }
        </div>
    )
}