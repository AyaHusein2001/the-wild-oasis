import {  useEffect, useRef } from "react";

const useOutSideClick = (handler, listenCapturing) => {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      //this to check that click is not inside the modal
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("click outside");
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);
    return () => document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler,listenCapturing]);

  return ref;
};

export default useOutSideClick;