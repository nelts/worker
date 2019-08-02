import { Plugin } from '@nelts/factory';
import WorkerFactory from './index';
import { MessageSendOptions } from '@nelts/messager';

export default class WorkerPlugin extends Plugin<WorkerFactory> {
  constructor(app: WorkerFactory, name: string, cwd: string) {
    super(app, name, cwd);
  }

  get messager() {
    return this.app.messager;
  }

  send(method: string, data?: any, options?: MessageSendOptions) {
    return this.messager.send(method, data, options);
  }

  asyncSend(method: string, data?: any, options?: MessageSendOptions) {
    return this.messager.asyncSend(method, data, options);
  }

  asyncHealth() {
    return this.messager.asyncHealth();
  }
}