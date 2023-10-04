import { Helmet } from "react-helmet-async";

//functionto close modal
const Modal = ({ closeModal, children, BGcolor="whitesmoke" }) => {
  return (
    <div className="parent-modal">
      <Helmet>
        <style type="text/css">
          {`.modal {
  position: fixed;
  background-color: ${BGcolor};
  width: 400px;
  height: 333px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  text-align: left;
  transition: all 1s;         
  scale: 1;
  transform: translateY(0);
  animation: mymove 0.9s 1 ;
}
.parent-modal {
  background-color: rgba(0, 0, 0, 0.493);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
@keyframes mymove {
  0%{
    scale: 0;
  transform: translateY(-100vh);
  }
  100%{
    scale: 1;
  transform: translateY(0);
  }
}

.close {
  position: absolute;
  top: 12px;
  right: 17px;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  color: black;
}
.close:hover {
  font-weight: bolder;
  font-size: 27px;
  color: red;
}

.home .modal ul li {
  color: #333;
  font-size: 17px;
  list-style: circle inside;
}


.modal p {
  margin-top: 25px;
  color: #1b1b1b;
          }`}
        </style>
      </Helmet>
      <form className="modal">
        <div
          onClick={() => {
            closeModal();
          }}
          className="close"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        {children}
      </form>
    </div>
  );
};

export default Modal;
