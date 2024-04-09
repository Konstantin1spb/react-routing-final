import { useNavigate } from 'react-router-dom';
export const useDeleteTodo = (setCurrentId, refreshTodos, setRefreshTodos) => {
	const navigate = useNavigate();
	const onClickDeleteTodo = (id) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo deleted:', response);
				setCurrentId(id);
				setRefreshTodos(!refreshTodos);
				navigate(-1);
			});
	};

	return onClickDeleteTodo;
};
