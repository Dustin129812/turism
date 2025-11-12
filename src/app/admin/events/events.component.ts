import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { IonText, IonCard, IonItem, IonLabel, IonInput, IonTextarea, IonDatetime, IonButton } from "@ionic/angular/standalone";
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  imports: [IonButton, IonDatetime, IonTextarea, IonInput, IonLabel, IonItem, IonCard,IonText,ReactiveFormsModule],
})
export class EventsComponent  implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  constructor(private formBuilder:FormBuilder,private eventService:EventService) { }

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
  ngOnInit() {}
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
}
