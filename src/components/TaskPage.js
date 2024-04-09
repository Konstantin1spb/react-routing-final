import { useState } from 'react';
import styles from '../app.module.css';
import { useEditedTodo, useDeleteTodo } from '../hooks';
import { useParams } from 'react-router-dom';
import { StepBackLink } from '../components/index';
import { useLoadTodoById } from '../hooks/useLoadTodoById';

export const TaskPage = ({ refreshTodos, setRefreshTodos }) => {
	const [currentId, setCurrentId] = useState();
	const params = useParams();

	const [todo, setTodo] = useLoadTodoById(params.id);

	const {
		editedTodo,
		onClickOpenToEditTodo,
		onChangeEditedTodo,
		onSubmitEditedTodo,
		openModal,
		editedTodoError,
	} = useEditedTodo(refreshTodos, setRefreshTodos, currentId, setCurrentId);

	const onClickDeleteTodo = useDeleteTodo(setCurrentId, refreshTodos, setRefreshTodos);

	const handleSubmitEditedTodo = async (event) => {
		const response = await onSubmitEditedTodo(event);
		setTodo(response);
		console.log('RESPONSE', response);
	};

	if (!todo) {
		return null;
	}
	return (
		<>
			<StepBackLink />
			<div
				className={`${styles.todosContainer} ${openModal ? styles.blured : null}`}
			>
				<div className={styles.todo}>
					{todo.title}
					<div>
						<span
							className={styles.editButton}
							onClick={() => onClickOpenToEditTodo(todo.id)}
						></span>
						<span
							className={styles.deleteButton}
							onClick={() => onClickDeleteTodo(todo.id)}
						></span>
					</div>
				</div>
			</div>
			<form
				onSubmit={handleSubmitEditedTodo}
				className={`${styles.editTodoForm} ${openModal ? styles.active : null}`}
			>
				{editedTodoError && <div className={styles.error}>{editedTodoError}</div>}
				<input onChange={onChangeEditedTodo} value={editedTodo}></input>
				<button disabled={!!editedTodoError}>Edit todo</button>
			</form>
		</>
	);
};
