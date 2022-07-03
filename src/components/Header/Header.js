import React, { useState } from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

function Header({handleSearch}) {

  const [searchData,setSearchData] = useState("")
  const handleChange=(e)=>{
    setSearchData(e.target.value)
  }

  const handleSearchData=()=>{
    handleSearch(searchData)
    setSearchData('')
  }

  return (
    <div className='header'>
         <p className='title'>Barclays Departmental Store</p>
         <div >
            <input type="text" placeholder='Search by item name' onChange={handleChange} className='search' value={searchData} name='search' autoComplete='off'></input>
            <button className='btn' onClick={(e)=>handleSearchData(e)}>Search</button>
         </div>
        <div className='iconp'><NavLink to="/cart" className='category' style={{ textDecoration: "none"}}><FontAwesomeIcon icon={faShoppingCart} className="icon" size='2x'/></NavLink></div>
    </div>
  )
}

export default Header