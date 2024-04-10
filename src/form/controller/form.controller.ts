import { Controller, Post, Body, Get, Put, Param, Query, Delete } from '@nestjs/common';
import { FormService } from '../service/form.service';
import { Form } from '../models/form.interface';
import { FormFields } from '../models/formfield.interface';
import { FormValues } from '../models/formvalue.interface';

@Controller('form')
export class FormController {

    constructor(private formService: FormService) {}

    @Post('create')
    create(@Body() body) {
        return this.formService.create(body);
    }

    @Post('fill')
    update(@Query('form_title') title: string, @Body() body:any) {
        console.log(title);
        return this.formService.fill(title, body);
    }

    @Get('fill')
    getForms(@Query('form_title') title:string) {
        return this.formService.getFormValues(title);
    }

}
