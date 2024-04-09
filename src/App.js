import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage, TaskPage, NotFoundPage } from './components/index';

const App = () => {
	const [refreshTodos, setRefreshTodos] = useState(false);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<MainPage
						refreshTodos={refreshTodos}
						setRefreshTodos={setRefreshTodos}
					/>
				}
			/>
			<Route
				path="/task/:id"
				element={
					<TaskPage
						refreshTodos={refreshTodos}
						setRefreshTodos={setRefreshTodos}
					/>
				}
			/>
			<Route path="/404" element={<NotFoundPage />}></Route>
			<Route path="*" element={<Navigate to="/404" />}></Route>
		</Routes>
	);
};

export default App;
