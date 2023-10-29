import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IPlaceInput} from 'src/app/data/model/place.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesApiService {
  constructor(protected http: HttpClient) { }

  get(id: number): Observable<IPlaceInput> {
    return this.http.get<IPlaceInput>(environment.placeUrl + id, { headers: environment.headers })
  }

  put(id: number, place: IPlaceInput): Observable<IPlaceInput> {
    return this.http.put<IPlaceInput>(environment.placeUrl + id, place, { headers: environment.headers })
  }
}
