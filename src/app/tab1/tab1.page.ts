import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonModal } from '@ionic/angular/standalone';
import { Tab4Component } from "../tab4/tab4.component";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonModal, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, Tab4Component],
})
export class Tab1Page {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor() {}
}
