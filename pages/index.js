import next from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';

import Column from '../components/Column';
import initialData from '../utils/initialData';

export default function Home() {
	const [data, setData] = useState(initialData);

	const { columns, tasks, columnOrder } = data;

	const onDragEnd = () => {};

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

// *************************
// Don't know why, but this code fixes the error:
// Warning: Prop `data-rbd-draggable-context-id` did not match. Server: "1" Client: "0" div
// Some issue with react-beautiful-dnd and next.js
// *************************

export const getServerSideProps = async ({ query }) => {
	resetServerContext(); // <-- CALL RESET SERVER SIDE

	return { props: { data: [] } };
};
