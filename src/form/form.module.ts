import { Module } from '@nestjs/common';
import { FormService } from './service/form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './models/form.entity';
import { FormValueEntity } from './models/formvalue.entity';
import { FormFieldEntity } from './models/formfield.entity';
import { FormController } from './controller/form.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormEntity, FormValueEntity, FormFieldEntity]),
  ],
  providers: [FormService],
  controllers: [FormController]
})
export class FormModule {}

