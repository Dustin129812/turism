import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { IonText, IonCard, IonItem, IonLabel, IonTextarea, IonDatetime, IonButton , IonSelectOption, IonCardHeader, IonContent, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { ReactiveFormsModule } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { AppLocation } from 'src/app/interfaces/location.interface';
import { DeviceService } from 'src/app/services/device.service';
import { SavedPhoto } from 'src/app/interfaces/photo.interface';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  imports: [IonCol, IonRow, IonGrid, IonIcon, IonCardContent, IonCardTitle, IonCardSubtitle, IonContent, IonCardHeader, IonButton, IonDatetime, IonTextarea, IonLabel, IonItem, IonCard,IonText,ReactiveFormsModule,IonSelectOption],
})
export class EventsComponent  implements OnInit {
  private device = inject(DeviceService);
  @Output() closeModal = new EventEmitter<void>();
  locations: AppLocation[] = [];
  loadingPhoto = false;


  constructor(private formBuilder:FormBuilder,private eventService:EventService,private locationService:LocationService) {
    this.featchLocation();
  }

  newEvent=this.formBuilder.group({
    location:[null,[Validators.required]],
    description:[null,[Validators.required]],
    date:[null,[Validators.required]],
    startHour:[null,[Validators.required]],
    endHour:[null,[Validators.required]]
  })

  get location(){
    return this.newEvent.controls["location"];
  }
  get description(){
    return this.newEvent.controls["description"];
  }
  get date(){
    return this.newEvent.controls["date"];
  }
  get startHour(){
    return this.newEvent.controls["startHour"];
  }
  get endHour(){
    return this.newEvent.controls["endHour"];
  }
  async ngOnInit() {
    this.photos = await this.device.loadAllPhotos();
  }
  async onSubmit(){
    if(this.newEvent.valid){
      try {
        await this.eventService.addEvent(this.newEvent.value)
        alert("exito al guardar evento")
        this.closeModal.emit();
      } catch (err) {
        alert(err)
      }
    }
  }

  photos: SavedPhoto[] = [];

  async featchLocation(){
  try {

    const response =await this.locationService.featchLocation();
    this.locations=response;


  } catch (error) {
    alert("no se pudo cargar las locaciones "+error)
  }

  }
  async deletePhoto(p: SavedPhoto) {
    await this.device.deletePhoto(p.fileName);

    this.photos = this.photos.filter(x => x.fileName !== p.fileName);
  }

  async onTakePhoto() {
    try {
      this.loadingPhoto = true;
      const photo = await this.device.takePhoto();
      const saved = await this.device.savePhoto(photo);
      this.photos = [saved, ...this.photos];
    } catch (e) {
      console.error(e);
    } finally {
      this.loadingPhoto = false;
    }
  }
}
