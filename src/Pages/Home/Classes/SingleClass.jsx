import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useUsers } from "../../../hooks/useUsers";

const SingleClass = ({ item }) => {
  //   const { user } = useContext(AuthContext);
  const { image, price, name, availableSeats, students, instructorName } = item;
  const [disable, setDisable] = useState(false);
  const [users] = useUsers();

  console.log(users);

  const handleSelect = () => {};
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="">
        <img className="h-full" src={image} alt="Album" />
      </figure>
      <div className="p-6 w-1/2">
        <h2 className="card-title text-amber-600">{name}</h2>
        <p>Instructor: {instructorName}</p>
        <p>Price: ${price}</p>
        <p>Students: {students}</p>
        <p>Available Seats: {availableSeats}</p>
        <button
          disabled={disable}
          onClick={handleSelect}
          className="btn text-amber-600 border-b-4 border-amber-600 hover:bg-amber-600 hover:text-black"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default SingleClass;
