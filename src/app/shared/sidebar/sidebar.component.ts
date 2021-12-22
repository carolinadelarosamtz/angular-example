import { Component } from '@angular/core';

import { SharedModule } from '../shared.module';
import { GifsService } from '../../gifts/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

  get historial():string[]{
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { }

  buscar(query : string){
    this.gifsService.buscarGifs(query);
  }

}
