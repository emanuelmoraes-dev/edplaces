import {IPlaceInput, IPlaceModel} from '../model/place.model';

export const toModel = (input: IPlaceInput): IPlaceModel => ({
    ...input,
    route: input.route.map(point => {
        if (typeof point === 'string') {
            return { 'System Name': point }
        } else {
            return point
        }
    })
})

export const toListModel = (input: IPlaceInput[]): IPlaceModel[] => input.map(toModel)
