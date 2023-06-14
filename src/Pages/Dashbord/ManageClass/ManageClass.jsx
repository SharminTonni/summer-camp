import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { useClassesAdmin } from "../../../hooks/useClassesAdmin";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";

const ManageClass = () => {
  const [classesAdmin, refetch] = useClassesAdmin();
  const [axiosSecure] = useAxiosSecure();

  // const [deny, setDeny] = useState(false);
  const handleDeny = (myclass) => {
    axiosSecure.put(`/class/deny/${myclass._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `${myclass?.name} is denied to be added`,
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
  const handleApproved = (myclass) => {
    axiosSecure.put(`/class/approve/${myclass._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `${myclass?.name} is Approved to be added`,
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
  const handleDelete = (myclass) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      refetch();
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteclass/${myclass._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl text-center text-red-600">
        ----------Manage All Classes----------
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Deny</th>
              <th>Approve</th>
              <th>Feedback</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {classesAdmin.map((myclass, i) => (
              <tr key={myclass._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={myclass?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{myclass?.name}</td>
                <td>{myclass?.instructorName}</td>
                <td>{myclass?.email}</td>

                <td>
                  {myclass?.status == "deny" ||
                  myclass?.status == "approved" ? (
                    <button
                      disabled
                      className="btn btn-ghost rounded-full text-white bg-red-600"
                    >
                      X
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeny(myclass)}
                      className="btn btn-ghost rounded-full text-white bg-red-600"
                    >
                      X
                    </button>
                  )}
                </td>

                <td>
                  {myclass?.status == "approved" ||
                  myclass?.status == "deny" ? (
                    <button
                      disabled
                      className="btn btn-ghost rounded-full text-white bg-red-600"
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApproved(myclass)}
                      className="btn btn-ghost rounded-full text-white bg-amber-600"
                    >
                      Approved
                    </button>
                  )}
                </td>

                {myclass.status == "deny" ? (
                  <th>
                    <Link to={`/dashboard/feedback/${myclass._id}`}>
                      <button className="btn btn-ghost text-white bg-amber-600">
                        FeedBack
                      </button>
                    </Link>
                  </th>
                ) : (
                  <th>
                    <Link to={`/dashboard/feedback/${myclass._id}`}>
                      <button
                        disabled
                        className="btn btn-ghost text-white bg-amber-600"
                      >
                        FeedBack
                      </button>
                    </Link>
                  </th>
                )}
                <th>
                  <button
                    onClick={() => handleDelete(myclass)}
                    className="btn btn-ghost text-white bg-red-600"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClass;
