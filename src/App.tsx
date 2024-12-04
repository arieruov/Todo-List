import { useReducer, useState } from "react";
import "./App.css";

const reducer = (
	state: string[],
	action: { type: string; newTask: string }
) => {
	switch (action.type) {
		case "add":
			return [...state, action.newTask];

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

	const taskItems = state.map((task, index) => {
		return <li key={index}>{task}</li>;
	});

	return (
		<div>
			<h1>Todo List</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Task"
					value={task}
					onChange={handleChange}
				/>
				<button type="submit">Add</button>
			</form>
			{state.length > 0 && <ul>{taskItems}</ul>}
		</div>
	);
};

export default App;
