export type TPin = {
  name: string,
  coordinates: { lat: number, lng: number},
  key: string
}

export type TPins = { pins: TPin[] }
