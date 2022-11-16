import { defaultId } from './../../../config';
import { Observable, take } from 'rxjs';
import { IPlaceModel } from './../../data/model/place.model';
import { Component, OnInit } from '@angular/core';
import { PlacesApiService } from 'src/app/services/api/places-api.service';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.less']
})
export class PlaceCardComponent implements OnInit {
  readonly loadingText = 'Loading...';
  place$!: Observable<IPlaceModel>;
  private place!: IPlaceModel;

  constructor(protected api: PlacesApiService) { }

  ngOnInit (): void {
    this.place$ = this.api.get(defaultId);
    this.place$.pipe(take(1)).subscribe({
      next: place => {
        this.place = place;
      }
    });
  }

  onPointChanged (_point: string, index: number): void {
    if (this.place.position !== index) {
      this.place.position = index;
      this.api.put(defaultId, this.place).pipe(take(1)).subscribe({
        next: _place => {
          console.log('atualizado!')
        },
        error: err => {
          console.error(err)
        }
      });
    }
  }

}
