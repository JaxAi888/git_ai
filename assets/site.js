/* 全站共享脚本：深浅主题切换 + 分类筛选 + 侧栏搜索 + 订阅反馈 + 目录滚动高亮 */
(function () {
  var KEY = 'jax-ai-theme';

  function toast(msg) {
    var el = document.getElementById('site-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'site-toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-show'); }, 2400);
  }

  function syncButtons() {
    var isDark = document.documentElement.dataset.theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.textContent = isDark ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('aria-label', isDark ? '切换到浅色主题' : '切换到深色主题');
    });
  }

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isDark = document.documentElement.dataset.theme === 'dark';
      var next = isDark ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (e) {}
      syncButtons();
    });
  });
  syncButtons();

  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    filters.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var group = pill.dataset.filterGroup || 'default';
        document.querySelectorAll('[data-filter][data-filter-group="' + group + '"]')
          .forEach(function (p) {
            p.classList.remove('active');
            p.setAttribute('aria-pressed', 'false');
          });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');

        var key = pill.dataset.filter;
        document.querySelectorAll('[data-cat]').forEach(function (item) {
          var cats = item.dataset.cat.split('|');
          var show = key === 'all' || cats.indexOf(key) !== -1;
          item.style.display = show ? '' : 'none';
        });

        document.querySelectorAll('[data-year-block]').forEach(function (block) {
          var visible = Array.prototype.some.call(
            block.querySelectorAll('[data-cat]'),
            function (el) { return el.style.display !== 'none'; }
          );
          block.style.display = visible ? '' : 'none';
        });
      });
    });
  }

  var search = document.getElementById('sideSearch');
  if (search) {
    var empty = document.getElementById('search-empty');
    function items() {
      return Array.prototype.slice.call(
        document.querySelectorAll('[data-cat], .q-card, .entry, .project-card, .post-card, .phase, .res-card')
      );
    }
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var hits = 0;
      items().forEach(function (el) {
        var text = (el.textContent || '').toLowerCase();
        var match = !q || text.indexOf(q) !== -1;
        el.classList.toggle('is-dim', !!q && !match);
        el.classList.toggle('search-hit', !!q && match);
        el.style.visibility = (q && !match) ? 'hidden' : '';
        el.style.position = (q && !match) ? 'absolute' : '';
        if (match) hits++;
      });
      if (empty) empty.classList.toggle('is-show', !!q && hits === 0);
    });
    search.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        search.value = '';
        search.dispatchEvent(new Event('input'));
        search.blur();
      }
    });
  }

  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      var val = input && input.value ? input.value.trim() : '';
      if (!val) return;
      toast(input.type === 'email' ? '已记下邮箱，上线后会开通订阅。' : '已记下留言，感谢反馈。');
      form.reset();
    });
  });

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (tocLinks.length) {
    var targets = tocLinks.map(function (a) {
      try { return document.getElementById(decodeURIComponent(a.hash.slice(1))); }
      catch (e) { return document.getElementById(a.hash.slice(1)); }
    });
    var setActive = function (id) {
      tocLinks.forEach(function (a) {
        a.classList.toggle('active', a.hash.slice(1) === id);
      });
    };
    var raf = null;
    var onScroll = function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var cur = '';
        targets.forEach(function (t) {
          if (t && t.getBoundingClientRect().top <= 96) cur = t.id;
        });
        setActive(cur);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
