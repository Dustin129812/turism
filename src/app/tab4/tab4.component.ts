import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
  imports: [IonHeader, IonContent,IonToolbar,IonTitle],
})
export class Tab4Component  implements OnInit {

  constructor() { }

  ngOnInit() {}
  

}
