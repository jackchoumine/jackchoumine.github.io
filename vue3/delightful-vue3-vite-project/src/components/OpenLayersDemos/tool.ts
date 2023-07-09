/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-09 18:45:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-09 18:48:24
 * @Description :
 */
import { Map, View } from 'ol'

import { Tile } from 'ol/layer'

import { guiYangPosition, source } from './data'

type initOptions = {
  target: HTMLElement
  center?: number[]
  zoom?: number
  minZoom?: number
  maxZoom?: number
  projection?: string
}

function initMap(
  { target, center = guiYangPosition, zoom = 12 }: initOptions = { target: null }
) {
  if (!target) return null

  const view = new View({
    center,
    zoom,
    projection: 'EPSG:4326',
  })
  const map = new Map({
    target,
    layers: [
      new Tile({
        source: source.tianDiTuSource2,
      }),
      new Tile({
        source: source.tianDiTuSource3,
      }),
    ],
    view,
  })

  return {
    map,
    view,
  }
}

export { initMap }
