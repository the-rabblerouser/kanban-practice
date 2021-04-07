import { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../components/Column';
import initialData from '../utils/initialData';

export default function Home() {
	const [data, setData] = useState(initialData);

	const { columns, tasks, columnOrder } = data;

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
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
					{columnOrder.map((columnId) => {
						const column = columns[columnId];
						const tasksList = column.taskIds.map((taskId) => tasks[taskId]);

						return <Column key={column.id} column={column} tasks={tasksList} />;
					})}
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
