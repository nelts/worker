import { WidgetComponent, Processer } from '@nelts/process';
import { Factory, InCommingMessage } from '@nelts/factory';
import { Worker as WorkerMessager, MessageReceiveDataOptions } from '@nelts/messager';
import WorkerPlugin from './plugin';
export default class WorkerFactory extends Factory<WorkerPlugin> implements WidgetComponent {
    private _port;
    private _socket;
    private _sticky;
    private _messager;
    constructor(processer: Processer, args: InCommingMessage);
    readonly messager: WorkerMessager<this>;
    componentWillCreate(): Promise<void>;
    componentDidCreated(): Promise<void>;
    componentReceiveMessage(message: MessageReceiveDataOptions, socket?: any): void;
}
