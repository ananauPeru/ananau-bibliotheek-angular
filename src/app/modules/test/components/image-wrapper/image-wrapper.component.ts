import { Component, OnInit, Input } from '@angular/core';
import { FileUtil } from 'src/app/_utils/file_util';

@Component({
  selector: 'app-image-wrapper',
  templateUrl: './image-wrapper.component.html',
  styleUrls: ['./image-wrapper.component.scss']
})
export class ImageWrapperComponent implements OnInit {
  @Input() src: string;
  @Input() height = 200;

  constructor(public fileUtil: FileUtil) { }

  ngOnInit() { }
}