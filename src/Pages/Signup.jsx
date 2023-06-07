import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const createduser = result.user;
        console.log(createduser);
        updateUser(data.name, data.photo)
          .then(() => {
            reset();
          })
          .catch((err) => console.log(err));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User is created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="hero min-h-screen bg-base-200">
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
                  pattern: /[^A-Z!@#$%^&*()]$/,
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
                  no uppercase and no special charater is allowed
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-success btn-outline"
                value="Sign Up"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
