import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

const { REDIS_HOST, REDIS_PORT } = process.env;

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: REDIS_HOST ?? 'localhost',
        port: REDIS_PORT && parseInt(REDIS_PORT) ? parseInt(REDIS_PORT) : 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'import-products',
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
