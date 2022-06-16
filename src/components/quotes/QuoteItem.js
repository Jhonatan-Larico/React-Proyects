import { Link } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { deleteQuote } from "../../lib/api";
import classes from "./QuoteItem.module.css";
import { useHistory } from "react-router-dom";

const QuoteItem = (props) => {
  const { sendRequest, status } = useHttp(deleteQuote);
  const history = useHistory();
  useEffect(() => {
    if (status === "completed") {
      history.push("/");
    }
  }, [status]);

  const deleteHandler = () => {
    sendRequest(props.id);

    // props.deleteHandler(props.id);
  };

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.author}</p>
        </blockquote>
        <figcaption>Cantidad: {props.text}</figcaption>
      </figure>
      <Link className="btn" to={`/producto/${props.id}`}>
        Ver Detalles
      </Link>
      <button onClick={deleteHandler} className={classes.delete}>
        X
      </button>
    </li>
  );
};

export default QuoteItem;
