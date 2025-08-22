// ==UserScript==
// @name         npm-versions-sort
// @namespace    http://tampermonkey.net/
// @version      2025-08-02
// @description  try to take over the world!
// @author       JackZhouMine(zhouqijun4job@163.com)
// @match        https://www.npmjs.com/package/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @grant        none
// @license      MIT
// ==/UserScript==
;(function () {
  const sortStyle = `
  :root {
    --sort-color-default: #e8deff;
    --sort-color-active: #885afa;
    --bg-ali: aliceblue;
  }
  .bg-ali {
    background-color:var(--bg-ali);
  }
  .flex {
    display: flex;
  }
  .flex-end {
    justify-content: flex-end;
  }
  .items-center {
    align-items: center;
  }
  .w-full_i {
    width: 100% !important;
  }
  .sortable {
    background-color: #f7f7f7;
  }

  .sort-icon {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    height: 30px;
    margin-left: 6px;
  }
  .triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    cursor: pointer;
  }
  .up {
    border-bottom: 13px solid;
    border-bottom-color: var(--sort-color-default);
  }
  .up-active {
    border-bottom-color: var(--sort-color-active);
  }
  .down {
    border-top: 13px solid;
    border-top-color: var(--sort-color-default);
  }
  .down-active {
    border-top-color: var(--sort-color-active);
  }
`
  const VERSION_TAB = 'versions'

  const mainDiv = $('#main')
  const versionsTab = findVersionsTab()

  insertStyle(sortStyle)

  if (checkTab() === VERSION_TAB) {
    setTimeout(() => {
      appendSortIcon()
      appendVersionsSortIcon()
      appendPublishedSortIcon()
      sortByDownloads(findVersionsTbody())
      downloadSort()
      versionSort()
      publishedSort()
    }, 100)
  }

  on('click', onClickVersionTab, versionsTab)

  function onClickVersionTab() {
    setTimeout(() => {
      insertSortIcon()
      downloadSort()
      versionSort()
      publishedSort()
    }, 300)
  }

  function appendSortIcon(index = 1, text = 'Downloads (Last 7 Days)') {
    const downloadHead = findHeads()[index]
    downloadHead.appendChild(createSortIcon('download', text))
  }
  function appendVersionsSortIcon() {
    const downloadHead = findHeads()[0]
    downloadHead.appendChild(createSortIcon('version', 'Version'))
  }
  function appendPublishedSortIcon() {
    const downloadHead = findHeads()[2]
    downloadHead.appendChild(createSortIcon('published', 'Published'))
  }

  function insertSortIcon() {
    appendSortIcon()
    appendVersionsSortIcon()
    appendPublishedSortIcon()
  }

  function downloadSort() {
    const downloadUp = $('#download-up')
    const downloadDown = $('#download-down')
    on(
      'click',
      () => {
        sortByDownloads(findVersionsTbody(), 'asc')
        downloadUp.classList.add('up-active')
        downloadDown.classList.remove('down-active')
        removeActive('version')
        removeActive('published')
      },
      downloadUp
    )
    on(
      'click',
      () => {
        sortByDownloads(findVersionsTbody(), 'desc')
        downloadUp.classList.remove('up-active')
        downloadDown.classList.add('down-active')
        removeActive('version')
        removeActive('published')
      },
      downloadDown
    )
  }
  function versionSort() {
    const sortUp = $('#version-up')
    const sortDown = $('#version-down')
    on(
      'click',
      () => {
        sortByVersions(findVersionsTbody(), 'asc')
        sortUp.classList.add('up-active')
        sortDown.classList.remove('down-active')
        removeActive('download')
        removeActive('published')
      },
      sortUp
    )
    on(
      'click',
      () => {
        sortByVersions(findVersionsTbody(), 'desc')
        sortUp.classList.remove('up-active')
        sortDown.classList.add('down-active')
        removeActive('download')
        removeActive('published')
      },
      sortDown
    )
  }
  function publishedSort() {
    //if (hasOnPublished) return
    const sortUp = $('#published-up')
    const sortDown = $('#published-down')
    on(
      'click',
      () => {
        sortByPublished(findVersionsTbody(), 'asc')
        sortUp.classList.add('up-active')
        sortDown.classList.remove('down-active')
        removeActive('download')
        removeActive('version')
      },
      sortUp
    )
    on(
      'click',
      () => {
        sortByPublished(findVersionsTbody(), 'desc')
        sortUp.classList.remove('up-active')
        sortDown.classList.add('down-active')
        removeActive('download')
        removeActive('version')
      },
      sortDown
    )
  }

  function removeActive(sort = 'download') {
    const sortUp = $(`#${sort}-up`)
    const sortDown = $(`#${sort}-down`)
    sortUp.classList.remove('up-active')
    sortDown.classList.remove('down-active')
  }

  function findVersionsTable() {
    const versions = $('#tabpanel-versions')
    const versionsTable = $('table[aria-labelledby="version-history"]', versions)
    return versionsTable
  }

  function findVersionsTbody() {
    //if (versionsTbody) return versionsTbody
    const tbody = $('tbody', findVersionsTable())
    return tbody
  }

  function findVersionsThead() {
    const head = $('thead', findVersionsTable())
    return head
  }

  function findHeads() {
    const heads = Array.from($$('th', findVersionsThead()))
    return heads
  }

  function sortByDownloads(tbody, sort = 'desc') {
    const rows = Array.from($$('tr', tbody))

    rows.sort((a, b) => {
      const aVal = parseDownloads(a)
      const bVal = parseDownloads(b)
      if (sort === 'desc') return bVal - aVal
      return aVal - bVal
    })

    const fragment = document.createDocumentFragment()
    rows.forEach(row => fragment.appendChild(row))
    tbody.appendChild(fragment)
  }

  function sortByVersions(tbody, sort = 'desc') {
    const rows = Array.from($$('tr', tbody))

    rows.sort((a, b) => {
      const aVal = parseVersion(a)
      const bVal = parseVersion(b)
      if (sort === 'desc') return compareVersion(bVal, aVal)
      return -compareVersion(bVal, aVal)
    })

    const fragment = document.createDocumentFragment()
    rows.forEach(row => fragment.appendChild(row))
    tbody.appendChild(fragment)
  }

  function sortByPublished(tbody, sort = 'desc') {
    const rows = Array.from($$('tr', tbody))

    rows.sort((a, b) => {
      const aVal = parsePublishedTime(a)
      const bVal = parsePublishedTime(b)
      if (sort === 'desc') return -compareIsoTime(bVal, aVal)
      return compareIsoTime(bVal, aVal)
    })

    const fragment = document.createDocumentFragment()
    rows.forEach(row => fragment.appendChild(row))
    tbody.appendChild(fragment)
  }

  function parseDownloads(tr) {
    const downloadsText = $('.downloads', tr)?.textContent.replace(/,/g, '') || '0'
    const downloads = parseInt(downloadsText, 10)
    return downloads
  }

  function parseVersion(tr) {
    const text = $('a', tr)?.textContent.replace(/,/g, '')
    return text
  }

  function parsePublishedTime(tr) {
    const time = $('time', tr)
    const dateTime = time.getAttribute('datetime')
    return dateTime
  }

  function insertStyle(styleContent) {
    const style = h('style')
    style.textContent = styleContent
    document.head.appendChild(style)
  }

  function checkTab() {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get('activeTab')
    return tab
  }

  function findVersionsTab() {
    const tabList = $('ul[role="tablist"]', mainDiv)
    const versionsTab = tabList?.lastElementChild
    return versionsTab
  }

  function createSortIcon(sortBy = 'download', text) {
    let sortHtml = ''
    if (sortBy === 'download') {
      sortHtml = `
      <div class="triangle up" id="${sortBy}-up"></div>
      <div class="triangle down down-active" id="${sortBy}-down"></div>
      `
    } else {
      sortHtml = `
      <div class="triangle up" id="${sortBy}-up"></div>
      <div class="triangle down" id="${sortBy}-down"></div>
      `
    }
    const div = h('div')
    div.classList.add('sort-icon')
    div.innerHTML = sortHtml
    return div
  }

  function on(eventName, on, target) {
    if (!target) return
    target.addEventListener(eventName, on)
  }

  function $(selector, parent = document) {
    return parent.querySelector(selector)
  }

  function $$(selector, parent = document) {
    return parent.querySelectorAll(selector)
  }

  function h(tag) {
    return document.createElement(tag)
  }

  function compareVersion(v1, v2) {
    // 解析版本号
    const parseVersion = version => {
      const [numbers, prerelease] = version.split('-')
      const [major, minor = '0', patch = '0'] = numbers.split('.')
      return {
        major: parseInt(major, 10),
        minor: parseInt(minor, 10),
        patch: parseInt(patch, 10),
        prerelease: prerelease ? prerelease.split('.') : [],
      }
    }

    const parsed1 = parseVersion(v1)
    const parsed2 = parseVersion(v2)

    // 比较主版本号
    if (parsed1.major !== parsed2.major) {
      return parsed1.major > parsed2.major ? 1 : -1
    }

    // 比较次版本号
    if (parsed1.minor !== parsed2.minor) {
      return parsed1.minor > parsed2.minor ? 1 : -1
    }

    // 比较修订号
    if (parsed1.patch !== parsed2.patch) {
      return parsed1.patch > parsed2.patch ? 1 : -1
    }

    // 比较预发标签
    const prerelease1 = parsed1.prerelease
    const prerelease2 = parsed2.prerelease

    // 没有预发标签的版本 > 有预发标签的版本
    if (prerelease1.length === 0 && prerelease2.length > 0) return 1
    if (prerelease1.length > 0 && prerelease2.length === 0) return -1
    if (prerelease1.length === 0 && prerelease2.length === 0) return 0

    // 逐个比较预发标签
    const maxLength = Math.max(prerelease1.length, prerelease2.length)
    for (let i = 0; i < maxLength; i++) {
      const part1 = prerelease1[i]
      const part2 = prerelease2[i]

      // 如果一个标签比另一个长
      if (part1 === undefined) return -1
      if (part2 === undefined) return 1

      // 如果两个标签都是数字
      const num1 = parseInt(part1, 10)
      const num2 = parseInt(part2, 10)
      if (!isNaN(num1)) {
        if (isNaN(num2)) return -1
        if (num1 !== num2) return num1 > num2 ? 1 : -1
      } else if (!isNaN(num2)) {
        return 1
      }

      // 如果都是字符串，按字母顺序比较
      if (part1 !== part2) {
        return part1 > part2 ? 1 : -1
      }
    }

    return 0
  }

  function compareIsoTime(time1, time2) {
    // 将 ISO 时间字符串转换为 Date 对象
    const date1 = new Date(time1)
    const date2 = new Date(time2)

    // 比较日期
    if (date1 > date2) {
      return 1 // time1 大于 time2
    } else if (date1 < date2) {
      return -1 // time1 小于 time2
    } else {
      return 0 // time1 等于 time2
    }
  }
})()
