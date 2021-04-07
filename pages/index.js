import { useState } from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from '../components/Column';
import initialData from '../utils/initialData';

export default function Home() {
	const [data, setData] = useState(initialData);

	const { columns, tasks, columnOrder } = data;

	const onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = [...columnOrder];
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...data,
				columnOrder: newColumnOrder,
			};

			setData(newState);
			return;
		}

		const start = data.columns[source.droppableId];
		const finish = data.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = [...start.taskIds];

			// removes item from array
			newTaskIds.splice(source.index, 1);
			// starts from destination.index, removes nothing, and adds item to new location
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newState = {
				...data,
				columns: {
					...columns,
					[newColumn.id]: newColumn,
				},
			};

			setData(newState);
		}

		const startTaskIds = [...start.taskIds];

		startTaskIds.splice(source.index, 1);

		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = [...finish.taskIds];
		finishTaskIds.splice(destination.index, 0, draggableId);

		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const newState = {
			...data,
			columns: {
				...columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};

		setData(newState);
	};

	return (
		<>
			<div className="container">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable
						droppableId="all-columns"
						direction="horizontal"
						type="column">
						{(provided) => {
							return (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="container">
									{columnOrder.map((columnId, index) => {
										const column = columns[columnId];
										const tasksList = column.taskIds.map(
											(taskId) => tasks[taskId]
										);

										return (
											<Column
												key={column.id}
												column={column}
												tasks={tasksList}
												index={index}
											/>
										);
									})}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>
				</DragDropContext>
			</div>
			<style jsx>{`
				.container {
					width: 100vw;
					display: flex;
					justify-content: center;
				}
			`}</style>
		</>
	);
}
