import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Item } from '../models/item.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  @Input() item: Item;
  @Input() itemAanHetLaden: Boolean;

  constructor() {
    
  }

  downloadQrCode() {  // Create new img element
    var qrCode = document.getElementById('qr').children[0].children[0].getAttribute('src');
    saveAs(qrCode, "image.png");
  }

  ngOnInit() {
  }

}

