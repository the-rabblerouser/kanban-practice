import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Task from '../components/Task';
// import styles from '../styles/Home.module.css';

const Column = ({ column: { id, title }, tasks }) => {
	return (
		<>
			<div className="container">
				<h3 className="title">{title}</h3>
				<Droppable droppableId={id}>
					{(provided, snapshot) => (
						<div
							className={`taskList ${
								snapshot.isDraggingOver ? 'backgroundT' : 'backgroundW'
							}`}
							ref={provided.innerRef}
							{...provided.droppableProps}>
							{tasks.map((task, index) => (
								<Task key={task.id} tasks={task} index={index} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
			<style jsx>{`
				.container {
					border: 1px solid lightgrey;
					border-radius: 2px;
					padding: 8px;
					margin: 8px;
				}
				.title {
					padding: 8px;
				}

				.taskList {
					padding: 8px;
				}

				.backgroundT {
					background: skyblue;
				}
				.backgroundW {
					background: white;
				}
			`}</style>
		</>
	);
};

export default Column;
