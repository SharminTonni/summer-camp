import React from "react";
import { useFeedback } from "../../../hooks/useFeedback";

const FeedBackPage = () => {
  const [feedbacks] = useFeedback();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Name</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {feedbacks.map((feedback, i) => (
            <tr key={feedback._id}>
              <th>{i + 1}</th>
              <td>{feedback?.email}</td>
              <td>{feedback?.name}</td>
              <td>{feedback?.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedBackPage;
