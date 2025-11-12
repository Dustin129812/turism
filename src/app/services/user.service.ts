import { HttpClient,HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoginService } from "./login-service";
import { firstValueFrom } from "rxjs";



@Injectable({providedIn:'root'})
export class UserService{


  private apiUrl=environment.apiUrl;

  constructor(private http:HttpClient, private loginService:LoginService){}

  async getUsers(){

    try {
      const token = await this.loginService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return await firstValueFrom(
        this.http.get<any[]>(`${this.apiUrl}/user/list`, { headers })
      );

    } catch (error) {
      alert(error)
      return error

    }

  }

}
