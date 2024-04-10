import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; 
import { FormModule } from './form/form.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: "10.102.32.196",
  port: 3306,
  username: 'development',
  password: 'Admin@123',
  database: 'nest_assesment_sunny',
  autoLoadEntities: true,
  synchronize: true,
}

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(ormOptions),
    FormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
