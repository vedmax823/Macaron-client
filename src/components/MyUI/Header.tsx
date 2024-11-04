import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import apiProtected from '@/http/apiProtected';

const Header = () => {
    const user = useAuthStore((state => state.user));
    const removeUser = useAuthStore(state => state.removeUser);
    const clearToken = useAuthStore(store => store.clearToken);
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await apiProtected.post("/api/auth/logout"); 
    
        removeUser();        
        clearToken();       
        navigate("/login"); 
      } catch (err) {
        console.log("Logout failed:", err);
      }
    };
    return (
        <div className="bg-pink-300">
          <header className="flex justify-between items-center bg-white bg-opacity-70 p-6 shadow-lg">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                Don Macaron
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg text-gray-700">{user?.login}</span>
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Logout
              </button>
            </div>
          </header>
        </div>
      );
};

export default Header;