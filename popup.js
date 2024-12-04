// Get references to HTML elements
const delaySlider = document.getElementById('delay-slider');
const sliderValue = document.getElementById('slider-value');
const saveButton = document.getElementById('save');
const status = document.getElementById('status');

chrome.storage.sync.get(['delay'], (result) => {
    const delay = result.delay || 500; 
    delaySlider.value = delay / 1000; 
    sliderValue.textContent = `${delay}ms`;
});

delaySlider.addEventListener('input', () => {
    const delayInMs = Math.round(delaySlider.value * 1000); 
    sliderValue.textContent = `${delayInMs}ms`;
});

saveButton.addEventListener('click', () => {
    const delayInMs = Math.round(delaySlider.value * 1000); 
    chrome.storage.sync.set({ delay: delayInMs }, () => {
        status.textContent = 'Delay saved!';
        setTimeout(() => {
            status.textContent = '';
        }, 2000);
    });
});

