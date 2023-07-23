import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetLeaderboard, ILeaderboard } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http : HttpClient) { }

  getLeaderBoardData(payload : IGetLeaderboard) : Observable<IResponse<ILeaderboard>> {
      return this.http.post('admin/leaderboard/getLeaderboardData', payload) as Observable<IResponse<ILeaderboard>>
  }
}
