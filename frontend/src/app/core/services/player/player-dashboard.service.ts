import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../models/auth.models';
import { ITournaments } from '../../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerDashboardService {

  constructor(private http : HttpClient) { }

  getTournamentsToPlay(playerId : any) : Observable<IResponse<ITournaments>> {
      return this.http.get(`player/tournaments/getAllTournamentsToPlay/${playerId}`) as Observable<IResponse<ITournaments>>
  }

  createTournament(tournament : ITournaments) {
      return this.http.post('player/tournaments/createTournament', tournament)
  }
}
