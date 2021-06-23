import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const url = configService.get('RABBITMQ_URL');
    const queue = configService.get('QUEUE');

    console.log(url);
    console.log(queue);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [`${url}`],
            queue: queue,
            queueOptions: {
                durable: true,
            },
        },
    });

    app.startAllMicroservices();
}
bootstrap();
