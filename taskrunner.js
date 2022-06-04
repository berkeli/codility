class TaskRunnerClass {
    _tasks = [
        {
            id: 'id1',
            delay: 100
        },
        {
            id: 'id2',
            delay: 200
        },
        {
            id: 'id3',
            delay: 300
        },
        {
            id: 'id4',
            delay: 400
        },
        {
            id: 'id5',
            delay: 500
        },
        {
            id: 'id6',
            delay: 600
        }
    ] 
    async runTask (id) {
        const task = this._tasks.find(task => task.id === id);
        if (!task) {
            throw new Error('Task not found');
        }
        await new Promise(resolve => setTimeout(resolve, task.delay));
    }
    hasTask(id) {
        return this._tasks.some(task => task.id === id);
    }
}

const TaskRunner = new TaskRunnerClass();

export default TaskRunner;