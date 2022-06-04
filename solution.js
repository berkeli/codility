import TaskRunner from './TaskRunner.js';

export default (req, res, next) => {
    try {
        res.send([0, 1]);
    } catch (e) {
        next(e);
    }
}