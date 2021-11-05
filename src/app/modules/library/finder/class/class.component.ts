import { Component, OnInit } from '@angular/core';
import { ClassLanguages } from '../../_models/class-languages.enum';
import { ClassPubliek } from '../../_models/class-publiek.enum';
import { ClassSubject } from '../../_models/class-subject.enum';
import { ClassService } from '../../_services/class/class.sercice';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class FinderClassComponent implements OnInit {
  public classTalen = ClassLanguages
  public classPubliek = ClassPubliek
  public classVakken = ClassSubject


  constructor(public classService: ClassService,) { }

  ngOnInit(): void {
  }

 

}
