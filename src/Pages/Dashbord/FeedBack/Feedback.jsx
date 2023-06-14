import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Feedback = () => {
  const { id } = useParams();
  //   console.log(id);
  const [singleClass, setSingleClass] = useState();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`http://localhost:5000/feedback/${id}`)
      .then((res) => setSingleClass(res.data));
  }, [id, axiosSecure]);

  const handleFeedback = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const feedback = e.target.feedback.value;
    const feed_back = { email, feedback, name, classId: id };
    console.log(feed_back);
    axiosSecure.put("/deniedfeedback", feed_back).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Your feedback is send to the class",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    });
    axiosSecure.post("/feedback", feed_back).then((res) => {
      if (res.data.insertedId) {
        e.target.reset();
        Swal.fire({
          title: "Your feedback is send to the User",
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
    <form onSubmit={handleFeedback}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Instructor Email</span>
        </label>
        <input
          type="text"
          name="email"
          //   placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          defaultValue={singleClass?.email}
          placeholder={setSingleClass?.email}
          readOnly
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          //   placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          defaultValue={singleClass?.name}
          placeholder={setSingleClass?.name}
          readOnly
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Your Feedback</span>
        </label>
        <textarea
          name="feedback"
          className="textarea textarea-bordered h-24"
          placeholder="Bio"
        ></textarea>
      </div>
      <input type="submit" value="Send" />
    </form>
  );
};

export default Feedback;
