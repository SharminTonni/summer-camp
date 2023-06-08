import React from "react";

const SingleInstructor = ({ instructor }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl shadow-red-200">
      <figure>
        <img
          className="h-[200px] w-[200px]"
          src={instructor.photo}
          alt="Album"
        />
      </figure>
      <div className="card-body flex items-center justify-center">
        <h2 className="card-title">Instructor: {instructor.name}</h2>
        <h2 className="card-title">Email: {instructor.email}</h2>
      </div>
    </div>
  );
};

export default SingleInstructor;
