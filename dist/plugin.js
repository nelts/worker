"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("@nelts/factory");
class WorkerPlugin extends factory_1.Plugin {
    constructor(app, name, cwd) {
        super(app, name, cwd);
    }
    get messager() {
        return this.app.messager;
    }
    send(method, data, options) {
        return this.messager.send(method, data, options);
    }
    asyncSend(method, data, options) {
        return this.messager.asyncSend(method, data, options);
    }
    asyncHealth() {
        return this.messager.asyncHealth();
    }
}
exports.default = WorkerPlugin;
