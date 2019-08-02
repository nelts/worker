import { Plugin } from '@nelts/factory';
import WorkerFactory from './index';
export default class WorkerPlugin extends Plugin<WorkerFactory> {
    constructor(app: WorkerFactory, name: string, cwd: string);
}
