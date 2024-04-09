import styles from '../app.module.css';
import { useState } from 'react';
import { useNewTodo, useLoadTodos } from '../hooks/index';
import { Link } from 'react-router-dom';

export const MainPage = ({ refreshTodos, setRefreshTodos }) => {
	const [searchTodo, setSearchTodo] = useState(null);
	const [isSort, setIsSort] = useState(false);

	const todos = useLoadTodos(refreshTodos, isSort);

	const { newTodo, onChangeNewTodo, onSubmitNewTodo } = useNewTodo(
		refreshTodos,
		setRefreshTodos,
	);

	const onChangeSearchTodo = ({ target }) => {
		setSearchTodo(target.value);
	};

	return (
		<main className={styles.todos}>
			<div className={styles.todosContainer}>
				<div className={styles.todosControls}>
					<form onSubmit={onSubmitNewTodo}>
						<input onChange={onChangeNewTodo} value={newTodo}></input>
						<button>Add todo</button>
					</form>
					<input
						onChange={onChangeSearchTodo}
						value={searchTodo}
						placeholder="Search todo"
					></input>
					<button onClick={() => setIsSort(!isSort)}>
						{isSort ? 'Unsort' : 'Sort'}
					</button>
				</div>
				{todos.length ? (
					todos.map(({ id, title }) => (
						<div
							key={id}
							className={`${styles.todo} ${searchTodo && !title.includes(searchTodo) ? styles.hide : styles.show}`}
						>
							<Link to={`task/${id}`}>
								{title.length > 15
									? title.slice(0, 15).trim() + '...'
									: title}
							</Link>
						</div>
					))
				) : (
					<span>Add some todos!</span>
				)}
			</div>
		</main>
	);
};
