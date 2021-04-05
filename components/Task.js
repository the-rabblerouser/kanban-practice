import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import styles from '../styles/Home.module.css';

const Task = ({ tasks: { id, content }, index }) => {
	return (
		<>
			<Draggable draggableId={id} index={index}>
				{(provided) => (
					<div
						className={styles.container}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}>
						{content}
					</div>
				)}
			</Draggable>
		</>
	);
};

export default Task;
