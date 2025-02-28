import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailQueueProcessor } from './mail-queue.processor';
import { MailQueueService } from './mail-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mailQueue',
    }),
  ],
  providers: [MailQueueProcessor, MailQueueService],
  exports: [MailQueueService],
})
export class MailQueueModule {}
