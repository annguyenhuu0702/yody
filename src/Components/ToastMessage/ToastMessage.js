import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./__toastMessage.scss";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const ToastMessage = () => {
  const toastMessage = useSelector((state) => state.toast.toastMessage);
  useEffect(() => {
    if (toastMessage.text !== "") {
      toast[toastMessage.type](toastMessage.text, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  }, [toastMessage.text, toastMessage.type]);

  if (!toastMessage.isOpen) return "";
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
    />
  );
};

export default ToastMessage;
