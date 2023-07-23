import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScore, ITournamentDetails } from 'src/app/core/models/gameboard';

@Injectable({
  providedIn: 'root'
})
export class GameBoardService {

  constructor(private http : HttpClient) { }

  getTournamentDetails(tournamentId : string) : Observable<ITournamentDetails> {
      return this.http.get(`player/tournaments/getTournamentDetails/${tournamentId}`) as Observable<ITournamentDetails>;
  }

  submitScore(score : IScore) {
    return this.http.post('player/tournaments/submitScore', score)
  }
}
