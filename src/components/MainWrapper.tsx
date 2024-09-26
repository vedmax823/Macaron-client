import { Outlet } from 'react-router-dom';
import Header from './MyUI/Header';
import SideMenu from './MyUI/NavigationMenu';


const MainWrapper = () => {

    return (
        <div>
            <Header />
            <div className='w-full flex p-1'>
                <div className='w-1/6 border-gray-100 border'>
                    <SideMenu />
                </div>
                <div className='w-5/6'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainWrapper;