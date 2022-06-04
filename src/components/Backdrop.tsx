import React from "react";
import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
};

const Backdrop: React.FC<Props> = ({ onClick }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-30"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ></motion.div>
  );
};

export default Backdrop;
