import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddUser, IPlayer } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http : HttpClient) { }

  getAllPlayers(payload : IPagination) : Observable<IResponse<IPlayer>> {
    return this.http.post('admin/players/getAllPlayers', payload) as Observable<IResponse<IPlayer>>
  }

  addPlayer(player : IAddUser) {
    return this.http.post('admin/players/addPlayer', player);
  }

  changePlayerStatus(player : IPlayer) {
    return this.http.delete(`admin/players/changePlayerStatus/${player.playerId}`)
  }
}
