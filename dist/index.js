"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("@nelts/factory");
const messager_1 = require("@nelts/messager");
const plugin_1 = require("./plugin");
class WorkerFactory extends factory_1.Factory {
    constructor(processer, args) {
        super(processer, args, plugin_1.default);
        this._socket = args.socket;
        this._sticky = args.sticky;
        this._port = Number(args.port || 8080);
        this._messager = new messager_1.Worker(this, args.mpid);
    }
    get messager() {
        return this._messager;
    }
    async componentWillCreate() {
        await super.componentWillCreate();
    }
    async componentDidCreated() {
        await super.componentDidCreated();
        console.log('created');
    }
    componentReceiveMessage(message, socket) {
        this.messager.receiveMessage(message, socket);
    }
}
exports.default = WorkerFactory;
