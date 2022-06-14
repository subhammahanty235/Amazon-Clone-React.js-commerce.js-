// import Commerce from '@chec/commerce.js'
import React, { useEffect } from 'react'
import { useState } from 'react'
import '../css/checkout.css'
import commerce from '../lib/commerce'
function Checkout({cart}) {
    const [Token , SetToken] =  useState({})
    const [countryList , setcountryList] = useState([])
    const [SubDivisions , setsubDivisions] = useState([])
    const [country , setCountry] = useState(null)
    const [subdivision , setSubdivison] = useState(null)

    const getShippingCountries = async(tokenId)=>{
        const {countries} =await commerce.services.localeListShippingCountries(tokenId)
        setcountryList(Object.entries(countries))
    }

    const getShippingSubdivisions = async(country)=>{
        const {subdivisons} =await commerce.services.localeListSubdivisions(country)
        // setsubDivisions(Object.entries(subdivisons))
        // console.log(SubDivisions)
        // setSubdivison(Object.keys(subdivisons)[0])
        console.log(subdivisons)
    }
    const generateToken =async (cartId)=>{
       const res = await commerce.checkout.generateToken(cartId , {type:'cart'})
       SetToken(res)
       getShippingCountries(Token.id)
    }

    
    useEffect(()=>{
        generateToken(cart?.id)
        
    },[cart])

    useEffect(()=>{
        if(country){

            getShippingSubdivisions(country)
        }
    },[country])
    return (
        <div className='checkout'> 
            <h2>Shipping Details</h2> <br /><br />

            <form action="">
                <div className="checkout_form">


                    <div className="checkout_column">
                        <label htmlFor="">First Name</label>
                        <input type="text" required name='firstname' />
                    </div>
                    <div className="checkout_column">
                        <label htmlFor="">Last Name</label>
                        <input type="text" required name='lastname' />
                    </div>
                    <div className="checkout_column">
                        <label htmlFor="">Address</label>
                        <input type="text" required name='address' />
                    </div>
                    <div className="checkout_column">
                        <label htmlFor="">Email</label>
                        <input type="text" required name='email' />
                    </div>
                    <div className="checkout_column">
                        <label htmlFor="">City*</label>
                        <input type="text" required name='city' />
                    </div>
                    <div className="checkout_column">
                        <label htmlFor="">Zip Code*</label>
                        <input type="text" required name='zipcode' />
                    </div>
                    <div className="checkout_column">
                        <label htmlFor="">Shipping Country*</label>
                        <select name="country" id="" value={country} onChange={e=>setCountry(e.target.value)}>
                            {countryList?.map((country)=>{
                                return <option value={country[0]}>{country[1]}</option>
                            })}
                        </select>
                    </div>
                    {/* <div className="checkout_column">
                        <label htmlFor="">Shipping Subdivision*</label>
                        <select name="subdivision" id="" value={subdivision} onChange={(e)=>{setSubdivison(e.target.value)}}>
                            {SubDivisions?.map((sd)=>{
                                return <option value={sd[0]}>{sd[1]}</option>
                            })}
                        </select>
                    </div> */}
                    <div className="checkout_column">
                        <label htmlFor="">Shipping Subdivision*</label>
                        <select name="subdivision" id="" >
                            {/* {SubDivisions?.map((sd)=>{
                                return <option value={sd[0]}>{sd[1]}</option>
                            })} */}
                        </select>
                    </div>
                    <div className="checkout_column">
                        <label htmlFor="">Shipping Options*</label>
                        <select name="shippingoptions" id="">
                            <option >free</option>
                        </select>
                    </div> <br />
                    <div className="checkout_column">
                        <button>Pay Now</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Checkout