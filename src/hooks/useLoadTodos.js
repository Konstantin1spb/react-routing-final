import { useEffect } from 'react';
import { useState } from 'react';
import { sortByTitle } from '../utils/sortByTitle';

export const useLoadTodos = (refreshTodos, isSort) => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				if (isSort) {
					const sortedTodos = loadedTodos.sort(sortByTitle);
					setTodos(sortedTodos);
				} else {
					setTodos(loadedTodos);
				}
			});
	}, [refreshTodos, isSort]);

	return todos;
};
