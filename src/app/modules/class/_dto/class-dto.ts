export class ClassDTO {
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

    getRequestModel() {
      return {
        title: this.title,
        author: this.author,
        description: this.description,
        createdAt: this.creationDate,
        public: this.public,
        language: this.language,
        subjects: this.subjects,
        pdfUrl: this.pdfUrl
    }
  }
}