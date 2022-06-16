import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import { app } from "../../fb";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here
    console.log(fileUrl);
    props.onAddQuote({
      author: enteredAuthor,
      text: enteredText,
      url: fileUrl,
    });
  }

  const finishEnteringHandler = (e) => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const fileSelectHandler = async (e) => {
    //firestone
    setIsUploading(true);
    const storageRef = app.storage().ref();
    const filePath = storageRef.child(e.target.files[0].name);
    await filePath.put(e.target.files[0]);
    console.log("loaded file", e.target.files[0].name);
    const url = await filePath.getDownloadURL();
    setFileUrl(url);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Estas seguro que quieres salir? Toda la información se perdera!"
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Producto</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Cantidad</label>
            <input id="text" rows="5" type="number" ref={textInputRef}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="img" >Imagen</label>
            <input
              id="img"
              rows="5"
              type="file"
              onChange={fileSelectHandler}
            ></input>
          </div>

          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Agregar
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
