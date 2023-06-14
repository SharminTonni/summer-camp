import { FaTrash } from "react-icons/fa";
import { useMyClass } from "../../../hooks/useMyClass";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { usePaidInstructor } from "../../../hooks/usePaidInstrucor";

const MyClasses = () => {
  const [myclasses, refetch] = useMyClass();
  const [axiosSecure] = useAxiosSecure();
  const [paidInstructor] = usePaidInstructor();
  const totalStudents = paidInstructor.reduce(
    (sum, item) => sum + item.students,
    0
  );
  //   console.log(myclasses);
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
      <h2 className="text-3xl text-center text-red-600">My Classes</h2>
      <h2 className="text-3xl text-center text-red-600">
        Total Enrolled Classes: {paidInstructor.length}
      </h2>
      <h2 className="text-3xl text-center text-red-600">
        Total Enrolled students: {totalStudents}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Name</th>
              <th>Seats</th>
              <th>students</th>
              <th>price</th>
              <th>status</th>
              <th>FeedBack</th>

              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myclasses.map((myclass, i) => (
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
                <td>{myclass?.availableSeats}</td>
                <td>{myclass?.students}</td>
                <td>{myclass?.price}</td>
                <td>{myclass?.status}</td>
                <td>{myclass?.feedback?.feedback}</td>

                <th>
                  <button
                    onClick={() => handleDelete(myclass)}
                    className="btn btn-ghost text-white bg-red-600"
                  >
                    <FaTrash></FaTrash>
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

export default MyClasses;
