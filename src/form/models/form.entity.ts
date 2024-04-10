import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'form' })
export class FormEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

}