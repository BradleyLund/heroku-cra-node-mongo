import React from "react";
import Button from "@material-ui/core/Button";

function Form(props) {
  return (
    // all the functions which have the parent component as this get passed down to this component

    <form onSubmit={props.handleSubmit}>
      <div id="inputFormDiv">
        {/* onChange has the function from the parent component app.js which receives the event onchange of the input */}
        {/* the value of the input is received from the state. and handlechange function is bounded in the parent component and passed down */}
        <input
          type="text"
          id="todoInput"
          name="text"
          value={props.input}
          onChange={props.handleChange}
        />
        <Button color="primary" variant="contained" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}

export default Form;
