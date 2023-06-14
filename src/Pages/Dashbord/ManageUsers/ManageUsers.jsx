import React, { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";
import { FaTrash, FaUserShield, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [users, refetch] = useUsers();
  const [axiosSecure] = useAxiosSecure();
  const handleDelete = (user) => {
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
        axiosSecure.delete(`/deleteuser/${user?.email}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };
  const handeleAdmin = (user) => {
    fetch(
      `https://summer-camp-server-alpha-gold.vercel.app/user/admin/${user._id}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `${user?.name} is made Admin`,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      });
  };
  const handleInstructor = (user) => {
    fetch(
      `https://summer-camp-server-alpha-gold.vercel.app/user/instructor/${user._id}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `${user?.name} is made Instructor`,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      });
  };

  return (
    <div>
      <h3 className="text-2xl text-center font-semibold mb-6">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Name</th>

              <th>email</th>
              <th>Instructor</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user?.email}</td>
                <td>{user?.name}</td>
                <td>
                  {user?.role == "instructor" ? (
                    <button
                      disabled
                      className="btn btn-ghost rounded-full text-white bg-red-600"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInstructor(user)}
                      className="btn btn-ghost rounded-full text-white bg-red-600"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  {user?.role == "admin" ? (
                    <button
                      disabled
                      className="btn btn-ghost rounded-full text-white bg-red-600"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  ) : (
                    <button
                      onClick={() => handeleAdmin(user)}
                      className="btn btn-ghost rounded-full text-white bg-red-600"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost rounded-full text-white bg-red-600"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
