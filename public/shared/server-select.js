(() => {
    const SERVERS = [
        ['v1', 'Otakudesuu', '/v1/home'],
        ['v2', 'Samehadakuu', '/v2/home'],
        ['v3', 'Kuramanimee', '/v3/home'],
        ['v4', 'Anichinn', '/v4/home'],
        ['v5', 'Anoboyy', '/v5/home'],
        ['v6', 'AnimeIndoo', '/v6/home'],
        ['v7', 'Nekopoii', '/v7/home'],
        ['v8', 'Kusonimee', '/v8/home'],
        ['v9', 'Aurataill', '/v9/home'],
        ['v10', 'Vidkuu', '/v10/']
    ];

    const SERVER_HOME = Object.fromEntries(SERVERS.map(([id, , home]) => [id, home]));

    function detectCurrentServer() {
        const match = window.location.pathname.match(/^\/v(\d+)(?:\/|$)/);
        if (!match) return 'v1';

        const id = `v${match[1]}`;
        return SERVER_HOME[id] ? id : 'v1';
    }

    function normalizeServerSelect(select) {
        const current = detectCurrentServer();
        select.innerHTML = SERVERS
            .map(([id, name]) => `<option value="${id}"${id === current ? ' selected' : ''}>${id.toUpperCase()} - ${name}</option>`)
            .join('');
        select.value = current;
    }

    function bindServerSelect(select) {
        if (!select || select.dataset.serverSelectReady === '1') return;

        normalizeServerSelect(select);
        select.dataset.serverSelectReady = '1';

        select.addEventListener('change', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            const target = SERVER_HOME[select.value] || '/v1/home';
            window.location.href = target;
        }, true);
    }

    function initServerSelects() {
        document.querySelectorAll('select#serverSelect, select.server-select').forEach(bindServerSelect);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServerSelects);
    } else {
        initServerSelects();
    }
})();
