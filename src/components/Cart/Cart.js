import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import './Cart.css'
import { useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import { removeFromCart } from '../../redux/actions/cartaction'
import { Link } from 'react-router-dom';

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CartProducts = useSelector((state)=>state.CartProducts.cartProducts)
  const user = useSelector((state)=> state.User.user)

  const handleRemoveFromCart =(item) =>{
    dispatch(removeFromCart(item));
  }

  useEffect(()=>{
    if(!user.emailId){
        navigate('/login')
    }},[CartProducts,navigate,user.emailId])

  const renderlist = CartProducts.map((item) =>{
    const {name, mrp, discountPercent,availableQuantity,discountedSellingPrice,weightInGms,outOfStock,quantity} = item
    const key = `${name}-${mrp}-${discountPercent}-${availableQuantity}`;

    return (
    <div className='four wide column' key={key}>
        <div className='ui link cards'>
            <div className='card'>
                <div className='name'>Name-{name}</div>
                <div className='name'>DiscountPercent-{discountPercent}</div>
                <div className='name'>Quantity-{quantity}</div>
                <div className='name'>WeightInGms-{weightInGms}</div>
                <div className='name'>Price- ${mrp}</div>
                <div className='name'>DiscountSellingPrice- ${discountedSellingPrice}</div>
                {outOfStock === "TRUE" ?<p>Item out of stock</p>:""}
                <button  onClick={() => handleRemoveFromCart(item)} style={{backgroundColor:'transparent', border:'none'}}><FontAwesomeIcon icon={faDeleteLeft} className="pinkfavicon" size='2x'/></button>
            </div>
        </div>
    </div>)}
    )

   return (
     <div className='cart'>
      {!Object.keys(CartProducts).length ?<div><h1 className='heading'>Ooops !!!! Your Cart is empty</h1></div> :
      <div>
        <div className='head'>
            <h1 className='heading'>Tadaa your Cart is ready to checkout</h1>
            <Link to='/landing' className='back'>Back to Home</Link>
        </div>
      <div className='ui grid container render' style={{marginBottom:'0rem'}}>
        {renderlist}
      </div> 
      </div>
      }
     </div>
  )
}

export default Cart