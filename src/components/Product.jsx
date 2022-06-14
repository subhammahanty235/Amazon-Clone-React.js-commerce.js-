import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../css/product.css'
function Product({ productlist , addtocart ,loadFunc}) {
    const {slug}  = useParams();
    console.log(slug)
    useEffect(()=>{
        if(slug){
            loadFunc(slug)
        }
        
    },[slug])
    return (
        <>
            <div className="products">
                {
                    productlist?.map((prd) => {
                        return (
                            <>
                                <div className="product" key={prd.id}>
                                    {/* <img src="https://m.media-amazon.com/images/I/717ipOx7S6L._AC_SY200_.jpg" alt="" /> */}
                                    <img src={prd.image.url} alt="" />
                                    <h3>{prd.name}</h3>
                                    <p>{prd.price.formatted_with_symbol}</p>
                                    <button onClick={()=>{addtocart(prd.id ,1)}}>Add to Cart</button>
                                </div>
                            </>
                        )
                    })

                }


            </div>
        </>
    )
}

export default Product