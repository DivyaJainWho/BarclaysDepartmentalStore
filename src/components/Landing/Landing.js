import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { bangaloreOutlets } from '../../assets/outlet';
import { useSelector } from 'react-redux'
import './Landing.css'
import { data } from '../../assets/items';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { useDispatch} from 'react-redux'
import { addToCart } from '../../redux/actions/cartaction';

function Landing() {
    
  const user = useSelector((state)=> state.User.user)
  const users = useSelector((state)=> state.Users.users)
  const [storename,setStorename] = useState("")
  const [displaydata,setDisplayData] =useState([...data])

  const [lat1, setLat1] = useState(0)
  const [lng1, setLng1] = useState(0)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart =(item) =>{
    dispatch(addToCart(item));
  }

  const handleSearch =(searchdata)=>{
    if(searchdata === ''){
        setDisplayData([...data])
    }
    else{
        let d = [...displaydata.filter((item)=>item.name === searchdata)]
        if(d.length === 0)
        {
            alert("Item does not exist in store")
        }
        else{
            setDisplayData(d)
        }
    }
  }

  useEffect(()=>{
    if(!user.emailId){
        navigate('/login')
    }

    const user1 =users.find((i)=>i.emailId === user.emailId)
    setLat1(user1.latitude)
    setLng1(user1.longitude)

    let min=0, dist=0


    bangaloreOutlets.forEach((outlet)=>{
       dist=  distance(Number(lat1),Number(lng1),Number(outlet.Latitude),Number(outlet.Longitude))
       if(min === 0) {
            min=dist
            setStorename(outlet.Store_Name)
        }
       else{
        min= Math.min(min,dist)
        if(min === dist) setStorename(outlet.Store_Name)
       } 
    })
  },[user.emailId, users, navigate, lat1, lng1])

  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }

    const renderlist = displaydata.map((item) =>{
        const {name, mrp, discountPercent,availableQuantity,discountedSellingPrice,weightInGms,outOfStock,quantity} = item
        const key = `${name}-${mrp}-${discountPercent}-${availableQuantity}`;
        return (
        <div className='four wide column' key={key}>
            <div className='ui link cards'>
                <div className='card'>
                    <div className='name'>Name-{name}</div>
                    <div className='name'>DiscountPrice-{discountPercent}</div>
                    <div className='name'>Quantity-{quantity}</div>
                    <div className='name'>WeightInGms-{weightInGms}</div>
                    <div className='name'>Price- ${mrp}</div>
                    <div className='name'>DiscountSellingPrice- ${discountedSellingPrice}</div>
                    {outOfStock === "TRUE" ?<p>Item out of stock</p>:""}
                    <button className='addcart' onClick={() => handleAddToCart(item)}>Add To Cart<FontAwesomeIcon icon={faShoppingCart} className="icon"/></button>
                </div>
            </div>
        </div>)}
        )

       return (
          <div className='land'>
            <Header handleSearch={handleSearch}/>
            <div className='landing' style={{marginBottom:'0rem'}}>
                <p className='storename'>Nearest store: {storename}</p>
                <div className='ui grid container' style={{marginBottom:'0rem'}}>
                    {renderlist}
                </div>
            </div>
        </div>
      )
}

export default Landing