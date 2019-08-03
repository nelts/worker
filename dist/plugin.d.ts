import { Plugin } from '@nelts/factory';
import WorkerFactory, { WorkerServiceFrameworker } from './index';
import { MessageSendOptions } from '@nelts/messager';
export default class WorkerPlugin<T extends WorkerServiceFrameworker> extends Plugin<WorkerFactory<T>> {
    constructor(app: WorkerFactory<T>, name: string, cwd: string);
    readonly messager: import("@nelts/messager").Worker<WorkerFactory<T>>;
    send(method: string, data?: any, options?: MessageSendOptions): number;
    asyncSend(method: string, data?: any, options?: MessageSendOptions): Promise<any>;
    asyncHealth(): Promise<any>;
}
