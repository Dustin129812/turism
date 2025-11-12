import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton, IonButtons, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { LoginService } from '../services/login-service';
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
      this.featchLocation();
    } catch (e) {
      console.error(e);
    }
  }

mapUrlsSafe: SafeResourceUrl[] = [];

updateMapUrl() {
  this.mapUrlsSafe = [];

  if (this.locations && this.locations.length > 0) {
    this.mapUrlsSafe = this.locations
      .filter(loc => loc.latitude && loc.longitude)
      .map(loc => {
        const url = `https://staticmap.openstreetmap.de/staticmap.php?center=${loc.latitude},${loc.longitude}&zoom=14&size=600x400&markers=${loc.latitude},${loc.longitude},red-pushpin`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
  } else if (this.lat && this.lng) {
    const url = `https://staticmap.openstreetmap.de/staticmap.php?center=${this.lat},${this.lng}&zoom=14&size=600x400&markers=${this.lat},${this.lng},blue-pushpin`;
    this.mapUrlsSafe = [this.sanitizer.bypassSecurityTrustResourceUrl(url)];
  }
}

  async featchLocation(){
    try {

      const response =await this.locationService.featchLocation();
      this.locations=response;
      this.updateMapUrl();

    } catch (error) {
      alert("no se pudo cargar las locaciones "+error)
    }
  }
}
