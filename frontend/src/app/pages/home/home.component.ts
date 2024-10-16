import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  placeId$!: Observable<number>
  readonly defaultId = environment.defaultId

  constructor (private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.placeId$ = this.route.paramMap.pipe(map(params => {
      const id = params.get('id')
      if (id) {
        return parseInt(id)
      }
      return environment.defaultId
    }))
  }
}
