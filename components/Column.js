import React from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from '../components/Task';
// import styles from '../styles/Home.module.css';

const Column = ({ column: { id, title }, tasks, index }) => {
	return (
		<>
			<Draggable draggableId={id} index={index}>
				{(provided) => {
					return (
						<div
							className="container"
							{...provided.draggableProps}
							ref={provided.innerRef}>
							<h3 className="title" {...provided.dragHandleProps}>
								{title}
							</h3>
							<Droppable droppableId={id} type="task">
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
					);
				}}
			</Draggable>
			<style jsx>{`
				.container {
					border: 1px solid lightgrey;
					border-radius: 2px;
					padding: 8px;
					margin: 8px;
					width: 22rem;
					display: flex;
					flex-direction: column;
				}
				.title {
					padding: 8px;
				}

				.taskList {
					padding: 8px;
					flex-grow: 1;
					min-height: 100px;
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
