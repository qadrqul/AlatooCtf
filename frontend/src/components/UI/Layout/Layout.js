import React from 'react';
import Header from "../Header/Header";
import Footer from "../../Footer/Footer";
const Layout = ({children}) => {

    return (
        <div className="wrapper">
            <Header/>
            <div className='main'>
                    {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;