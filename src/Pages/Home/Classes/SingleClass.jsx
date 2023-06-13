import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useUsers } from "../../../hooks/useUsers";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAdmin } from "../../../hooks/useAdmin";
import { useIsInstructor } from "../../../hooks/useIsInstructor";

const SingleClass = ({ item }) => {
  //   const { user } = useContext(AuthContext);

  const { image, price, name, students, instructorName, _id } = item || "";
  const [disable, setDisable] = useState(false);
  const [isAdmin] = useAdmin();
  const [isInstructorData] = useIsInstructor();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = () => {
    if (user) {
      const savedClass = {
        classId: _id,
        student: user?.email,
        image,
        price,
        name,
        // availableSeats,
        students,
        instructorName,
      };

      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(savedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Selected class is added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login", { state: { from: location } });
              }
            });
          }
        });
    }
  };

  return (
    <div
      className={`${
        item?.availableSeats == 0
          ? "bg-red-600 card lg:card-side shadow-xl shadow-red-200"
          : "card lg:card-side shadow-xl shadow-red-200 bg-base-100"
      }`}
    >
      <figure className="">
        <img className="h-full" src={image} alt="Album" />
      </figure>
      <div className="p-6 w-1/2">
        <h2 className="card-title text-red-600">{name}</h2>
        <p>Instructor: {instructorName}</p>
        <p>Price: ${price}</p>
        <p>Students: {students}</p>
        {/* <p>Available Seats: {item?.availableSeats}</p> */}
        {isAdmin || isInstructorData || item?.availableSeats == 0 ? (
          <button
            disabled
            onClick={() => handleSelect(item)}
            className="btn text-red-600 border-b-4 border-red-600 hover:bg-slate-500 hover:text-black"
          >
            Select
          </button>
        ) : (
          <button
            disabled={disable}
            onClick={() => handleSelect(item)}
            className="btn text-red-600 border-b-4 border-red-600 hover:bg-slate-500 hover:text-black"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleClass;
