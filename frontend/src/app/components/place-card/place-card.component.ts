import {Subscription, take, timer} from 'rxjs';
import {IPlaceModel, IPoint} from 'src/app/data/model/place.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesApiService} from 'src/app/services/api/places-api.service';
import {toModel} from 'src/app/data/mapper/place-mapper';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.less']
})
export class PlaceCardComponent implements OnInit, OnDestroy {
  readonly loadingText = 'Loading...'
  place?: IPlaceModel
  chargingAnimationIcon = 'battery_charging_full'

  private chargingIconSub!: Subscription

  constructor(protected api: PlacesApiService) { }

  ngOnInit (): void {
    this.api.get(environment.defaultId).pipe(take(1)).subscribe({
      next: place => {
        this.place = toModel(place)
        this.onPointChanged()
      }
    })

    this.chargingIconSub = timer(0, 1000).subscribe(_ => {
      if (this.chargingAnimationIcon === 'battery_charging_full') {
        this.chargingAnimationIcon = 'battery_full'
      } else {
        this.chargingAnimationIcon = 'battery_charging_full'
      }
    })
  }

  ngOnDestroy(): void {
    this.chargingIconSub.unsubscribe()
  }

  getPointInfo(point: IPoint): string {
    const info: string[] = []
    info.push(point['System Name'])

    if (point['Body Name'] && point['Body Name'].startsWith(info[0])) {
      info[0] = point['Body Name']
    } else if (point['Body Name']) {
      info[0] += ' | ' + point['Body Name']
    }

    if (point['Landmark Subtype']) {
      info.push(point['Landmark Subtype'])
    }

    return info.join('\n')
  }

  onPointChanged (index?: number): void {
    if (this.place && (index === undefined || this.place.position !== index)) {
      if (index !== undefined) {
        this.place.position = index;
      }
      this.api.put(environment.defaultId, this.place).pipe(take(1)).subscribe({
        next: _ => {
          console.log('atualizado!')
        },
        error: err => {
          console.error(err)
        }
      })
    }
  }

}
