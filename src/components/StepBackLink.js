import styles from '../app.module.css';
import { Link, useNavigate } from 'react-router-dom';

export const StepBackLink = () => {
	const navigate = useNavigate();

	const onClickNavigate = () => {
		navigate(-1);
	};
	return (
		<Link onClick={onClickNavigate} className={styles.leftArrowLink}>
			<span>&larr;</span>
		</Link>
	);
};
