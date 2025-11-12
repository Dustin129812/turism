import { Component, OnInit } from '@angular/core';
import { IonButtons, IonButton, IonContent, IonToolbar, IonTitle, IonHeader, IonModal, IonCard, IonCardContent } from "@ionic/angular/standalone";
import { LocationsComponent } from "../locations/locations.component";
import { EventsComponent } from "../events/events.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [IonModal, IonHeader, IonTitle, IonToolbar, IonContent, IonButtons, IonButton, LocationsComponent, EventsComponent, IonCard, IonCardContent],
})
export class DashboardComponent  implements OnInit {
modalLocation=false;
modalEvent=false;
  constructor() { }
setOpenLocation(isOpen: boolean) {
    this.modalLocation = isOpen;
  }
setOpenEvent(isOpen: boolean) {
    this.modalEvent = isOpen;
  }
  ngOnInit() {}

}
