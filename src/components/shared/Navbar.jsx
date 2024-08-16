import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/filterFlex.jpg';
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../router/authProvider/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const {user,logOut} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () =>{
    logOut()
    .then(result => {
      console.log(result.user);
      navigate('/');
    })
    .catch(error =>{
      console.error(error);
    })
  }

  const navLink = <div className="flex items-center">
    <li className="!bg-white text-lg"><NavLink to='/' className={({ isActive }) => isActive ? 'border !bg-white border-green-600 text-[#b18b5e] ' : 'text-[#131313CC]'}>Home</NavLink></li>

    <li className="!bg-white text-lg"><NavLink to='/updateProfile' className={({ isActive }) => isActive ? 'border !bg-white border-green-600 text-[#b18b5e]  ' : 'text-[#131313CC]'}>Update Profile</NavLink></li>

    { user && <>
      <li className="text-lg"><NavLink to='/contactUs' className={({ isActive }) => isActive ? 'border border-green-600 text-[#b18b5e]' : 'text-[#131313CC]'}>Contact Us</NavLink></li>
    </>}
  </div>
  return (
    <div className="navbar bg-base-100 max-w-6xl mx-auto mt-5">
      <Helmet>
        <title>Real Estate|Navbar</title>
      </Helmet>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLink}
          </ul>
        </div>
        <div className="flex items-center">
        <img className="w-12" src={logo} alt="" />
          <a className="btn btn-ghost text-xl lg:text-3xl font-bold">FilterFlex</a>
          
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        {user ?
         <div className="">
          <Link to='/'>
            <button onClick={handleLogOut} className="px-2 lg:px-6 font-semibold text-xs lg:text-xl text-white bg-[#b18b5e] py-1 lg:py-2 rounded">Sign out</button>
          </Link>
        </div> : 
        <div>
          <Link to='/login'>
            <button className="px-2 lg:px-6 font-semibold text-base lg:text-xl text-white bg-[#b18b5e] py-1 lg:py-2 rounded">Login</button>
          </Link>
        </div>
        }
      </div>
    </div>
  );
};

export default Navbar;