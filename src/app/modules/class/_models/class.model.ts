import { ClassDTO } from "../_dto/class-dto"

export class ClassModel {
  classID: number
  title: string
  author: string
  description: string
  public: string
  pdfUrl: string
  creationDate: Date
  language: string
  translate: string
  subjects: string
  translatedPdf: string

  constructor() {}

 
  getDto(): ClassDTO {
    const dto = new ClassDTO()
    dto.title = this.title
    dto.author = this.author
    dto.description = this.description
    dto.creationDate = this.creationDate
    dto.public = this.public
    dto.language = this.language
    dto.subjects = this.subjects
    dto.pdfUrl = this.pdfUrl
    return dto
  }
}
