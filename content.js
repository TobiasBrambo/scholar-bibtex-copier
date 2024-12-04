document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A' && target.textContent.includes('BibTeX')) {
        event.preventDefault(); 
        window.open(target.href, '_blank'); 
    }
});

