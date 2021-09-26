import React from "react";
import Button from "@material-ui/core/Button";

function Todo(props) {
  return (
    <li>
      <div className="todoItem">
        {/* the name is passed down from the parent and the handledelete function too */}
        <label>{props.name}</label>
        {/* the handle delete function gets the name of the task and deletes that from the list */}
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => props.handleDelete(props.id)}>
          Done
        </Button>
      </div>
    </li>
  );
}

export default Todo;
