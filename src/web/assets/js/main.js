async function main() {
    const f = new URLSearchParams(location.search.substring(1)).get('f');
    
    if (!f) {
        location.href = '/';
    }

    const response = await fetch(`/_/api/file${f}`);

    if (response.status !== 200) {
        location.href = '/';
    }

    document.getElementById('go-back').onclick = () => history.go(-1);

    const content = await response.text();

    const data = document.getElementById('data');

    data.textContent = content;

    hljs.highlightAll();
}

document.addEventListener('DOMContentLoaded', main);