import { WidgetComponent, Processer } from '@nelts/process';
import { Factory, InCommingMessage } from '@nelts/factory';
import { Worker as WorkerMessager, MessageReceiveDataOptions } from '@nelts/messager';
import WorkerPlugin from './plugin';
export declare class WorkerServiceFrameworker {
    constructor(app: WorkerFactory);
    componentWillCreate?(): Promise<any>;
    componentDidCreated?(): Promise<any>;
    componentWillDestroy?(): Promise<any>;
    componentDidDestroyed?(): Promise<any>;
    componentCatchError?(err: Error): void;
}
export { WorkerPlugin, };
export default class WorkerFactory extends Factory<WorkerPlugin> implements WidgetComponent {
    private _port;
    private _socket;
    private _sticky;
    private _frameworker;
    private _messager;
    constructor(processer: Processer, args: InCommingMessage);
    readonly messager: WorkerMessager<this>;
    readonly socket: boolean;
    readonly sticky: string;
    readonly port: number;
    readonly frameworker: WorkerServiceFrameworker;
    componentWillCreate(): Promise<void>;
    componentDidCreated(): Promise<void>;
    componentWillDestroy(): Promise<void>;
    componentDidDestroyed(): Promise<void>;
    componentCatchError(err: Error): void;
    componentReceiveMessage(message: MessageReceiveDataOptions, socket?: any): void;
}
