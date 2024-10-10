document.getElementById('searchBtn').addEventListener('click', async () => {
    const keyword = document.getElementById('keywordInput').value;
    try {
        const response = await fetch('/get-urls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyword })
        });
        const data = await response.json();
        if (response.ok) {
            displayUrls(data.urls);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

function displayUrls(urls) {
    const urlList = document.getElementById('urlList');
    urlList.innerHTML = '';
    urls.forEach((url, index) => {
        const li = document.createElement('li');
        li.textContent = `Файл ${index + 1}`; 
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => downloadContent(url));
        urlList.appendChild(li);
    });
}

async function downloadContent(url) {
    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        if (response.ok) {
            saveToLocalStorage(url, data.content);
            displayDownloadedContent(url);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Ошибка при загрузке контента:', error);
    }
}

function saveToLocalStorage(url, content) {
    localStorage.setItem(url, content);
    console.log('Контент сохранён в LocalStorage');
}

function displayDownloadedContent(url) {
    const contentList = document.getElementById('contentList');
    const li = document.createElement('li');
    li.textContent = `Ссылка на файл: ${url}`;
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
        window.open(url, '_blank'); 
    });
    
    contentList.appendChild(li);
}