import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormEntity } from '../models/form.entity';
import { FormFieldEntity } from '../models/formfield.entity';
import { FormValueEntity } from '../models/formvalue.entity';
import { Repository } from 'typeorm';
import { Form } from '../models/form.interface';
import { validate, ValidationError } from 'class-validator';
import { ValidationFactory } from '../validation.factory/validation.factory';

@Injectable()
export class FormService {

    constructor(
        @InjectRepository(FormEntity) private readonly formRepository: Repository<FormEntity>,
        @InjectRepository(FormFieldEntity) private readonly formFieldRepository: Repository<FormFieldEntity>,
        @InjectRepository(FormValueEntity) private readonly formValueRepository: Repository<FormValueEntity>,
    ) {}

    async create(form: Form) {
        
        const title = form.title;
        if(title == undefined) {
            return 'Wrong Detail';
        }
        const f = new FormEntity();
        f.title = title;
        const savedForm = await this.formRepository.save(form);
        delete form.title;
        let formFields=[];
        Object.entries(form).forEach(([field]) => {
            const formField = new FormFieldEntity();
            formField.formId = savedForm.id;
            formField.fieldName = field;
            formField.fieldType = form[field];
            formFields.push(formField);
        });
        
        await this.formFieldRepository.save(formFields);
    
        return { message: 'Form created successfully' };
    }

    async fill(title: string, formData: any) {
        const form = await this.findFormByTitle(title);
        if(title == undefined && !form) {
            return 'Wrong Detail';
        }
        const formId = form.id;
        const formFiends = await this.formFieldRepository.find({where:{formId: formId}});
        await this.validateFields(formFiends, formData);
        const formValue = new FormValueEntity();
        formValue.formId  = formId;
        formValue.formData = formData
        await this.formValueRepository.save(formValue);
        return { message: 'Form filled successfully' };

    }

    async validateFields(formFiends, formData) {
        let errors: ValidationError[] = [];
        for(const field of formFiends){
            if (formData[field.fieldName]) {
                const value = formData[field.fieldName];
                const  validateObj = ValidationFactory.createValidateObj(field.fieldType);
                validateObj.field = value;
                errors = await validate(validateObj);
            } else {
                return 'Missing required field';
            }
        }
    }

    async getFormValues(title: string) {
        if(title == undefined) {
            return 'Wrong Detail';
        }
        const form = await this.findFormByTitle(title);
        return this.formValueRepository.find({where:{formId: form.id}});
    }

    findFormByTitle(title: string) {
        return this.formRepository.findOne({where:{title}})
    }

}
