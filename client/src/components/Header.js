import React from 'react';
import logo from '../img/app-logo.jpg';


const style_1 = {
    // With react you must import images within component,
    // thus all header css moved here for consistency
    background: 'url("'+logo+'") no-repeat',
    backgroundColor: '#9F1B32',
    color: '#ffffff',
    font: 'bold 10px Helvetica, Sans-Serif',
    height: '60px',
    width: '2000px',
    textAlign: 'center',
    verticalAlign: 'middle',
    display: 'table-cell'
}

const Header = () => (
    <div className="app-header" style={style_1}>
        <h1>Upload Files and Execute Python Script Example</h1>
    </div>
)

export default Header;
