import Modal from "../Shared/Modal";
import ReactLoading from "react-loading";

const MainModal = ( 
  {closeModal,
  titleInput,
  detailsInput,
  addBTN,
  submitBTN,
  title1,
  subtask,
  array,
  showLoading}
) => {
  return (
    <Modal closeModal={closeModal}>
      <div style={{ textAlign: "left", overflow: "auto" }}>
        <input
          value={title1}
          onChange={(eo) => {
            titleInput(eo);
          }}
          type="text"
          placeholder="add title:"
          required
        />
        <div>
          <input
            onChange={(eo) => {
              detailsInput(eo);
            }}
            type="text"
            placeholder="details:"
            value={subtask}
          />

          <button
            onClick={(eo) => {
              addBTN(eo);
            }}
            className="btn"
          >
            add
          </button>
        </div>
        <ul>
          {array.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button
          onClick={(eo) => {
            submitBTN(eo);
          }}
          className="btn"
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={20}
              width={20}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default MainModal;
