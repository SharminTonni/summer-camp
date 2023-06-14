import React, { useCallback, useContext, useEffect, useState } from "react";

import { usePaidClass } from "../../../hooks/usePaidClass";

const MyEnrolledClass = () => {
  const [paidClasses] = usePaidClass();

  return (
    <div>
      <div className="mx-auto text-center my-6">
        <h3 className="text-red-600 text-3xl font-bold">My Enrolled Class</h3>
      </div>
      {paidClasses.map((paidClass) => (
        <div key={paidClass._id} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body flex gap-4">
            <h2 className="card-title">{paidClass?.name}</h2>
            <p>Price: {paidClass?.price}</p>
          </div>
          <figure>
            <img src={paidClass?.image} alt="Shoes" />
          </figure>
        </div>
      ))}
    </div>
  );
};

export default MyEnrolledClass;
