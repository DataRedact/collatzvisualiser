import React, { useRef, useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default forwardRef(function Modal({ errorNum, errorType }, ref) {
  const modal = useRef();
  let [negativeModal, setNegativeModal] = useState(false);
  let willRun = true


  useEffect(() => {

    if (localStorage.getItem('RUN')) {
      willRun = false
    }
    return () => { // cleanup
      setNegativeModal(false)
    }
  }, [])

  useImperativeHandle(ref, () => {
    return {
      open(eType) {
        if (eType == 'negative') {
          localStorage.setItem('RUN', true)
          setNegativeModal(true)
        }
        modal.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={modal}>
      {negativeModal ? <p>The number {errorNum} is invalid! Please use a different number.</p> : <p>Note: the algorithm has been changed to 3x + 1 for negative numbers, all of which will end in a pattern of -4,-2,-1. <br /><b>this modal will not show again</b></p>}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
