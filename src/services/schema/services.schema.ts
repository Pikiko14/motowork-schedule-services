import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  @Prop({ required: true })
  hour: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 'A.m.' })
  hourType: string;

  @Prop({ type: Object, required: true })
  client: {
    name: string;
    lastName: string;
    email: string;
    dni: string;
    phone: string;
  };

  @Prop()
  vehicle_dni?: string;

  @Prop()
  vehicle_type?: string;

  @Prop()
  vehicle_km?: string;

  @Prop()
  complement?: string;

  @Prop({ default: 'Muy fácil' })
  level_to_schedule: string;

  @Prop({
    type: String,
    enum: ['pendiente', 'confirmada', 'aceptada', 'completada', 'rechazada'],
    default: 'pendiente',
  })
  status: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
