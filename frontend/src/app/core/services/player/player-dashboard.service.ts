import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../models/auth.models';
import { ICategories, ITournaments } from '../../models/admin.model';
import { IPagination } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class PlayerDashboardService {

  constructor(private http : HttpClient) { }

  getTournamentsToPlay(playerId : any, payload : IPagination) : Observable<IResponse<ITournaments>> {
      return this.http.post(`player/tournaments/getAllTournamentsToPlay/${playerId}`, payload) as Observable<IResponse<ITournaments>>
  }

  createTournament(tournament : ITournaments) {
      return this.http.post('player/tournaments/createTournament', tournament)
  }

  getAllCategories(payload : IPagination) : Observable<IResponse<ICategories>> {
    return this.http.post('admin/categories/getAllCategories', payload) as Observable<IResponse<ICategories>>;
}
}
