import React from 'react';
import headerBg from '../../static/space-photo.jpeg';
import CompanyName from './CompanyName';

const style = {
    headerBg: {
        backgroundImage: `url(${headerBg})`
    }
};
const Header = () => {
    return (
        <header className="app-header">
            <div style={style.headerBg} className="header-bg">
                <div className="header-backdrop">
                    <CompanyName />
                    <h1 className="text-center">Discover Space Missions</h1>
                    <a className="fas fa-angle-down" href="#search-page"></a>
                </div>
            </div>
        </header>
    )
}

export default Header;