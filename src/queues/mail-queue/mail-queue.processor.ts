import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';
import { envs } from 'src/config';

@Processor('mailQueue')
export class MailQueueProcessor {
  logger = new Logger();
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.smtp_host,
      port: envs.smtp_port,
      secure: envs.smtp_secure,
      auth: {
        user: envs.smtp_user,
        pass: envs.smtp_pass,
      },
    });
  }

  @Process('sendMail')
  async handleSendMail(job: Job) {
    const { email, subject, content } = job.data;

    await this.transporter.sendMail({
      from: `"Tu App" <${envs.smtp_user}>`,
      to: email,
      subject: subject,
      text: content,
      html: `<p>${content}</p>`,
    });

    this.logger.log(`Correo de confirmación de agenda enviado a: ${email}`);
  }
}
