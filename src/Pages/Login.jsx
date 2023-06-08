import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "./Socail/SocialLogin";

const Login = () => {
  const { signinUser } = useContext(AuthContext);
  const [passwordShow, setPasswordShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    signinUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User is Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card p-10 mt-6 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={passwordShow ? "text" : "password"}
                {...register("password", {
                  required: true,
                  min: 6,
                  //   max: 20,
                  pattern: /[^A-Z!@#$%^&*()]$/,
                })}
                placeholder="password"
                className="input input-bordered"
              />
              <span
                className="absolute top-14 right-5"
                onClick={() => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? (
                  <FaRegEye></FaRegEye>
                ) : (
                  <FaRegEyeSlash></FaRegEyeSlash>
                )}
              </span>

              {errors.password?.type === "required" && (
                <span className="text-red-600">Password is required</span>
              )}
              {errors.password?.type === "min" && (
                <span className="text-red-600">
                  min 6 character is required
                </span>
              )}
              {/* {errors.password?.type === "max" && (
                <span>max 20 character is required</span>
              )} */}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  no uppercase and no special charater is allowed
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-success btn-outline"
                value="Log in"
              />
            </div>
          </form>
          <hr />
          <SocialLogin></SocialLogin>
          <p className="pb-5 text-center">
            Donot have an Acoount? <Link to="/signup">Please signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
