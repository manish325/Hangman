import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetTournaments, ITournaments } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    private http : HttpClient
  ) { }

  getTournaments(payload : IGetTournaments) : Observable<IResponse<ITournaments>> {
    return this.http.post('admin/tournaments/getAllTournaments', payload) as Observable<IResponse<ITournaments>>
  }
}
