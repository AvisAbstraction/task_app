import React, { useState, useEffect, useContext } from "react";
import { Navbar, ListItems } from "../components";
import { Container, TextField, Grid, Button } from "@material-ui/core";
import Axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { API_URL, USER_ID } from "../config";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { LEAD_ID } from "../config";
import moment from "moment";

export const Home = (props) => {
  const [state, setState] = useState({
    todos: [],
    addTodoToggle: false,
    editTodoToggle: false,
    todoName: "",
    todoId: null,
    todoDate: null,
    todoTime: null,
  });
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const authData = useContext(AuthContext);
  const { token } = authData;

  const handleLogout = (e) => {
    localStorage.clear("token");
    props.history.push("/");
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleEdit = (e, todo) => {
    debugger;
    setState({
      ...state,
      editTodoToggle: true,
      addTodoToggle: false,
      todoName: todo.task_msg,
      todoId: todo.id,
      todoDate: new Date(todo.task_date),
      todoTime: todo.task_time,
    });
    setSelectedDate(todo.task_date);
  };

  const updateTodo = (e) => {
    debugger;
    e.preventDefault();
    Axios.put(
      `${API_URL}/task/${LEAD_ID}/${state.todoId}`,
      {
        assigned_user: USER_ID,
        task_msg: state.todoName,
        task_date: selectedDate,
        task_time: moment(selectedDate).format("LT"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        // const updated_todo = state.todos.map((todo) => {
        let array = state.todos;

        let array2 = array.map((a) => {
          var returnValue = { ...a };

          if (a.id == state.todoId) {
            debugger;
            returnValue.task_msg = state.todoName;
          }
          return returnValue;
        });
        setState({ ...state, todos: array2, todoName: "" });
        setSelectedDate(new Date());
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const handleDelete = (e, todoId) => {
    Axios.delete(`${API_URL}/task/${LEAD_ID}/${todoId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        const updatedTodos = state.todos.filter((todo) => {
          return todo.id !== todoId;
        });
        setState({ ...state, todos: updatedTodos });
        console.log(data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const handleAddTodoToggle = (e) => {
    setState({
      ...state,
      addTodoToggle: !state.addTodoToggle,
      editTodoToggle: false,
    });
  };
  const handleAddTodo = (e) => {
    e.preventDefault();
    Axios.post(
      `${API_URL}/task/${LEAD_ID}`,
      {
        assigned_user: USER_ID,
        task_msg: state.todoName,
        task_date: selectedDate,
        task_time: moment(selectedDate).format("LT"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        setState({
          ...state,
          todos: [...state.todos, res.data.results],
          todoName: "",
        });
        setSelectedDate(new Date());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Axios.get(`${API_URL}/task/${LEAD_ID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const { results } = res.data;
        setState({ ...state, todos: results });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <Container>
        <Grid container justify="center" style={{ paddingTop: 20 }}>
          <Grid item xs={7} style={{ textAlign: "right", marginBottom: 20 }}>
            <Button
              type="submit"
              onClick={(e) => handleAddTodoToggle(e)}
              color="secondary"
              variant="contained"
            >
              Toggle Fields
            </Button>
          </Grid>
          {state.addTodoToggle && (
            <Grid item xs={7}>
              <Grid container justify="center" spacing={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item md={4} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      margin="dense"
                      label="Enter Task Name"
                      name="todoName"
                      value={state.todoName}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <KeyboardDatePicker
                      fullWidth
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="dd/MM/yyyy"
                      inputVariant="outlined"
                      margin="dense"
                      value={selectedDate}
                      name="task_date"
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <KeyboardTimePicker
                      name="task_time"
                      fullWidth
                      margin="dense"
                      id="time-picker"
                      label="Time picker"
                      inputVariant="outlined"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid
                item
                xs={12}
                style={{ textAlign: "center", paddingTop: 20 }}
              >
                <Button
                  type="submit"
                  onClick={(e) => handleAddTodo(e)}
                  color="secondary"
                  variant="contained"
                >
                  Add Todo
                </Button>
              </Grid>
            </Grid>
          )}
          {state.editTodoToggle && (
            <Grid item xs={7}>
              <Grid container justify="center" spacing={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item md={4} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      margin="dense"
                      label="Enter Task Name"
                      name="todoName"
                      value={state.todoName}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <KeyboardDatePicker
                      fullWidth
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="dd/MM/yyyy"
                      inputVariant="outlined"
                      margin="dense"
                      value={new Date(selectedDate)}
                      name="task_date"
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <KeyboardTimePicker
                      name="task_time"
                      fullWidth
                      margin="dense"
                      id="time-picker"
                      label="Time picker"
                      inputVariant="outlined"
                      value={new Date(selectedDate)}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  onClick={(e) => updateTodo(e)}
                  color="secondary"
                  variant="contained"
                >
                  Update Todo
                </Button>
              </Grid>
            </Grid>
          )}

          <Grid item xs={8}>
            <ListItems
              todos={state.todos}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              location={true}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
