import React from "react";

function Modal(props: React.PropsWithChildren<{}>): JSX.Element {
  return (
    <div
      role="modal"
      className="absolute shadow-xl bg-slate-100 border border-gray-400 rounded text-center flex flex-col space-y-6 w-11/12 p-6 left-0 right-0 mx-auto top-24"
    >
      {props.children}
    </div>
  );
}

export default Modal;
