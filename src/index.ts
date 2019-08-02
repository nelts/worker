// import * as net from 'net';
import { WidgetComponent, Processer } from '@nelts/process';
import { Factory, InCommingMessage } from '@nelts/factory';
import { Worker as WorkerMessager, MessageReceiveDataOptions } from '@nelts/messager';
import WorkerPlugin from './plugin';

export default class WorkerFactory extends Factory<WorkerPlugin> implements WidgetComponent {
  private _port: number;
  private _socket: boolean;
  private _sticky: string;
  private _messager: WorkerMessager<this>;
  constructor(processer: Processer, args: InCommingMessage) {
    super(processer, args, WorkerPlugin);
    this._socket = args.socket;
    this._sticky = args.sticky;
    this._port = Number(args.port || 8080);
    this._messager = new WorkerMessager(this, args.mpid);
  }

  get messager() {
    return this._messager;
  }

  async componentWillCreate() {
    await super.componentWillCreate();
  }

  async componentDidCreated() {
    await super.componentDidCreated();
    console.log('created')
  }

  componentReceiveMessage(message: MessageReceiveDataOptions, socket?: any) {
    this._messager.receiveMessage(message, socket);
  }
}