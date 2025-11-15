import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonButton, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonButtons],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  loginsservice=inject(LoginService);
  constructor() {
    addIcons({ triangle, ellipse, square });
  }
  logOut(){
    this.loginsservice.logout();
  }
}
