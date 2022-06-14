import React from 'react'
import '../css/header.css'
// import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../images/logo.png'
import {Link} from 'react-router-dom'
function Header({cart ,categorylist}) {
  return (
      <>
      
      
        <div className="header">
            <Link to='/'>
                <img src={logo} alt="logo" className='header_logo' />
            </Link>
            <div className="header_search">
                <input type="text" />
                <h3 className='searchicon'>🔍</h3>
                {/* <SearchIcon className='header_searchIcon'/> */}
            </div>
            <div className="header_nav">
                <div className="header_options">
                    <span className="header_opone">hello Subham</span>
                    <span className="header_optwo">Sign in</span>
                </div>
                <div className="header_options">
                    <span className="header_opone">Return</span>
                    <span className="header_optwo">& Orders</span>
                </div>
                <div className="header_options">
                    <span className="header_opone">Your</span>
                    <span className="header_optwo">Prime</span>
                </div>
                <div className="header_optionbskt">
                    <Link to='/cart'>
                    <ShoppingCartIcon/>
                    {/* <h3>🔍</h3> */}
                    <span>
                        {cart?.total_items}
                    </span>

                    </Link>
                </div>
            </div>
        </div>
        <div className="header_bottom">
            <ul>
                
                {categorylist.map((li)=>{
                    return <li key={li.id}>
                        <Link to={`/category/${li.slug}`}>
                            {li.name}
                        </Link>
                    </li>
                })}
            </ul>
            <span className="prime_banner">

                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/ACQ/ho_SWM_400x39_2a1._CB623007921_.jpg" alt="prime" />
            </span>
            
        </div>
        </>
  )
}

export default Header