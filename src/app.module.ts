import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootModule } from './common/root.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [RootModule, OrdersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
