import React from "react";

const Toast = ({ message }: { message: string }) => {
  return <div className="toast">{message}</div>;
};

export default Toast;
