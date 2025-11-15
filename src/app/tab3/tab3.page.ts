import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton, IonButtons, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { LoginService } from '../services/login.service';
import { DeviceService } from '../services/device.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocationService } from '../services/location.service';
import { AppLocation } from '../interfaces/location.interface';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton],
})
export class Tab3Page implements OnInit{
  loginsservice=inject(LoginService);
  deviceService=inject(DeviceService);
  mapUrlSafe?: SafeResourceUrl;
  private sanitizer = inject(DomSanitizer);
  locations: AppLocation[] = [];

  logOut(){
    this.loginsservice.logout();
  }
  constructor(private locationService:LocationService) {
  }


  ngOnInit() {
  }
  lat=0;
  lng=0;
  async getLocationOnce() {
    try {

      const pos = await this.deviceService.getCurrentPosition();
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

      this.updateMapUrl();

    } catch (e) {
      console.error(e);
    }
  }



updateMapUrl() {
    if (this.lat && this.lng) {
      const bbox = `${this.lng - 0.01}%2C${this.lat - 0.01}%2C${this.lng + 0.01}%2C${this.lat + 0.01}`;
      const url = `https://www.google.com/maps?q=${this.lat},${this.lng}&z=15&output=embed`;
      this.mapUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      this.mapUrlSafe = undefined;
    }
  }


  async featchLocation(){
    try {

      const response =await this.locationService.featchLocation();
      this.locations=response;


    } catch (error) {
      alert("no se pudo cargar las locaciones "+error)
    }
  }
}
