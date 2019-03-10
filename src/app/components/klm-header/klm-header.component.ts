import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'klm-header',
  templateUrl: './klm-header.component.html',
  styleUrls: ['./klm-header.component.css']
})
export class KlmHeaderComponent implements OnInit {

  @Input() public title: string;

  constructor() { }

  ngOnInit() {
  }

}
