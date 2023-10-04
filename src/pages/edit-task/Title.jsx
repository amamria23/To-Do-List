import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import { useRef } from "react";

const Title = ({ user, id, updateTitle, complet }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const inputElement = useRef(null)
  if (loading) {
    return (
      <main>
        <ReactLoading
        className="mtt"
        type={"spin"}
        color={"#3467c2"}
        height={77}
        width={77}
      />
      </main>
    );
  }
  if (error) {
    return <h1>Error</h1>;
  }
  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
          style={{textDecoration: complet? "line-through": "none"}}
          onChange={(eo) => {
            updateTitle(eo)
          }}
            defaultValue={value.data().title}
            className="title-input center"
            type="text"
            ref={inputElement}
          />
          <i onClick={() => {
            inputElement.current.focus()
          }} className="fa-regular fa-pen-to-square"></i>
        </h1>
      </section>
    );
  }
};

export default Title;
