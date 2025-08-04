// ==UserScript==
// @name         npm-versions-sort-gpt
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Enable sorting by Version, Downloads, and Published columns in NPM package version table
// @match        https://www.npmjs.com/package/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @grant        none
// ==/UserScript==
;(function () {
  'use strict'
  const mainDiv = document.querySelector('#main')
  console.log(mainDiv)
  const waitForTable = () => {
    const table = mainDiv.querySelector('table[aria-labelledby="version-history"]')
    console.log(table)
    // debugger
    if (table) {
      enhanceTable(table)
    } else {
      setTimeout(waitForTable, 500)
    }
  }

  const enhanceTable = table => {
    const thead = table.querySelector('thead')
    const rows = [...table.querySelectorAll('tbody tr')]
    if (!thead || rows.length === 0) return

    let currentSort = { colIndex: -1, asc: true }

    // 插入排序样式
    const style = document.createElement('style')
    style.textContent = `
      th.sortable { cursor: pointer; user-select: none; position: relative; }
      th.sortable::after {
        content: '⇅'; font-size: 0.8em; margin-left: 6px; opacity: 0.3;
      }
      th.sortable.asc::after { content: '↑'; opacity: 0.8; }
      th.sortable.desc::after { content: '↓'; opacity: 0.8; }
    `
    document.head.appendChild(style)

    const headers = [...thead.querySelectorAll('th')]
    headers.forEach((th, i) => {
      const label = th.textContent.trim().toLowerCase()
      if (['version', 'downloads', 'published'].includes(label)) {
        th.classList.add('sortable')
        th.addEventListener('click', () => {
          const asc = currentSort.colIndex === i ? !currentSort.asc : true
          currentSort = { colIndex: i, asc }
          headers.forEach(h => h.classList.remove('asc', 'desc'))
          th.classList.add(asc ? 'asc' : 'desc')
          sortRows(rows, i, asc)
          const tbody = table.querySelector('tbody')
          tbody.innerHTML = ''
          rows.forEach(row => tbody.appendChild(row))
        })
      }
    })
  }

  const sortRows = (rows, colIndex, asc) => {
    rows.sort((a, b) => {
      const getText = tr => tr.children[colIndex].textContent.trim()
      let aText = getText(a)
      let bText = getText(b)

      if (/downloads/i.test(aText) || /\d+[,.\d]*/.test(aText)) {
        const parseNum = t => parseInt(t.replace(/[,]/g, '')) || 0
        aText = parseNum(aText)
        bText = parseNum(bText)
      } else if (/\d{4}-\d{2}-\d{2}/.test(aText)) {
        aText = new Date(aText).getTime()
        bText = new Date(bText).getTime()
      }

      if (aText > bText) return asc ? 1 : -1
      if (aText < bText) return asc ? -1 : 1
      return 0
    })
  }

  waitForTable()
})()
