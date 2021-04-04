import React from 'react';

import Task from '../components/Task';
import styles from '../styles/Home.module.css';

const Column = ({ column, tasks }) => {
	console.log(tasks);
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{column.title}</h3>
			<div className={styles.taskList}>
				<Task tasks={tasks} />
			</div>
		</div>
	);
};

export default Column;
