import { headers, placeUrl } from './../../../config';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlaceModel } from 'src/app/data/model/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesApiService {
  constructor(protected http: HttpClient) { }

  get(id: number): Observable<IPlaceModel> {
    return this.http.get<IPlaceModel>(placeUrl + id, { headers })
  }

  put(id: number, place: IPlaceModel): Observable<IPlaceModel> {
    return this.http.put<IPlaceModel>(placeUrl + id, place, { headers })
  }
}
