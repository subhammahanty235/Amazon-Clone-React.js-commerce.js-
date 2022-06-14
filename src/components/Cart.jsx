import React from 'react'
import '../css/cart.css'
import { useNavigate } from 'react-router-dom';

function Cart({ cart ,removefromcart }) {
    const navigate = useNavigate();

    return (
        <div className="checkout">
            <div className="checkout_left">
                <img src="https://www.cronj.com/blog/wp-content/uploads/Amazon-UI-1.png" alt="" className='checkout_ad' />
                <div>
                    <h3>Hello , Subham</h3>
                    <h2 className='checkout_title'>Your Shopping Basket</h2>
                    {
                        cart?.line_items?.map((item) => {
                            return (
                                <div className="checkout_prod" key={item.id}>
                                    <img src={item.image.url} alt="" className='chk_prd_img' />
                                    <div className="chk_prd_info">
                                        <p className="chk_prd_info_title">{item.name}</p>
                                        <p className="chk_prd_info_price">
                                            {/* <strong>$100 * 1 = $100</strong> */}
                                            <strong>{item.price.formatted_with_symbol} * {item.quantity} = ₹{item.price.raw * item.quantity}</strong>
                                        </p>
                                        <button className="" onClick={()=>{removefromcart(item.id)}}>Remove from basket</button>
                                    </div>
                                </div>

                            )
                        })
                    }


                </div>
            </div>
            <div className="checkout_right">
                <div className="subtotal">
                    <p>Subtotal ({cart.total_items} items): <strong>{cart?.subtotal?.formatted_with_symbol}</strong></p>
                    <small className='subtotal_gift'>
                        <input type="checkbox" />This Order contains a gift
                    </small>
                </div>
                <button className="chekout_button" onClick={()=>navigate('/checkout')}>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Cart