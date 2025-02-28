import { Job } from 'bull';
import * as fs from 'fs';
import * as path from 'path';
import { envs } from 'src/config';
import * as mustache from 'mustache';
import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Process, Processor } from '@nestjs/bull';
@Processor('mailQueue')
export class MailQueueProcessor {
  logger = new Logger();
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.smtp_host,
      port: envs.smtp_port,
      secure: false,
      auth: {
        user: envs.smtp_user,
        pass: envs.smtp_pass,
      },
    });
  }

  @Process('sendMail')
  async handleSendMail(job: Job) {
    // get content from jobs
    const { email, subject, content } = job.data;
    try {
      // prepare template
      const templatePath = path.join(`${process.cwd()}/src/queues/templates/mail.template.html`);
      const template = fs.readFileSync(templatePath, 'utf8');

      // Renderizar la plantilla con Mustache
      const htmlContent = mustache.render(template, {
        reference: content._id,
        firstName: content.client.name,
        lastName: content.client.lastName,
        email: content.client.email,
        dni: content.client.dni,
        phone: content.client.phone,
        vehicle_dni: content.vehicle_dni,
        vehicle_type: content.vehicle_type,
        vehicle_km: content.vehicle_km,
        complement: content.complement,
        date: content.date.split('T').shift(),
        hour: content.hour,
        hour_type: content.hourType,
        url_confirmation: `${envs.app_url}/servicio-tecnico/validacion`,
      });

      // send mail
      await this.transporter.sendMail({
        from: `${envs.motowork_email}`,
        to: email,
        subject: subject,
        html: htmlContent,
      });
      this.logger.log(`Correo de confirmación de agenda enviado a: ${email}`);
    } catch (error) {
      this.logger.error(`Error enviando el correo: ${JSON.stringify(error)}`);
    }
  }
}
