import { Plugin } from '@nelts/factory';
import WorkerFactory from './index';
import { MessageSendOptions } from '@nelts/messager';
export default class WorkerPlugin extends Plugin<WorkerFactory> {
    constructor(app: WorkerFactory, name: string, cwd: string);
    readonly messager: import("@nelts/messager").Worker<WorkerFactory>;
    send(method: string, data?: any, options?: MessageSendOptions): number;
    asyncSend(method: string, data?: any, options?: MessageSendOptions): Promise<any>;
    asyncHealth(): Promise<any>;
}
