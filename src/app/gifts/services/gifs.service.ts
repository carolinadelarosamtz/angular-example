import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SerchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey  :string='iauhY0GmOtZSxUhLS1ie9Yd0Gakpu6Df';
  private servicioUrl: string='https://api.giphy.com/v1/gifs';
  private _historial: string[]=[];

  public  resultados: Gif[]=[];

  get historial():string[]{
    return [...this._historial];
  }

  constructor(private http:HttpClient){
     this._historial=JSON.parse(localStorage.getItem('historial')! ) || [];
     this.resultados=JSON.parse(localStorage.getItem('resultado')! ) || [];
  }

  buscarGifs(query: string){
    query=query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
    this._historial.unshift(query);
    this._historial=this._historial.splice(0,10);
    localStorage.setItem('historial', JSON.stringify(this._historial));
    }

   /* fetch('https://api.giphy.com/v1/gifs/search?api_key=iauhY0GmOtZSxUhLS1ie9Yd0Gakpu6Df&limit=10&q=dragon ball')
    .then(resp=> {
      resp.json().then(data => {
        console.log(data);
      })
    })*/
    const params = new HttpParams().set('api_key', this.apiKey)
    .set('limit','10')
    .set('q',query);
    this.http.get<SerchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp)=>{
      this.resultados=resp.data;
      localStorage.setItem('resultado',JSON.stringify(this.resultados));
    })
    
  }
}
