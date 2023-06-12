import React, { useState } from "react";
import { motion } from "framer-motion";
const MotionCompo = () => {
  const [isOpenOne, setOpenOne] = useState(false);
  const [isOpenTwo, setOpenTwo] = useState(false);
  const [isOpenThree, setOpenThree] = useState(false);
  return (
    <div className="mt-24 mb-36 lg:flex justify-around items-center gap-6">
      <motion.div
        transition={{ layout: { duration: 1 } }}
        layout
        onClick={() => setOpenOne(!isOpenOne)}
        className="py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500  rounded-2xl drop-shadow-xl shadow-red-200"
      >
        <motion.h2 layout="position" className="font-serif font-bold">
          <b>Location</b>
        </motion.h2>
        {isOpenOne && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-56"
          >
            <p>
              <address>Address: 7QVP+HM4, Chattogram</address>
              Phone: +8801622332233
            </p>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        transition={{ layout: { duration: 1 } }}
        layout
        onClick={() => setOpenTwo(!isOpenTwo)}
        className="py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500  rounded-2xl drop-shadow-xl shadow-red-200"
      >
        <motion.h2 layout="position" className="font-serif font-bold">
          <b>Schedule</b>
        </motion.h2>
        {isOpenTwo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-56"
          >
            <p>
              <span> Winter Session: From December to February</span>
              <span> Spring Session: From February to April</span>
              <span> Summer Session: From April to June</span>
            </p>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        transition={{ layout: { duration: 1 } }}
        layout
        onClick={() => setOpenThree(!isOpenThree)}
        className="py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500  rounded-2xl drop-shadow-xl shadow-red-200"
      >
        <motion.h2 layout="position" className="font-serif font-bold">
          <b>Courses</b>
        </motion.h2>
        {isOpenThree && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-56"
          >
            <p>
              <span>Indian Classic Music</span>
              <span>Rabindra Sangeet</span>
              <span>Nazrul Geeti</span>
              <span>Baoul Sangeet</span>
              <span>Beena Music</span>
              <span>Bollywood Music</span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MotionCompo;
