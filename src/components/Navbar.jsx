import React, { useEffect, useState } from 'react';
import { Button , Menu , Typography , Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined , BulbOutlined , FunctionOutlined , MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);  
  const [screenSize, setScreenSize] = useState(window.innerWidth);  

  useEffect(()=>{
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return ()=> window.removeEventListener('resize', handleResize);
  },[]);

  useEffect(()=>{
    if(screenSize < 768){
        setActiveMenu(false);
    }else{
        setActiveMenu(true);
    }
  },[screenSize])
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size="large"/>
            <Typography.Title level={3} className='logo'>
                <Link to="/">Cryptoverse</Link>
            </Typography.Title>
            <Button className='menu-control-container' onClick={()=>setActiveMenu(!activeMenu)}>
                <MenuOutlined/>
            </Button>
        </div>
        {activeMenu && (
            <Menu theme='dark' mode='inline' selectable={false}>
                <Menu.Item icon={<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FunctionOutlined/>}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined/>}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
        )}
        
    </div>
  )
}

export default Navbar