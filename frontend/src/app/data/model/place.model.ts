export type IPoint = {
    'System Name': string,
    'Body Name'?: string,
    'Landmark Subtype'?: string,
    'Distance'?: string,
    'Distance Remaining'?: string,
    'Fuel Left'?: string,
    'Fuel Used'?: string,
    'Refuel'?: string,
    'Neutron Star'?: string,
    'Jumps'?: number,
    'Stop'?: string
}

export interface IPlaceModel {
    id: number;
    destination: string;
    route: IPoint[];
    position: number;
}

export interface IPlaceInput {
    id: number;
    destination: string;
    route: string[] | IPoint[];
    position: number;
}
