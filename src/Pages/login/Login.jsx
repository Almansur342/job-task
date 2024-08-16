import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../router/authProvider/AuthProvider";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import log from '../../assets/login.json'

// import 'animate.css';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'


const Login = () => {

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors },} = useForm();
  const { signIn, googleLogin,githubLogin } = useContext(AuthContext);

  const onSubmit = data =>{
    const {email,password} = data;
    console.log(email,password);
    signIn(email, password)
      .then(result => {
        Swal.fire({
          title: 'success',
          text: 'User Logged in successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        console.log(result.user);
        navigate(location?.state ? location.state : '/')
      })

      .catch(error => {
        Toast.fire({
          icon: 'error',
          title: 'password is not matching',
        })
        console.error(error);

      })

  }
  // const handleSignIn = e => {
  //   e.preventDefault();
  //   const form = new FormData(e.currentTarget);
  //   const email = form.get('email');
  //   const password = form.get('password');
  //   console.log(email, password);
  //   signIn(email, password)
  //     .then(result => {
  //       toast.success("Login successfully");
  //       console.log(result.user);
  //       navigate(location?.state ? location.state : '/')
  //       // navigate after login
  //       // navigate(location?.state ? location.state : '/')
  //     })

  //     .catch(error => {
  //       toast.error("Email or password is not matched");
  //       console.error(error);

  //     })
  // }


  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        Swal.fire({
          title: 'success',
          text: 'User created successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        navigate(location?.state ? location.state : '/')
      })

      .catch(error => {
        console.error(error);
      })
  }
  const handleGithubLogin = () => {
    githubLogin()
      .then(result => {
        Swal.fire({
          title: 'success',
          text: 'User created successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        console.log(result.user);
        navigate(location?.state ? location.state : '/')
      })

      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div className="bg-white flex max-w-md md:max-w-5xl lg:max-w-7xl p-1 md:p-10 lg:p-10">
      <Lottie className="w-[300px]" animationData={log}></Lottie>
      <div className="bg-white shadow-md border w-4/5 md:w-4/5 lg:w-2/5 mx-auto p-3 lg:p-9 my-5">
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3 rounded">
        <h1 className="text-2xl lg:text-3xl  font-semibold text-center uppercase">Login</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base">Email:</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered"
           {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="form-control relative">
            <label className="label">
              <span className="label-text font-semibold text-base">Password:</span>
            </label>
            <input
             type={showPassword ? "text" : "password"}
              placeholder="password"
               name="password" 
               className="input input-bordered"
               {...register("password", { required: true })}
               />
            <span className="absolute bottom-3 right-4 text-xl" onClick={()=> setShowPassword(!showPassword)}>{
              showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
            }</span>
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
        <div className="form-control">
          <button className="btn mt-6 bg-[#b18b5e] text-white text-base lg:text-lg mb-3 uppercase">Sign In</button>
        </div>
        <Link className="flex justify-center" to="/register">New here? <span className="text-[#b18b5e] ml-1">Create an account</span></Link>
        <div className="divider">OR</div>
      </form>
      <div className="justify-around flex gap-1 lg:gap-5">
        <button onClick={handleGoogleLogin} className="shadow-lg lg:shadow-2xl bg-[#23BE0A] text-white px-2 lg:px-6 rounded flex items-center gap-2 text-base lg:text-lg font-semibold py-1 lg:py-2"><FcGoogle />Google</button>
        <button onClick={handleGithubLogin} className="shadow-lg lg:shadow-2xl bg-[#23BE0A] text-white px-2 lg:px-6 rounded flex items-center gap-2 text-base lg:text-lg font-semibold py-1 lg:py-2"><FaGithub />
          Github</button>
      </div>
      </div>
      
    </div>
  );
};

export default Login;