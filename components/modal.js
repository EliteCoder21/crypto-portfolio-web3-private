import React from "react";
import Popup from "reactjs-popup";

export default function Modal() {
  return (
    <Popup
        trigger={<button className="button"> Open Modal </button>}
        modal
        nested
    >
        {close => (
        <div className="modal">
            <button className="close" onClick={close}>
                &times;
            </button>
            <div className="header"> Modal Title </div>
            <div className="content">
            {" "}
            Popup window dialogue
            <br />
            Popup window dialogue
            </div>
            <div className="actions">
            <Popup
                trigger={<button className="button"> Trigger </button>}
                position="top center"
                nested
            >
                <span>
                    Popup window dialogue
                </span>
            </Popup>
            <button
                className="button"
                onClick={() => {
                console.log("modal closed");
                close();
                }}
            >
                Close modal
            </button>
            </div>
        </div>
        )}
    </Popup>
  );
}