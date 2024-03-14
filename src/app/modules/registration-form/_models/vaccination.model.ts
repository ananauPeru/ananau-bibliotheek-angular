export class VaccinationModel{
    id: number
    name: string
    required: boolean

    constructor(id: number, name:string, required:boolean) {
        this.id = id;
        this.name = name;
        this.required = required;
    }
}