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

                navigator.clipboard.writeText(compressedLink).then(() => {
                    chrome.notifications.create({
                        type: "basic",
                        title: "Compressed link copied to clipboard",
                        message: "The compressed link has been copied to your clipboard",
                        iconUrl: "icons/icon-48.png"
                    })
                })
            }
            break;
    }
});