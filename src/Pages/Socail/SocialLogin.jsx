import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handeleGoogleLogin = () => {
    googleSignin()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        const savedUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photo: loggedUser.photoURL,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate("/");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User is created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      onClick={handeleGoogleLogin}
      className="btn btn-circle text-center mx-auto mt-3"
    >
      <FaGoogle></FaGoogle>
    </button>
  );
};

export default SocialLogin;
