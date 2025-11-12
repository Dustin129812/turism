import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LoginService } from "./login-service";
import { firstValueFrom } from "rxjs";
import { AppLocation } from "../interfaces/location.interface";

@Injectable({providedIn:'root'})
export class LocationService{
    private apiUrl=`${environment.apiUrl}/location`;

    constructor(private http:HttpClient,private router: Router,private loginService:LoginService){}

    async featchLocation(){
      const token = await this.loginService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      try {
        const response=await firstValueFrom(this.http.get<AppLocation[]>(`${this.apiUrl}/list`,{headers}))
              return response

            }catch(err){

            alert("Error al traer los eventos " + err);
            throw err
      }
    }

    async addLocation(data:any){
    const token = await this.loginService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      try {
        const response=await firstValueFrom(this.http.post(`${this.apiUrl}/add`,data,{headers}))
        return response

      } catch (err) {

        return alert("no se registro la locacion "+err)
      }
  }

  }
