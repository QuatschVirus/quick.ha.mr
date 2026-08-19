import { compress } from "./ha.mr/compress.js"
import { outputAlphabetASCII } from "./ha.mr/alphabets.js"

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: "Copy compressed link",
        contexts: ["link"],
        id: "qhamr-copyCompressedLink"
    })
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case "qhamr-copyCompressedLink":
            if (info.linkUrl) {
                const compressedPayload = compress(info.linkUrl, outputAlphabetASCII);
                const compressedLink = `http://ha.mr#${compressedPayload}`;

                // navigator.clipboard is unavailable in the background service worker
                // (no DOM/focused document), so the write has to run in the tab instead.
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (text) => navigator.clipboard.writeText(text),
                    args: [compressedLink]
                }).then(() => {
                    chrome.notifications.create({
                        type: "basic",
                        title: "Compressed link copied to clipboard",
                        message: "The compressed link has been copied to your clipboard",
                        iconUrl: "icons/quick.ha.mr-48.png"
                    })
                }).catch((err) => {
                    console.error("quickhamr: clipboard write failed", err);
                })
            }
            break;
    }
});