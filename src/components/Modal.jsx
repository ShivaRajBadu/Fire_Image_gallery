import React from "react";
import { motion } from "framer-motion";
export const Modal = ({ url, setUrl }) => {
  const handleModalClick = (event) => {
    setUrl(null);
  };
  return (
    <motion.div
      onClick={() => handleModalClick()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="modal-background ">
      <motion.img
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="modal_img"
        src={url}
        alt="modal image..."
      />
    </motion.div>
  );
};
