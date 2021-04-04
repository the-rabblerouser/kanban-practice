import Head from 'next/head';
import { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import initialData from '../utils/initialData';
import styles from '../styles/Home.module.css';

const Task = ({ tasks }) => {
	return (
		<div>
			<div>
				{tasks.map(({ content }) => (
					<div className={styles.container}>{content}</div>
				))}
			</div>
		</div>
	);
};

const Column = ({ column, tasks }) => {
	console.log(tasks);
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{column[0].title}</h3>
			<div className={styles.taskList}>
				<Task tasks={tasks} />
			</div>
		</div>
	);
};

export default function Home() {
	const [data, SetData] = useState(initialData);

	const { columns, tasks } = data;

	const column = data.columnOrder.map((columnId) => columns[columnId]);
	const listTasks = column[0].taskIds.map((taskId) => tasks[taskId]);

	return (
		<div>
			<Head>
				<title>Kanban Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				<Column key={column.id} column={column} tasks={listTasks} />
			</div>
		</div>
	);
}
