import WorkerPlugin from '../plugin';
import { WorkerServiceFrameworker } from '../index';
export default function Bootstrap<T extends WorkerServiceFrameworker>(plu: WorkerPlugin<T>): Promise<void>;
