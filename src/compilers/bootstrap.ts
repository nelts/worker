import * as path from 'path';
import WorkerPlugin from '../plugin';
import * as globby from 'globby';
import { RequireDefault } from '@nelts/utils';
import { WorkerServiceFrameworker } from '../index';
export default async function Bootstrap<T extends WorkerServiceFrameworker>(plu: WorkerPlugin<T>) {
  const cwd = plu.source;
  const files = await globby([ 
    'worker.ts', 
    'worker.js', 
    '!worker.d.ts' 
  ], { cwd });
  if (files.length) {
    const file = path.resolve(cwd, files[0]);
    const callback = RequireDefault<(plu: WorkerPlugin<T>) => Promise<any>>(file);
    if (typeof callback === 'function') {
      await callback(plu);
    }
  }
}