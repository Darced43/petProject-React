import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'

const ItemProd = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [ prod, setProd ] = useState(null);

    async function getProduct(){
        try{
            const respons = await axios.get(`https://fakestoreapi.com/products/${id}`)
            setProd(respons.data)
        }
        catch{
            console.log('error')
        }
    }

    useEffect(() => {
        getProduct()
    }, [id]);

    return(
        <>
            {prod?
                <div 
                style={{margin:'20px 10px', 
                        padding: '10px',
                        border:'1px solid #c5c5c5', 
                        display: 'grid', 
                        gridTemplateColumns: '5fr 2fr', 
                        }}
                >
                <div style={{display: 'flex', justifyContent: 'space-between', flexDirection:'column'}}>
                    <div>
                        <h2>{prod.title}</h2>
                        <p>{prod.description}</p>
                    </div>
                    <span><strong>{prod.price}</strong></span>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img 
                        style={{
                            width: '10rem',
                            height: 'auto'
                        }}
                        src={prod.image} alt="изображение товара" 
                    />
                </div>
                </div>
                :
                <p>загрузка</p>
            }
        </>
    )
}

export default ItemProd