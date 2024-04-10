import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'form_value' })
export class FormValueEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    formId: number;

    @Column('json')
    formData: Record<string, any>;

}