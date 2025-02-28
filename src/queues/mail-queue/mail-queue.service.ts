import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class MailQueueService {
  constructor(@InjectQueue('mailQueue') private readonly mailQueue: Queue) {}

  async sendMail(email: string, subject: string, content: Service) {
    await this.mailQueue.add('sendMail', {
      email,
      subject,
      content,
    });
  }
}
