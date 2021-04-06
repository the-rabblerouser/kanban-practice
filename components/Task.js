import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

// import styles from '../styles/Home.module.css';

const Task = ({ tasks: { id, content }, index }) => {
	return (
		<>
			<Draggable draggableId={id} index={index}>
				{(provided, snapshot) => (
					<div
						className={`container ${
							snapshot.isDragging ? 'backgroundR' : 'backgroundW'
						}`}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}>
						{content}
					</div>
				)}
			</Draggable>
			<style jsx>{`
				.container {
					border: 1px solid lightgrey;
					border-radius: 2px;
					padding: 8px;
					margin: 8px;
				}

				.backgroundR {
					background: lightgreen;
				}

				.backgroundW {
					background: white;
				}
			`}</style>
		</>
	);
};

export default Task;
