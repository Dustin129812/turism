import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginService } from "./login.service";
import { AppEvent } from "../interfaces/event.interface";

@Injectable({providedIn:'root'})
export class EventService{
  private apiUrl=`${environment.apiUrl}/event`;

  constructor(private http:HttpClient,private router: Router,private loginService:LoginService){}

  async featchEvent(){
    const token = await this.loginService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

    try{
      const response=await firstValueFrom(this.http.get<AppEvent[]>(`${this.apiUrl}/list`,{headers}))
      return response

    }catch(err){

      alert("Error al traer los eventos " + err);
      throw err
    }
  }


  async addEvent(data:any){
    const token = await this.loginService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      try {
        const response=await firstValueFrom(this.http.post(`${this.apiUrl}/add`,data,{headers}))
        return response

      } catch (err) {

        return alert("no se registro el evento"+err)
      }
  }
}
