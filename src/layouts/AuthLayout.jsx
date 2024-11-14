
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div>
            AuthLayOut 
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;