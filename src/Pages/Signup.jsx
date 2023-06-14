import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./Socail/SocialLogin";

const Signup = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [btnDisable, setBtnDisable] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
    createUser(data.email, data.password)
      .then((result) => {
        const createduser = result.user;
        console.log(createduser);
        updateUser(data.name, data.photo)
          .then(() => {
            const savedUser = {
              name: data.name,
              email: data.email,
              photo: data.photo,
            };
            fetch("https://summer-camp-server-alpha-gold.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  navigate("/");
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User is created successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="hero min-h-screen p-6 bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">SignUp now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="url"
                {...register("photo", { required: true })}
                placeholder="PhotoURL"
                className="input input-bordered"
              />
              {errors.photo && (
                <span className="text-red-600">Photo is required</span>
              )}
            </div>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  min: 6,
                  //   max: 20,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                })}
                placeholder="password"
                className="input input-bordered"
              />
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
                  one uppercase and one special character is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  min: 6,
                  //   max: 20,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                })}
                placeholder="password"
                className="input input-bordered"
              />
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
                  one uppercase and one special character is allowed
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                disabled={btnDisable}
                type="submit"
                className="btn btn-success btn-outline"
                value="Sign Up"
              />
            </div>
          </form>
          <SocialLogin></SocialLogin>
          <p className="pb-4">
            Already Have an Account? <Link to="/login">Please Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
