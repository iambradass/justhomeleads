// JH v3 shell: full-screen mobile menu + local-preview link fixer.
// Loaded (deferred) on every page that uses the v3 header.
(function() {
    var sheet = document.getElementById('jh-sheet');
    var openBtn = document.getElementById('jh-menu-open');
    var closeBtn = document.getElementById('jh-menu-close');
    if (sheet && openBtn && closeBtn && !sheet.hasAttribute('data-bound')) {
        sheet.setAttribute('data-bound', '');
        var open = function() {
            sheet.classList.add('is-open'); sheet.setAttribute('aria-hidden', 'false');
            openBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden';
            closeBtn.focus();
        };
        var close = function() {
            sheet.classList.remove('is-open'); sheet.setAttribute('aria-hidden', 'true');
            openBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
            openBtn.focus();
        };
        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && sheet.classList.contains('is-open')) close(); });
        sheet.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', function() { if (sheet.classList.contains('is-open')) close(); }); });
    }

    if (window.location.protocol === 'file:') {
        document.querySelectorAll('.jh-header a[href^="/"], .jh-sheet a[href^="/"], .jh-footer a[href^="/"], .jh-stepmark a[href^="/"], .jh-pager a[href^="/"]').forEach(function(link) {
            var p = link.getAttribute('href');
            if (p === '/') link.setAttribute('href', 'index.html');
            else if (p.indexOf('/#') === 0) link.setAttribute('href', 'index.html' + p.slice(1));
            else if (p.indexOf('.') === -1) link.setAttribute('href', p.slice(1) + '.html');
        });
    }
})();
