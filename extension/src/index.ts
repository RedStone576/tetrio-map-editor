type Browser = typeof import("webextension-polyfill")

const browser: Browser = typeof (globalThis as any).browser === "undefined" ? (globalThis as any).chrome : (globalThis as any).browser

const script = document.createElement("script")
script.src = browser.runtime.getURL("script.js")

document.documentElement.prepend(script)

const _eval = window.eval

window.eval = (h) =>
{
    window.eval = _eval
    _eval.call(undefined, replace(h))
}

function replace(str: string)
{}
