import { useEffect } from 'react';
import { useState } from 'react';

export const useLoadTodoById = (id) => {
	const [todo, setTodo] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				const findedTodo = loadedTodos.find((item) => item.id === Number(id));
				setTodo(findedTodo);
			});
	}, [id]);

	return [todo, setTodo];
};
