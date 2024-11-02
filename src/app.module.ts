import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [UserModule, MaterialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
