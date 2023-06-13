import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useClass } from "../../../hooks/useClass";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const imageToken = import.meta.env.VITE_IMAGE_TOKEN;
const AddClass = () => {
  const [students, setStudents] = useState("");
  const { user } = useContext(AuthContext);
  const url = `https://api.imgbb.com/1/upload?key=${imageToken}`;
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgURL = imgRes.data.display_url;
          const {
            price,
            image,
            name,
            instructorName,
            availableSeats,
            email,
            students,
          } = data;
          const classItem = {
            price: parseFloat(price),
            students: parseFloat(students),
            image: imgURL,
            name,
            instructorName,
            availableSeats: parseFloat(availableSeats),
            email,
            status: "pending",
            // students:
          };
          axiosSecure.post("/allclasses", classItem).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                title: "Your Class is pending",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
              navigate("/dashboard/myclass");
            }
          });
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl text-center text-red-600">
        ----------Add a Class here----------
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control w-full mt-12"
      >
        <div className="lg:flex items-center gap-6">
          <div>
            <label className="label">
              <span className="label-text">Instructor name</span>
            </label>
            <input
              type="text"
              {...register("instructorName", { required: true })}
              defaultValue={user?.displayName}
              placeholder="Type here"
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Instructor Email</span>
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              defaultValue={user?.email}
              placeholder="Type here"
              className="input input-bordered w-full"
              readOnly
            />
          </div>
        </div>
        <div className="lg:flex items-center">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text-alt">Class Name</span>
            </label>
            <select
              defaultValue="Pick one"
              {...register("name", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Pick one</option>
              <option>Indian Classic Music</option>
              <option>Rabindra Sangeet</option>
              <option>Nazrul Geeti</option>
              <option>Baoul Sangeet</option>
              <option>Beena Music</option>
              <option>Bollywood Music</option>
            </select>
          </div>
        </div>
        <div className="lg:flex items-center gap-6">
          <div>
            <label className="label">
              <span className="label-text">Class Image</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered file-input-error w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Class Price</span>
            </label>
            <input
              {...register("price", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Available Seats</span>
          </label>
          <input
            {...register("availableSeats", { required: true })}
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Students</span>
          </label>
          <input
            {...register("students", { required: true })}
            type="number"
            defaultValue="0"
            // placeholder="Type here"
            className="input input-bordered w-full"
            readOnly
          />
        </div>
        <div className="">
          <input
            type="submit"
            className="btn mt-4 bg-red-400"
            value="Add Class"
          />
        </div>
      </form>
    </div>
  );
};

export default AddClass;
