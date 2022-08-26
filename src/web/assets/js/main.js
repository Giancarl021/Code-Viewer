async function main() {
    const f = new URLSearchParams(location.search.substring(1)).get('f');
    
    if (!f) {
        location.href = '/';
    }

    const extension = f.split('.').pop();
    const options = loadOptions();

    const response = await fetch(`/_/api/file${f}`);

    if (response.status !== 200) {
        location.href = '/';
    }

    const filename = f.split(/(\/|\\)/).pop();
    const content = await response.text();
    
    const $data = document.getElementById('data');
    const $goBack = document.getElementById('go-back');
    const $toggleWrap = document.getElementById('toggle-wrap');
    const $downloadFile = document.getElementById('download-file');

    $goBack.onclick = () => history.go(-1);
    $downloadFile.onclick = () => downloadFile(content, filename);

    updateWrap();
    $toggleWrap.onclick = () => {
        options.wrap = !options.wrap;
        setOption('wrap', options.wrap);
        updateWrap();
    };

    $data.textContent = content;

    if (hljs.getLanguage(extension)) $data.classList.add(`language-${extension}`, extension);

    hljs.highlightAll();

    function updateWrap() {
        $data.classList[options.wrap ? 'add' : 'remove']('--wrap');
        $toggleWrap.textContent = `${options.wrap ? 'Disable' : 'Enable'} wrapping`;
    }

    function downloadFile(data, filename) {
        const content = URL.createObjectURL(new Blob([data]));
        const $a = window.document.createElement('a');
        $a.href = content;
        $a.download = filename;

        $a.style.display = 'none';

        document.body.appendChild($a);
        $a.click();        
        document.body.removeChild($a);

        URL.revokeObjectURL(content);
    }
}

function loadOptions() {
    const keys = [
        {
            name: 'wrap',
            default: 'false',
            parse: opt => opt === 'true'
        }
    ];

    const options = {};

    for (const item of keys)
        options[item.name] = item.parse(valueOrDefault(localStorage.getItem(`opt:${item.name}`), item.default));

    return options;
}

function setOption(key, value) {
    localStorage.setItem(`opt:${key}`, value);
}

function valueOrDefault(value, defaultValue = null) {
    return (value === null || value === undefined) ?
        defaultValue :
        value;
}

document.addEventListener('DOMContentLoaded', main);