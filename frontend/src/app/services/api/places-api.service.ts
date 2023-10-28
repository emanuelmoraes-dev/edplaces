import {headers, placeUrl} from './../../../config';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IPlaceInput} from 'src/app/data/model/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesApiService {
  constructor(protected http: HttpClient) { }

  get(id: number): Observable<IPlaceInput> {
    return this.http.get<IPlaceInput>(placeUrl + id, { headers })
  }

  put(id: number, place: IPlaceInput): Observable<IPlaceInput> {
    return this.http.put<IPlaceInput>(placeUrl + id, place, { headers })
  }
}
