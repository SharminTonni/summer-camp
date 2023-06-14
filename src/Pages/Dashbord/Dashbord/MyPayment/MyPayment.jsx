import React, { useContext, useEffect, useState } from "react";
import { usePayment } from "../../../../hooks/usePayment";
import { AuthContext } from "../../../../Providers/AuthProvider";

const MyPayment = () => {
  const [payments] = usePayment();

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, i) => (
              <tr key={payment._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{payment.transactionId}</td>
                <td>{payment.name}</td>
                <td>{payment.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPayment;
