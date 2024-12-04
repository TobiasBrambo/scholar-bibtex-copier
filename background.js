chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('scholar.bib')) {
        chrome.storage.sync.get(['delay'], (result) => {
            const delay = result.delay || 500; // Default to 500ms
            setTimeout(() => {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: copyBibTeX
                }, () => {
                    chrome.tabs.remove(tabId);
                });
            }, delay);
        });
    }
});

function copyBibTeX() {
    const bibtexContent = document.body.textContent;
    if (bibtexContent.includes('@')) {
        const textarea = document.createElement('textarea');
        textarea.value = bibtexContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    } else {
        console.error('BibTeX content not found.');
    }
}

