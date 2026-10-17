import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Clock3, Coffee, Croissant, Leaf, MapPin, Menu, Wheat, X } from 'lucide-react';

const image = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const favorites = [
  { name: 'Almond Croissant', type: 'ALL-BUTTER · BAKED AT 5:30 AM', price: '$5.50', note: 'Laminated by hand, filled with almond cream, finished with toasted flakes.', photo: 'photo-1555507036-ab1f4038808a', alt: 'Golden flaky croissants fresh from the oven', icon: Croissant, tone: 'bg-amber-wash' },
  { name: 'Honey Oat Latte', type: 'DOUBLE ESPRESSO · LOCAL HONEY', price: '$6.00', note: 'Our house espresso with steamed oat milk and a little wildflower honey.', photo: 'photo-1509042239860-f550ce710b93', alt: 'A freshly made latte with delicate foam', icon: Coffee, tone: 'bg-latte-wash' },
  { name: 'Brown Butter Cake', type: 'SEASONAL · SERVES ONE', price: '$7.50', note: 'Tender brown-butter sponge with softly whipped vanilla cream.', photo: 'photo-1578985545062-69928b1d9587', alt: 'A beautifully layered cake topped with berries', icon: Leaf, tone: 'bg-rose-wash' },
  { name: 'Country Sourdough', type: '36-HOUR FERMENT · 800 G', price: '$12.00', note: 'Our daily loaf: crackling crust, open crumb, and just the right tang.', photo: 'photo-1509440159596-0249088772ff', alt: 'Rustic artisan sourdough loaf with a golden crust', icon: Wheat, tone: 'bg-wheat-wash' },
];

const hours = [
  ['Monday', 'Closed'],
  ['Tuesday – Friday', '7:30 am – 5:00 pm'],
  ['Saturday', '8:00 am – 4:00 pm'],
  ['Sunday', '8:00 am – 2:00 pm'],
];

function SectionIntro({ eyebrow, title, children, centered = false }) {
  return (
    <div className={`reveal mb-9 sm:mb-12 ${centered ? 'text-center' : ''}`}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[.19em] text-muted">{eyebrow}</p>
      <h2 className="font-heading text-4xl leading-[1.04] tracking-[-.035em] text-espresso sm:text-5xl md:text-6xl">{title}</h2>
      {children && <p className={`mt-4 max-w-xl text-base leading-7 text-muted ${centered ? 'mx-auto' : ''}`}>{children}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const weekday = new Date().getDay();
  const todayHours = weekday === 1 ? 'Closed' : weekday === 0 ? '8 am – 2 pm' : weekday === 6 ? '8 am – 4 pm' : '7:30 am – 5 pm';

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-cream text-espresso">
      <header className="relative z-30 border-b border-espresso/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="#home" className="flex items-center gap-3" aria-label="Miette Bakery home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber text-espresso shadow-[0_5px_12px_rgba(120,53,15,.16)]"><Wheat size={21} strokeWidth={1.7} /></span>
            <span><span className="block font-heading text-[22px] font-semibold leading-none tracking-[-.04em]">miette<span className="text-amber">.</span></span><span className="mt-1.5 block text-[9px] font-bold uppercase tracking-[.18em] text-muted">Bakery & café</span></span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a href="#menu" className="nav-link">Our menu</a><a href="#story" className="nav-link">Our story</a><a href="#visit" className="nav-link">Visit us</a>
          </nav>
          <div className="hidden items-center gap-5 lg:flex"><span className="flex items-center gap-2 text-xs font-semibold text-muted"><Clock3 size={15} className="text-amber" />Today · {todayHours}</span><a href="#menu" className="button-amber">Explore the menu <ArrowUpRight size={15} /></a></div>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-espresso/15 bg-white text-espresso md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && <nav className="absolute inset-x-0 top-full grid gap-1 border-t border-espresso/10 bg-cream px-5 py-4 shadow-lg md:hidden" aria-label="Mobile navigation">{[['Our menu', '#menu'], ['Our story', '#story'], ['Visit us', '#visit']].map(([name, href]) => <a key={name} href={href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-semibold text-espresso hover:bg-white">{name}</a>)}<a href="#menu" onClick={closeMenu} className="button-amber mt-2 justify-center">Explore the menu <ArrowUpRight size={15} /></a></nav>}
      </header>

      <main>
        <section id="home" className="grain relative overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:px-12 lg:pb-24 lg:pt-14">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.06fr_.94fr] lg:gap-14">
            <div className="reveal relative order-2 min-h-[380px] overflow-hidden rounded-[30px] shadow-clay sm:min-h-[480px] lg:order-1 lg:min-h-[620px] lg:rounded-[38px]">
              <img src={image('photo-1676277798897-faffacf8b54c', 1500)} alt="Fresh croissant, cheesecake, and latte on a café table" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-espresso/5" />
              <span className="absolute left-5 top-5 rounded-full border border-white/70 bg-cream/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-espresso shadow-sm sm:left-7 sm:top-7">Small batch · made with care</span>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white sm:bottom-7 sm:left-7 sm:right-7"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-white/90">The morning ritual</p><p className="mt-1 font-heading text-2xl sm:text-3xl">Warm from our oven.</p></div><span className="grid h-12 w-12 place-items-center rounded-full bg-cream text-espresso"><ArrowDown size={19} /></span></div>
            </div>
            <div className="reveal order-1 pb-1 lg:order-2 lg:pl-2">
              <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-muted"><span className="h-px w-7 bg-amber" />Your neighborhood bakery</p>
              <h1 className="font-heading text-[clamp(3.75rem,8.4vw,7.5rem)] font-medium leading-[.9] tracking-[-.055em] text-espresso">Freshly<br /><span className="italic text-amber">baked</span> daily.</h1>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted sm:text-lg">Slow mornings, warm bread, and coffee worth lingering over. Everything at Miette is made by hand, in small batches, every single day.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4"><a href="#menu" className="button-amber min-h-14 px-6">View the menu <ArrowRight size={17} /></a><a href="#visit" className="button-outline min-h-14 px-6">Come say hello <MapPin size={16} /></a></div>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-espresso/15 pt-5 text-xs font-semibold text-muted"><span className="flex items-center gap-2"><Clock3 size={15} className="text-amber" />Today · {todayHours}</span><span className="hidden h-4 w-px bg-espresso/20 sm:block" /><span>Fresh bread out by 8 am</span></div>
            </div>
          </div>
          <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-espresso/10 pt-4 text-[10px] font-bold uppercase tracking-[.17em] text-muted"><span>Good things take time · naturally leavened, always</span><span className="hidden sm:block">Est. 2018 · Made in the neighborhood</span></div>
        </section>

        <section id="menu" className="bg-[#F4EBDD] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="reveal mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end"><SectionIntro eyebrow="A few house favorites · 01" title={<>Made fresh.<br className="hidden sm:block" /> Gone <span className="italic text-amber">by noon.</span></>}><span className="sr-only">Our menu</span></SectionIntro><a href="#visit" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-espresso transition-colors hover:text-amber sm:mb-12">See you at the counter <ArrowRight size={16} /></a></div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {favorites.map((item, index) => {
                const Icon = item.icon;
                return <article key={item.name} className="reveal group overflow-hidden rounded-[26px] bg-white shadow-clay transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-hover" style={{ transitionDelay: `${index * 75}ms` }}>
                  <div className={`relative aspect-[1.2] overflow-hidden ${item.tone}`}><img src={image(item.photo, 900)} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" /><span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/95 text-espresso shadow-sm"><Icon size={18} strokeWidth={1.7} /></span></div>
                  <div className="p-5 sm:p-6"><p className="text-[9px] font-bold tracking-[.15em] text-muted">{item.type}</p><div className="mt-2 flex items-start justify-between gap-2"><h3 className="font-heading text-[24px] leading-tight text-espresso">{item.name}</h3><span className="shrink-0 pt-1 text-sm font-extrabold text-espresso">{item.price}</span></div><p className="mt-3 min-h-[66px] text-sm leading-[1.55] text-muted">{item.note}</p><a href="#visit" className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-extrabold uppercase tracking-[.1em] text-espresso transition-colors hover:text-amber">Find it at the café <ArrowRight size={15} /></a></div>
                </article>;
              })}
            </div>
            <p className="mt-6 text-xs text-muted">Our menu changes with the season. Ask us what just came out of the oven.</p>
          </div>
        </section>

        <section id="story" className="grain px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="reveal relative order-2 min-h-[350px] overflow-hidden rounded-[30px] shadow-clay sm:min-h-[470px] lg:order-1"><img src={image('photo-1509440159596-0249088772ff', 1400)} alt="Rustic artisan bread with a crisp, golden crust" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><span className="absolute bottom-5 left-5 rounded-full bg-cream px-4 py-2 text-xs font-bold text-espresso shadow-sm">Flour, water, salt & time</span></div>
            <div className="reveal order-1 lg:order-2"><SectionIntro eyebrow="A slower way of doing things · 02" title={<>A little flour.<br /><span className="italic text-amber">A lot of heart.</span></>}><span className="sr-only">Our story</span></SectionIntro><p className="-mt-6 text-base leading-8 text-muted">Miette began with a tiny oven, a borrowed starter, and the feeling that a neighborhood could use a place to linger. We still mix by hand, let our dough take its time, and pull pastries from the oven in small batches throughout the morning.</p><p className="mt-4 text-base leading-8 text-muted">We work with nearby farms, seasonal fruit, and coffee roasters who care as much about their craft as we do. Nothing complicated. Just good ingredients, made with patience.</p><a href="#visit" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-espresso/20 px-5 text-sm font-bold text-espresso transition-all hover:border-amber hover:bg-amber hover:text-espresso">A little more about us <ArrowUpRight size={16} /></a><div className="mt-8 flex items-center gap-3 text-xs font-bold text-muted"><span className="grid h-10 w-10 place-items-center rounded-full bg-white text-amber shadow-sm"><Leaf size={17} /></span>Locally milled flour · seasonal ingredients</div></div>
          </div>
        </section>

        <section id="visit" className="bg-[#EADBC5] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-12">
            <div className="reveal rounded-[28px] bg-cream p-6 shadow-clay sm:p-9"><SectionIntro eyebrow="Come on by · 03" title={<>There’s a seat<br />with your <span className="italic text-amber">name on it.</span></>}><span className="sr-only">Hours and location</span></SectionIntro><div className="-mt-5 divide-y divide-espresso/10 border-y border-espresso/10">{hours.map(([day, time]) => <div key={day} className="flex items-center justify-between gap-4 py-3.5 text-sm"><span className="font-semibold text-espresso">{day}</span><span className="text-right font-semibold text-muted">{time}</span></div>)}</div><div className="mt-6 flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-amber" size={19} /><div><p className="text-sm font-bold text-espresso">42 Orchard Street</p><p className="mt-1 text-sm text-muted">New York, NY 10002 · Lower East Side</p></div></div><a className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-espresso px-5 text-xs font-bold text-cream transition-colors hover:bg-amber hover:text-espresso" href="https://maps.google.com/?q=42+Orchard+Street+New+York+NY+10002" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a></div>
            <a className="reveal map-card group relative flex min-h-[340px] overflow-hidden rounded-[28px] border border-white/65 shadow-clay sm:min-h-[470px]" href="https://maps.google.com/?q=42+Orchard+Street+New+York+NY+10002" target="_blank" rel="noreferrer" aria-label="Open directions to Miette Bakery on Google Maps"><div className="map-lines absolute inset-0" /><div className="absolute left-[28%] top-[23%] h-[42%] w-[1px] rotate-[28deg] bg-white/80" /><div className="absolute left-[58%] top-[15%] h-[65%] w-[2px] rotate-[28deg] bg-white/90" /><div className="absolute left-[12%] top-[54%] h-[2px] w-[75%] -rotate-[17deg] bg-white/90" /><div className="absolute left-[4%] top-[34%] h-[1px] w-[92%] rotate-[9deg] bg-white/80" /><div className="absolute left-[37%] top-[42%] h-[12px] w-[55%] -rotate-[29deg] rounded-full bg-[#E2C995]" /><div className="absolute left-[25%] top-[44%] h-[12px] w-[55%] rotate-[48deg] rounded-full bg-[#E8D5B6]" /><span className="absolute left-[52%] top-[49%] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[5px] border-cream bg-amber text-espresso shadow-[0_5px_20px_rgba(69,26,3,.24)] transition-transform group-hover:scale-110"><MapPin size={22} fill="currentColor" /></span><span className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-2xl bg-cream/95 p-4 shadow-lg backdrop-blur sm:bottom-7 sm:left-7 sm:right-7 sm:p-5"><span><span className="block text-[10px] font-bold uppercase tracking-[.15em] text-muted">Find us on</span><span className="mt-1 block font-heading text-xl text-espresso">The Lower East Side</span></span><span className="grid h-11 w-11 place-items-center rounded-full bg-amber text-espresso"><ArrowUpRight size={17} /></span></span></a>
          </div>
        </section>

        <section className="bg-espresso px-5 py-14 text-cream sm:px-8 md:py-16 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_.9fr] md:items-center">
            <div className="reveal"><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-amber">A little something in your inbox</p><h2 className="font-heading text-3xl leading-tight sm:text-4xl">Good mornings, <span className="italic text-[#F3C56B]">occasionally.</span></h2><p className="mt-3 max-w-md text-sm leading-6 text-[#F3E4CC]">New bakes, seasonal menus, and the odd note from our kitchen. Never the daily sort.</p></div>
            <form className="reveal" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}>
              {subscribed ? <p role="status" className="flex items-center gap-3 rounded-2xl border border-cream/25 bg-cream/10 px-5 py-5 text-sm font-semibold text-cream"><Check size={18} className="text-[#F3C56B]" /> You’re on the list. See you soon.</p> : <div className="flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" className="min-h-14 min-w-0 flex-1 rounded-full border border-cream/35 bg-transparent px-5 text-sm text-cream outline-none placeholder:text-[#F3E4CC] focus:border-[#F3C56B] focus:ring-2 focus:ring-[#F3C56B]/35" type="email" name="email" placeholder="Your email address" autoComplete="email" required /><button className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-amber px-6 text-sm font-extrabold text-espresso transition-all hover:bg-[#F3C56B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream" type="submit">Count me in <ArrowRight size={17} /></button></div>}
              <p className="mt-3 text-xs text-[#F3E4CC]">By subscribing, you agree to hear from Miette now and then. Unsubscribe anytime.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-espresso px-5 pb-7 text-cream sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 border-t border-cream/20 pt-7 sm:flex-row sm:items-center sm:justify-between"><a href="#home" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber text-espresso"><Wheat size={19} /></span><span className="font-heading text-xl font-semibold">miette<span className="text-[#F3C56B]">.</span><span className="ml-2 font-sans text-xs font-semibold text-[#F3E4CC]">Bakery & café</span></span></a><p className="text-xs text-[#F3E4CC]">42 Orchard Street · New York, NY <span className="mx-2 text-cream/50">·</span> Tue–Sun, from 7:30 am</p><a href="https://www.instagram.com/" className="flex min-h-11 items-center gap-2 text-sm font-bold text-cream transition-colors hover:text-[#F3C56B]">Follow along <ArrowUpRight size={15} /></a></div>
        <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-2 border-t border-cream/15 pt-5 text-[11px] text-[#F3E4CC] sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Miette Bakery & Café. All good things baked fresh.</p><p>Sample location and hours — replace with your bakery details.</p></div>
      </footer>
    </div>
  );
}

export default App;
