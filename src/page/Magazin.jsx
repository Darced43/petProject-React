import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import MagazinProducts from "../components/MagazinProducts"
import { MySelect } from "../components/UI/select/Myselect"

export const Magazin = () => {
    const [IshowModal, setShowModal] = useState(false)
    const [ Iproducts, setProducts ] = useState([])
    const [ IselectSort, setSelectSort ] = useState('')
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
        }else{
            setProducts([...Iproducts].sort((a, b) => {return a[sort] - b[sort]}))
        }
        console.log(sort)
    }
    useEffect(() => {getProduct()},[])

    return(
        <div>
            <div>
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
                <MagazinProducts prod={prod} key={index}/>
            )
            :
            <p>загрузка</p>
            }
        </div>
    )
}