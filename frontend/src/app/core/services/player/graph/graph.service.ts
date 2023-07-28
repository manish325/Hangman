import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/core/models/auth.models';
import { IGraphData } from 'src/app/core/models/graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http : HttpClient) { }

  getGraphData() : Observable<IGraphData[]> {
    return this.http.get('player/progress/getGraphData') as Observable<IGraphData[]>;
  }
}
