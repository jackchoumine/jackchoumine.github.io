// ==UserScript==
// @name         npm-versions-sort
// @namespace    http://tampermonkey.net/
// @version      2025-08-02
// @description  try to take over the world!
// @author       ZhouQiJun
// @match        https://www.npmjs.com/package/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @grant        none
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

  let versionsTable = null
  let versionsThead = null
  let heads = null
  let versionsTbody = null
  let hasAppendDownloadSortIcon = false
  let hasAppendVersionsSortIcon = false
  let hasAppendPublishedSortIcon = false

  insertStyle(sortStyle)

  if (checkTab() === VERSION_TAB) {
    setTimeout(() => {
      appendSortIcon()
      appendVersionsSortIcon()
      appendPublishedSortIcon()
      sortByDownloads(findVersionsTbody())
      downloadSort()
      versionSort()
    }, 100)
  }

  on('click', onClickVersionTab, versionsTab)

  function onClickVersionTab() {
    setTimeout(() => {
      appendSortIcon()
      appendVersionsSortIcon()
      appendPublishedSortIcon()
      sortByDownloads(findVersionsTbody())
      downloadSort()
      versionSort()
    }, 100)
  }

  function appendSortIcon(index = 1, text = 'Downloads (Last 7 Days)') {
    if (hasAppendDownloadSortIcon) return
    const downloadHead = findHeads()[index]
    console.log({ downloadHead })
    //downloadHead.classList.add('flex')
    //downloadHead.classList.add('flex-end')
    //downloadHead.classList.add('items-center')
    downloadHead.appendChild(createSortIcon('download', text))
    hasAppendDownloadSortIcon = true
  }
  function appendVersionsSortIcon() {
    if (hasAppendVersionsSortIcon) return
    const downloadHead = findHeads()[0]
    console.log({ downloadHead })
    //downloadHead.classList.add('flex')
    //downloadHead.classList.add('flex-end')
    //downloadHead.classList.add('items-center')
    downloadHead.appendChild(createSortIcon('version', 'Version'))
    hasAppendVersionsSortIcon = true
  }
  function appendPublishedSortIcon() {
    if (hasAppendPublishedSortIcon) return
    const downloadHead = findHeads()[2]
    console.log({ downloadHead })
    //downloadHead.classList.add('flex')
    //downloadHead.classList.add('flex-end')
    //downloadHead.classList.add('items-center')
    downloadHead.appendChild(createSortIcon('published', 'Published'))
    hasAppendPublishedSortIcon = true
  }

  let hasOnDownload = false
  function downloadSort() {
    if (hasOnDownload) return
    const downloadUp = $('#download-up')
    const downloadDown = $('#download-down')
    on(
      'click',
      () => {
        sortByDownloads(findVersionsTbody(), 'asc')
        downloadUp.classList.add('up-active')
        downloadDown.classList.remove('down-active')
      },
      downloadUp
    )
    on(
      'click',
      () => {
        sortByDownloads(findVersionsTbody(), 'desc')
        downloadUp.classList.remove('up-active')
        downloadDown.classList.add('down-active')
      },
      downloadDown
    )
    hasOnDownload = true
  }
  var hasOnVersion = false
  function versionSort() {
    if (hasOnVersion) return
    const sortUp = $('#version-up')
    const sortDown = $('#version-down')
    console.log({
      sortUp,
      sortDown,
    })
    on(
      'click',
      () => {
        sortByVersions(findVersionsTbody(), 'asc')
        sortUp.classList.add('up-active')
        sortDown.classList.remove('down-active')
      },
      sortUp
    )
    on(
      'click',
      () => {
        sortByVersions(findVersionsTbody(), 'desc')
        sortUp.classList.remove('up-active')
        sortDown.classList.add('down-active')
      },
      sortDown
    )
    hasOnVersion = true
  }

  function findVersionsTable() {
    if (versionsTable) return versionsTable
    versionsTable = $('table[aria-labelledby="version-history"]', mainDiv)
    return versionsTable
  }

  function findVersionsTbody() {
    if (versionsTbody) return versionsTbody
    const tbody = $('tbody', findVersionsTable())
    versionsTbody = tbody
    return tbody
  }

  function findVersionsThead() {
    if (versionsThead) return versionsThead
    const head = $('thead', findVersionsTable())
    versionsThead = head
    return head
  }

  function findHeads() {
    if (heads) return heads
    heads = Array.from($$('th', findVersionsThead()))
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

  function parseDownloads(tr) {
    const downloadsText = $('.downloads', tr)?.textContent.replace(/,/g, '') || '0'
    const downloads = parseInt(downloadsText, 10)
    return downloads
  }

  function parseVersion(tr) {
    const text = $('a', tr)?.textContent.replace(/,/g, '')
    return text
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
    const sortHtml = `
    <div class="triangle up" id="${sortBy}-up"></div>
    <div class="triangle down" id="${sortBy}-down"></div>
  `
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
})()
