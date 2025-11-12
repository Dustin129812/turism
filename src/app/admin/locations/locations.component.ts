import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonCard, IonItem, IonLabel, IonInput, IonText, IonButton } from "@ionic/angular/standalone";
import { ReactiveFormsModule } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  imports: [IonButton, IonText, IonInput, IonLabel, IonItem, IonCard, ReactiveFormsModule],
})
export class LocationsComponent  implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  constructor(private formBuilder:FormBuilder,private locationService:LocationService) { }

  newLocation=this.formBuilder.group({
    latitude:[null,[Validators.required]],
    longitude:[null,[Validators.required]],
    name:[null,[Validators.required]]
  })

  get latitude(){
    return this.newLocation.controls["latitude"];
  }
  get longitude(){
    return this.newLocation.controls["longitude"];
  }
  get name(){
    return this.newLocation.controls["name"];
  }
  ngOnInit() {}

  async onSubmit(){
    try {
      await this.locationService.addLocation(this.newLocation.value);
      alert("exito al agregar locacion")
      this.closeModal.emit();
    } catch (err) {
      alert(err)
      this.closeModal.emit();
    }
  }

}
