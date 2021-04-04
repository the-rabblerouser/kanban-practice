import React from 'react';

import styles from '../styles/Home.module.css';

const Task = ({ tasks }) => {
	return (
		<div>
			<div>
				{tasks.map(({ content }) => (
					<div className={styles.container}>{content}</div>
				))}
			</div>
		</div>
	);
};

export default Task;
