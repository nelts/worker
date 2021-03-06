"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("@nelts/factory");
const messager_1 = require("@nelts/messager");
const utils_1 = require("@nelts/utils");
const plugin_1 = require("./plugin");
exports.WorkerPlugin = plugin_1.default;
const bootstrap_1 = require("./compilers/bootstrap");
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
    startJob(name, options) {
        return this.messager.asyncSend('event:put:job', name, options);
    }
    stopJob(name, options) {
        return this.messager.asyncSend('event:delete:job', name, options);
    }
    async componentWillCreate() {
        await super.componentWillCreate();
        if (!this.configs.workerServiceFrameworker)
            throw new Error('cannot find the workerServiceFrameworker');
        const frameworker = typeof this.configs.workerServiceFrameworker === 'string'
            ? utils_1.RequireModuleDefault(this.configs.workerServiceFrameworker)
            : this.configs.workerServiceFrameworker;
        this._frameworker = new frameworker(this);
        if (this._frameworker.componentWillCreate) {
            await this._frameworker.componentWillCreate();
        }
        this.compiler.addCompiler(bootstrap_1.default);
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
    componentCatchError(err) {
        if (this._frameworker.componentCatchError) {
            this._frameworker.componentCatchError(err);
        }
        this.logger.error(err);
    }
    componentReceiveMessage(message, socket) {
        this.messager.receiveMessage(message, socket);
    }
}
exports.default = WorkerFactory;
