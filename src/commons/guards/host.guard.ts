import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HostGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const origin = [
      'http://localhost:9000',
      'http://localhost:9001',
      'http://localhost:9200',
      'https://app.motowork.xyz',
      'http://testbanner.test',
      'http://admin.motowork.xyz/',
      'https://admin.motowork.xyz',
      'http://app.motowork.xyz',
      'https://app.motowork.xyz',
      'https://motowork.xyz',
      'http://motowork.xyz',
    ];

    const { headers } = context.switchToHttp().getRequest();
    if (!origin.includes(headers.origin)) {
      throw new UnauthorizedException(
        'No puedes acceder a este recurso desde ese host',
      );
    }
    return true
  }
}
