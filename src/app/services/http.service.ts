import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${environment.BASE_URL}/games`, { params });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get<Game>(`${environment.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get<Game>(`${environment.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get<Game>(`${environment.BASE_URL}/games/${id}/screenshots`);

    return forkJoin([gameInfoRequest, gameTrailersRequest, gameScreenshotsRequest]).pipe(
      map((resp: any) => {
        return {
          ...resp[0],
          trailers: resp[1].results,
          screenshots: resp[2].results,
        };
      }
      )
    );
  }
}
