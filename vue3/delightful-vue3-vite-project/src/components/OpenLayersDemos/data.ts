/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-09 18:21:37
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-17 09:56:02
 * @Description :
 */
import { XYZ } from 'ol/source'

const tianDiTuKey = '4c409692826bccaca32ee3e1a74ba1b5'
// const tianDiTuUrl = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
// 矢量地图
const tianDiTuUrl2 = `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
const tianDiTuSource2 = new XYZ({
  url: tianDiTuUrl2,
})
// 矢量注记
const tianDiTuUrl3 = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
const tianDiTuSource3 = new XYZ({
  url: tianDiTuUrl3,
})
// 影像地图
const tianDiTuUrl4 = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
const tianDiTuSource4 = new XYZ({
  url: tianDiTuUrl4,
})
// 影像注记
const tianDiTuUrl5 = `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
const tianDiTuSource5 = new XYZ({
  url: tianDiTuUrl5,
})

const source = {
  tianDiTuSource2,
  tianDiTuSource3,
  tianDiTuSource4,
  tianDiTuSource5,
}
const guiYangPosition = [106.675271, 26.579508]
export { source, guiYangPosition }
