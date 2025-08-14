// ==UserScript==
// @name         tapd-dialog-clear
// @namespace    http://tampermonkey.net/
// @version      1.4.0
// @description  移除tapd授权人数提醒弹窗
// @author       JackZhouMine(zhouqijun4job@163.com)
// @match        https://www.tapd.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/545761/tapd-dialog-clear.user.js
// @updateURL https://update.greasyfork.org/scripts/545761/tapd-dialog-clear.meta.js
// ==/UserScript==
(function () {
    'use strict'
    handleError()

    const BLOCK_RULES = [
        '/api/company/company/get_company_renew_info'
    ]

    const matches = url => {
        if (!url) return false
        const str = String(url).toLowerCase()
        return BLOCK_RULES.some(rule => {
            if (rule instanceof RegExp && rule.test(str)) {
                return true
            }
            if (rule.endsWith(str)) {
                return true
            }
            if (rule.startsWith(str)) {
                return true
            }
            return str.includes(rule.toLowerCase())
        })
    }

    // fetch
    reWriteFetch()
    // XHR
    reWriteXHR()
    let canBlock = false
    let closeBtn
    const timer = setInterval(clearDialog, 500)
    setTimeout(clearDialog, 2000)

    function clearDialog() {
        closeBtn = document.querySelector('.el-dialog__headerbtn')
        // console.log({closeBtn})
        if (canBlock) {
            clearInterval(timer)
        }
        if (closeBtn) {
            closeBtn.click()
            clearInterval(timer)
        }
    }

    function reWriteXHR() {
        const _open = XMLHttpRequest.prototype.open
        XMLHttpRequest.prototype.open = function (method, url) {
            this.__url = url
            return _open.apply(this, arguments)
        }
        const _send = XMLHttpRequest.prototype.send
        XMLHttpRequest.prototype.send = function () {
            if (matches(this.__url)) {
                console.log('Blocked XHR:', this.__url)
                canBlock = true
                this.abort()
                return
            }
            return _send.apply(this, arguments)
        }
    }

    function reWriteFetch() {
        // fetch
        const _fetch = window.fetch

        window.fetch = function (input, init) {
            const url = typeof input === 'string' ? input : input?.url
            if (matches(url)) {
                console.warn('Blocked fetch:', url)
                canBlock = true
                return Promise.reject(new DOMException('Blocked by userscript', 'AbortError'))
            }
            return _fetch.apply(this, arguments)
        }
    }

    function handleError() {
        window.addEventListener('unhandledrejection', event => {
            console.error(event.reason)
            event.preventDefault() // 阻止默认错误输出
        })

        window.onerror = function (message, source, lineno, colno, error) {
            // 错误处理
            console.error('全局错误:', message, source, lineno, colno, error)
            // 可以记录错误，或者进行其他处理
            return true // 阻止浏览器默认的错误处理
        }
    }
})()