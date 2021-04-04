import Head from 'next/head';
import { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../components/Column';
import initialData from '../utils/initialData';

export default function Home() {
	const [data, setData] = useState(initialData);

	const { columns, tasks } = data;
	return (
		<>
			<Head>
				<title>Kanban Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				{data.columnOrder.map((columnID) => {
					const column = columns[columnID];
					const tasksList = column.taskIds.map((taskId) => tasks[taskId]);

					return <Column key={column.id} column={column} tasks={tasksList} />;
				})}
			</div>
		</>
	);
}
