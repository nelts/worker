"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("@nelts/factory");
class WorkerPlugin extends factory_1.Plugin {
    constructor(app, name, cwd) {
        super(app, name, cwd);
    }
}
exports.default = WorkerPlugin;
