import classes from './HighlightedQuote.module.css';

const HighlightedQuote = (props) => {
  return (
    <div className={classes.quote}>
      <img src={props.img} />
      <p className={classes.product}>{props.author}</p>
      <p className={classes.amount} >Cantidad: {props.text}</p>
    </div>
  );
};

export default HighlightedQuote;
