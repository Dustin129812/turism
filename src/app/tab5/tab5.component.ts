import { Component, OnInit } from '@angular/core';
import { IonTitle, IonToolbar, IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.component.html',
  styleUrls: ['./tab5.component.scss'],
  imports: [IonHeader,IonToolbar,IonTitle],
})
export class Tab5Component  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
