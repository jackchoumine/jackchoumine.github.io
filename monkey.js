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

  insertStyle(sortStyle)

  if (checkTab() === VERSION_TAB) {
    setTimeout(() => {
      appendSortIcon()
      sortByDownloads(findVersionsTbody())
      downloadSort()
    }, 100)
  }

  on('click', onClickVersionTab, versionsTab)

  function onClickVersionTab() {
    setTimeout(() => {
      appendSortIcon()
      sortByDownloads(findVersionsTbody())
      downloadSort()
    }, 100)
  }

  function appendSortIcon(index = 1, text = 'Downloads (Last 7 Days)') {
    if (hasAppendDownloadSortIcon) return
    const downloadHead = findHeads()[index]
    console.log({ downloadHead })
    downloadHead.classList.add('w-full_i')
    downloadHead.classList.add('flex')
    downloadHead.classList.add('flex-end')
    downloadHead.classList.add('items-center')
    downloadHead.appendChild(createSortIcon('download', text))
    hasAppendDownloadSortIcon = true
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
        const classList = downloadUp.classList
        classList.add('up-active')
        downloadDown.classList.remove('down-active')
      },
      downloadUp
    )
    on(
      'click',
      () => {
        sortByDownloads(findVersionsTbody(), 'desc')
        const classList = downloadUp.classList
        classList.remove('up-active')
        downloadDown.classList.add('down-active')
      },
      downloadDown
    )
    hasOnDownload = true
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

  function parseDownloads(tr) {
    const downloadsText = $('.downloads', tr)?.textContent.replace(/,/g, '') || '0'
    const downloads = parseInt(downloadsText, 10)
    return downloads
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
    <div class="triangle down down-active" id="${sortBy}-down"></div>
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
})()
