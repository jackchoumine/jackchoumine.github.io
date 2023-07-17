<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 21:08:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-17 11:21:05
 * @Description : geoJson
-->
<script lang="ts" setup>
import L from 'leaflet'
import type { GeoJSON } from 'leaflet'

import { circles, lines, points, polygons } from './data'

const mapContainer = ref()
let map = null
onMounted(() => {
  map = initMap(mapContainer.value)
  drawFeatures(map)
})

function initMap(
  mapContainer: HTMLElement,
  // [纬度 经度]
  coordinates: [number, number] = [26.56, 106.75],
  zoom: number = 11.4
) {
  const map = L.map(mapContainer).setView(coordinates, zoom)
  const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  })
  googleStreets.addTo(map)
  // map.on('click', e => {
  //   console.log(e.latlng)
  // })
  return map
}

function drawFeatures(map) {
  const mapPoints = L.geoJSON(points as GeoJSON.GeoJsonObject, {
    style: feature => {
      console.log(feature)
      return {
        color: 'red', // feature.properties.color,
        weight: feature.properties.weight,
        opacity: feature.properties.opacity,
        fillColor: feature.properties.fillColor,
        fillOpacity: feature.properties.fillOpacity,
      }
    },
  })
  mapPoints.addTo(map)
  const mapLines = L.geoJSON(lines as GeoJSON.GeoJsonObject, {
    // style: feature => {
    //   console.log(feature)
    //   return {
    //     color: 'red', // feature.properties.color,
    //     // weight: feature.properties.weight,
    //     opacity: 0.4,
    //     // fillColor: feature.properties.fillColor,
    //     // fillOpacity: feature.properties.fillOpacity,
    //   }
    // },
    style: {
      stroke: true,
      color: '#f00',
      opacity: 0.4,
    },
  })
  mapLines.addTo(map)
  const mapPolygon = L.geoJSON(polygons as GeoJSON.GeoJsonObject, {
    style: feature => {
      console.log(feature)
      return {
        stroke: false,
        opacity: 0.4, // feature.properties['fill-opacity'],
        fillColor: feature.properties.fill,
        fillOpacity: 0.4, // feature.properties['fill-opacity'],
      }
    },
    // 每个 feature 的回调
    onEachFeature: (feature, layer) => {
      // 点击每个 feature 的回调，弹出提示框
      console.log('onEachFeature')
      const areaSize = `<span style="color:red;">面积：${feature.properties.area} </span> `
      // layer.bindPopup(areaSize)
      // 还可以使用 marker
      const divIcon = L.divIcon({
        className: 'my-div-icon',
        html: `<div style="color:red;width:100px;background-color:yellow;">面积：${feature.properties.area}</div> `,
      })
      const marker = L.marker(layer.getBounds().getCenter(), {
        icon: divIcon,
      })
      marker.addTo(map)
      // console.log('feature')
      // console.log(feature)
      // console.log('layer')
      // console.log(layer)
      // layer.on('click', e => {
      //   console.log(e)
      // })
    },
  })
  mapPolygon.addTo(map)
  // 获取 geojson 的边界，把polygon 放在视图中心
  const bound = mapPolygon.getBounds()
  console.log(bound, 'zqj log')
  map.fitBounds(bound)
  const mapCircles = L.geoJSON(circles as GeoJSON.GeoJsonObject)
  mapCircles.addTo(map)
  return map
}
</script>

<template>
  <div class="h-full" ref="mapContainer"></div>
</template>

<style scoped lang="scss"></style>
