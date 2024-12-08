import { useReducer, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import "./App.css";

interface AddAction {
  type: "add";
  newTask: string;
}

interface DeleteAction {
  type: "delete";
  index: number;
}

type ActionInterface = AddAction | DeleteAction;

const reducer = (state: string[], action: ActionInterface) => {
  switch (action.type) {
    case "add":
      return [...state, action.newTask];

    case "delete":
      return state.filter((_: string, index: number) => index !== action.index);

    default:
      return state;
  }
};

const initialState: string[] = [];

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (task.length > 0) {
      dispatch({ type: "add", newTask: task });
      setTask("");
    } else {
      alert("You can't add an empty task");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleDelete = (index: number) => {
    dispatch({ type: "delete", index: index });
  };

  const taskItems = state.map((task: string, index: number) => {
    return (
      <li className="Task-Item" key={index} onClick={() => handleDelete(index)}>
        {task}
      </li>
    );
  });

  return (
    <div className="Todo-Container">
      <h1 className="App-Title">To-do List</h1>
      <form className="NewTask-Form" onSubmit={handleSubmit}>
        <input
          className="NewTask-Input"
          type="text"
          placeholder="Task"
          value={task}
          onChange={handleChange}
        />
        <button className="NewTask-Submit" type="submit">
          <GrFormAdd color="white" fontSize="1.5rem" />
        </button>
      </form>
      {state.length > 0 && <ul className="Task-List">{taskItems}</ul>}
    </div>
  );
};

export default App;
