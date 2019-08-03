import { Plugin } from '@nelts/factory';
import WorkerFactory, { WorkerServiceFrameworker } from './index';
import { MessageSendOptions } from '@nelts/messager';

export default class WorkerPlugin<T extends WorkerServiceFrameworker> extends Plugin<WorkerFactory<T>> {
  constructor(app: WorkerFactory<T>, name: string, cwd: string) {
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