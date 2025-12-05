// Transpiled JS version of script/script.ts for direct browser use
(function () {
    var Carousel = /** @class */ (function () {
        function Carousel(root, options) {
            if (options === void 0) { options = {}; }
            this.current = 0;
            this.intervalId = null;
            this.root = root;
            this.track = root.querySelector('.carousel__track');
            this.items = Array.from(root.querySelectorAll('.carousel__item'));
            this.prevBtns = Array.from(root.querySelectorAll('.carousel__control--prev'));
            this.nextBtns = Array.from(root.querySelectorAll('.carousel__control--next'));
            this.indicatorsContainer = root.querySelector('.carousel__indicators');
            this.options = Object.assign({ interval: 5000, wrap: true, pauseOnHover: true }, options);
            this.setup();
            this.bind();
            this.goTo(0);
            if (this.options.interval > 0)
                this.startAutoplay();
        }
        Carousel.prototype.setup = function () {
            var _this = this;
            this.track.style.display = 'flex';
            this.track.style.transition = 'transform 400ms ease';
            this.items.forEach(function (it, i) {
                it.style.minWidth = '100%';
                it.setAttribute('data-index', String(i));
            });
            if (this.indicatorsContainer) {
                this.indicatorsContainer.innerHTML = '';
                this.items.forEach(function (_, i) {
                    var btn = document.createElement('button');
                    btn.className = 'carousel__indicator';
                    btn.setAttribute('role', 'tab');
                    btn.setAttribute('aria-selected', 'false');
                    btn.setAttribute('aria-controls', "slide-" + i);
                    btn.dataset.index = String(i);
                    btn.title = "Diapositive " + (i + 1);
                    _this.indicatorsContainer.appendChild(btn);
                });
            }
        };
        Carousel.prototype.bind = function () {
            var _this = this;
            this.nextBtns.forEach(function (btn) { return btn.addEventListener('click', function () { return _this.next(); }); });
            this.prevBtns.forEach(function (btn) { return btn.addEventListener('click', function () { return _this.prev(); }); });
            this.indicatorsContainer === null || this.indicatorsContainer === void 0 ? void 0 : this.indicatorsContainer.addEventListener('click', function (e) {
                var t = e.target;
                if (t && t.dataset && t.dataset.index)
                    _this.goTo(Number(t.dataset.index));
            });
            if (this.options.pauseOnHover) {
                this.root.addEventListener('mouseenter', function () { return _this.stopAutoplay(); });
                this.root.addEventListener('mouseleave', function () { return _this.startAutoplay(); });
            }
            document.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight')
                    _this.next();
                if (e.key === 'ArrowLeft')
                    _this.prev();
            });
        };
        Carousel.prototype.updateIndicators = function () {
            var _this = this;
            var buttons = this.indicatorsContainer === null || this.indicatorsContainer === void 0 ? void 0 : this.indicatorsContainer.querySelectorAll('.carousel__indicator');
            buttons === null || buttons === void 0 ? void 0 : buttons.forEach(function (b, i) {
                if (i === _this.current) {
                    b.classList.add('is-active');
                    b.setAttribute('aria-selected', 'true');
                }
                else {
                    b.classList.remove('is-active');
                    b.setAttribute('aria-selected', 'false');
                }
            });
        };
        Carousel.prototype.goTo = function (index) {
            if (index < 0)
                index = this.options.wrap ? this.items.length - 1 : 0;
            if (index >= this.items.length)
                index = this.options.wrap ? 0 : this.items.length - 1;
            this.current = index;
            var offset = -index * 100;
            this.track.style.transform = "translateX(" + offset + "%)";
            this.updateIndicators();
        };
        Carousel.prototype.next = function () { this.goTo(this.current + 1); };
        Carousel.prototype.prev = function () { this.goTo(this.current - 1); };
        Carousel.prototype.startAutoplay = function () {
            var _this = this;
            this.stopAutoplay();
            if (this.options.interval > 0) {
                this.intervalId = window.setInterval(function () { return _this.next(); }, this.options.interval);
            }
        };
        Carousel.prototype.stopAutoplay = function () {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        };
        return Carousel;
    }());
    document.addEventListener('DOMContentLoaded', function () {
        var root = document.querySelector('.carousel');
        if (root)
            new Carousel(root, { interval: 4000, wrap: true, pauseOnHover: true });
    });
})();
