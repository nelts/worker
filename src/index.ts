// import * as net from 'net';
import { WidgetComponent, Processer } from '@nelts/process';
import { Factory, InCommingMessage } from '@nelts/factory';
import { Worker as WorkerMessager, MessageReceiveDataOptions } from '@nelts/messager';
import { RequireDefault } from '@nelts/utils';
import WorkerPlugin from './plugin';

export declare class WorkerServiceFrameworker {
  constructor(app: WorkerFactory);
  componentWillCreate?(): Promise<any>;
  componentDidCreated?(): Promise<any>;
  componentWillDestroy?(): Promise<any>;
  componentDidDestroyed?(): Promise<any>;
  componentCatchError?(err: Error): void;
}

export {
  WorkerPlugin,
}

export default class WorkerFactory extends Factory<WorkerPlugin> implements WidgetComponent {
  private _port: number;
  private _socket: boolean;
  private _sticky: string;
  private _frameworker: WorkerServiceFrameworker;
  private _messager: WorkerMessager<this>;
  constructor(processer: Processer, args: InCommingMessage) {
    super(processer, args, WorkerPlugin);
    this._socket = args.socket;
    this._sticky = args.sticky;
    this._port = Number(args.port || 8080);
    this._messager = new WorkerMessager(this, args.mpid);
    if (!this.configs.workerServiceFrameworker) throw new Error('cannot find the workerServiceFrameworker');
    const frameworker: { new(app: WorkerFactory): WorkerServiceFrameworker } = typeof this.configs.workerServiceFrameworker === 'string' 
      ? RequireDefault<WorkerServiceFrameworker>(this.configs.workerServiceFrameworker) 
      : this.configs.workerServiceFrameworker;
    this._frameworker = new frameworker(this);
  }

  get messager() {
    return this._messager;
  }

  get socket() {
    return this._socket;
  }

  get sticky() {
    return this._sticky;
  }

  get port() {
    return this._port;
  }

  get frameworker() {
    return this._frameworker;
  }

  async componentWillCreate() {
    await super.componentWillCreate();
    if (this._frameworker.componentWillCreate) {
      await this._frameworker.componentWillCreate();
    }
  }

  async componentDidCreated() {
    await super.componentDidCreated();
    if (this._frameworker.componentDidCreated) {
      await this._frameworker.componentDidCreated();
    }
  }

  async componentWillDestroy() {
    if (this._frameworker.componentWillDestroy) {
      await this._frameworker.componentWillDestroy();
    }
  }
  async componentDidDestroyed() {
    if (this._frameworker.componentDidDestroyed) {
      await this._frameworker.componentDidDestroyed();
    }
  }
  componentCatchError(err: Error) {
    if (this._frameworker.componentCatchError) {
      this._frameworker.componentCatchError(err);
    }
    this.logger.error(err);
  }

  componentReceiveMessage(message: MessageReceiveDataOptions, socket?: any) {
    this.messager.receiveMessage(message, socket);
  }
}