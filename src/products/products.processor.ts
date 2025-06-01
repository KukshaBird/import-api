import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('import-products')
export class ProductsProcessor extends WorkerHost {
  async process(job: Job<any, any, string>) {
    switch (job.name) {
      case 'store':
        console.log(job.data);
        return { test: 'return' };
      default:
        console.log('default');
        return { test: 'default' };
    }
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
