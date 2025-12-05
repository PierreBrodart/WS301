type CarouselOptions = {
	interval?: number;
	wrap?: boolean;
	pauseOnHover?: boolean;
};

class Carousel {
	root: HTMLElement;
	track: HTMLElement;
	items: HTMLElement[];
	prevBtns: HTMLElement[];
	nextBtns: HTMLElement[];
	indicatorsContainer: HTMLElement | null;
	current = 0;
	intervalId: number | null = null;
	options: Required<CarouselOptions>;

	constructor(root: HTMLElement, options: CarouselOptions = {}) {
		this.root = root;
		this.track = root.querySelector('.carousel__track') as HTMLElement;
		this.items = Array.from(root.querySelectorAll('.carousel__item')) as HTMLElement[];
		this.prevBtns = Array.from(root.querySelectorAll('.carousel__control--prev')) as HTMLElement[];
		this.nextBtns = Array.from(root.querySelectorAll('.carousel__control--next')) as HTMLElement[];
		this.indicatorsContainer = root.querySelector('.carousel__indicators');
		this.options = Object.assign({ interval: 5000, wrap: true, pauseOnHover: true }, options);

		this.setup();
		this.bind();
		this.goTo(0);
		if (this.options.interval > 0) this.startAutoplay();
	}

	setup() {
		// set width via CSS variables or inline styles if needed
		this.track.style.display = 'flex';
		this.track.style.transition = 'transform 400ms ease';
		this.items.forEach((it, i) => {
			(it as HTMLElement).style.minWidth = '100%';
			it.setAttribute('data-index', String(i));
		});

		if (this.indicatorsContainer) {
			this.indicatorsContainer.innerHTML = '';
			this.items.forEach((_, i) => {
				const btn = document.createElement('button');
				btn.className = 'carousel__indicator';
				btn.setAttribute('role', 'tab');
				btn.setAttribute('aria-selected', 'false');
				btn.setAttribute('aria-controls', `slide-${i}`);
				btn.dataset.index = String(i);
				btn.title = `Diapositive ${i + 1}`;
				this.indicatorsContainer!.appendChild(btn);
			});
		}
	}

	bind() {
		this.nextBtns.forEach(btn => btn.addEventListener('click', () => this.next()));
		this.prevBtns.forEach(btn => btn.addEventListener('click', () => this.prev()));

		this.indicatorsContainer?.addEventListener('click', (e) => {
			const t = e.target as HTMLElement;
			if (t && t.dataset && t.dataset.index) this.goTo(Number(t.dataset.index));
		});

		if (this.options.pauseOnHover) {
			this.root.addEventListener('mouseenter', () => this.stopAutoplay());
			this.root.addEventListener('mouseleave', () => this.startAutoplay());
		}

		document.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') this.next();
			if (e.key === 'ArrowLeft') this.prev();
		});
	}

	updateIndicators() {
		const buttons = this.indicatorsContainer?.querySelectorAll('.carousel__indicator');
		buttons?.forEach((b, i) => {
			if (i === this.current) {
				b.classList.add('is-active');
				b.setAttribute('aria-selected', 'true');
			} else {
				b.classList.remove('is-active');
				b.setAttribute('aria-selected', 'false');
			}
		});
	}

	goTo(index: number) {
		if (index < 0) index = this.options.wrap ? this.items.length - 1 : 0;
		if (index >= this.items.length) index = this.options.wrap ? 0 : this.items.length - 1;
		this.current = index;
		const offset = -index * 100;
		this.track.style.transform = `translateX(${offset}%)`;
		this.updateIndicators();
	}

	next() { this.goTo(this.current + 1); }
	prev() { this.goTo(this.current - 1); }

	startAutoplay() {
		this.stopAutoplay();
		if (this.options.interval > 0) {
			this.intervalId = window.setInterval(() => this.next(), this.options.interval);
		}
	}

	stopAutoplay() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('.carousel') as HTMLElement | null;
	if (root) new Carousel(root, { interval: 4000, wrap: true, pauseOnHover: true });
});

