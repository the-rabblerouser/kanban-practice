import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Task from '../components/Task';
import styles from '../styles/Home.module.css';

const Column = ({ column: { id, title }, tasks }) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{title}</h3>
			<Droppable droppableId={id}>
				{(provided, snapshot) => (
					<div
						className={styles.taskList}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{tasks.map((task, index) => (
							<Task
								key={task.id}
								tasks={task}
								index={index}
								isDragging={snapshot.isDragging}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Column;
