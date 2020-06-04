import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Checkbox,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: 25,
  },
  mainContainer: {
    minHeight: "100vh",
  },
}));

export const ListItems = ({
  todos,
  handleComplete,
  handleDelete,
  handleEdit,
  location,
}) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <Typography
        variant="h6"
        style={{ textAlign: "center", marginBottom: 10 }}
      >
        All Todos
      </Typography>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              dense
              button
              style={{
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: !location ? "orangeRed" : "",
                color: !location ? "white" : "",
              }}
            >
              <ListItemText color="secondary" style={{ marginBottom: 10 }}>
                {todo.task_msg}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={(e) => handleEdit(e, todo)}>
                  <i
                    className="fa fa-edit"
                    aria-hidden="true"
                    style={{ fontSize: "20px", margin: "auto" }}
                  ></i>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={(e) => handleDelete(e, todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
  );
};
