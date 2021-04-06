import next from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';

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
		const column = data.columns[source.droppableId];

		const newTaskIds = [...column.taskIds];

		// removes item from array
		newTaskIds.splice(source.index, 1);
		// starts from destination.index, removes nothing, and adds item to new location
		newTaskIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
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
	};

	return (
		<>
			<Head>
				<title>Kanban Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<DragDropContext onDragEnd={onDragEnd}>
				{columnOrder.map((columnId) => {
					const column = columns[columnId];
					const tasksList = column.taskIds.map((taskId) => tasks[taskId]);

					return <Column key={column.id} column={column} tasks={tasksList} />;
				})}
			</DragDropContext>
		</>
	);
}

/* 
The resetServerContext function should be used when server side rendering (SSR). 
It ensures context state does not persist across multiple renders on the server which would 
result in client/server markup mismatches after multiple requests are rendered on the server.

Use it before calling the server side render method

 fixes the error:
 Warning: Prop `data-rbd-draggable-context-id` did not match. Server: "1" Client: "0" div
*/

// export const getServerSideProps = async ({ query }) => {
// 	resetServerContext(); // <-- CALL RESET SERVER SIDE

// 	return { props: { data: [] } };
// };
