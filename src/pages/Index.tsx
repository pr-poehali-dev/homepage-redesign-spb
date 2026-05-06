import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/848639bc-f2ca-455c-9fae-6c8499cdc395/files/4ad32356-a73a-48dc-a034-3c1d4a53983b.jpg";

const NAV_LINKS = [
  { label: "Главная", id: "home" },
  { label: "Каталог", id: "catalog" },
  { label: "О компании", id: "about" },
  { label: "Блог", id: "blog" },
  { label: "Доставка", id: "delivery" },
  { label: "Контакты", id: "contacts" },
];

const PRODUCTS = [
  { id: 1, name: "Марракеш Терра", size: "60×60", material: "Керамогранит", color: "terracotta", price: 1890, tag: "Хит", img: "🟫" },
  { id: 2, name: "Арктик Уайт", size: "30×60", material: "Керамика", color: "white", price: 1240, tag: "Новинка", img: "⬜" },
  { id: 3, name: "Базальт Про", size: "60×120", material: "Керамогранит", color: "gray", price: 3450, tag: "", img: "⬛" },
  { id: 4, name: "Лимонный Зест", size: "20×20", material: "Мозаика", color: "yellow", price: 890, tag: "Акция", img: "🟨" },
  { id: 5, name: "Океан Дип", size: "30×90", material: "Керамика", color: "blue", price: 2100, tag: "", img: "🟦" },
  { id: 6, name: "Виллы Тоскана", size: "45×45", material: "Керамогранит", color: "terracotta", price: 2750, tag: "Хит", img: "🟧" },
  { id: 7, name: "Коко Сэнд", size: "60×60", material: "Керамика", color: "beige", price: 1650, tag: "", img: "🟫" },
  { id: 8, name: "Нуар Абсолют", size: "60×120", material: "Керамогранит", color: "gray", price: 4200, tag: "Новинка", img: "⬛" },
];

const COLORS = [
  { id: "all", label: "Все", hex: "transparent" },
  { id: "white", label: "Белый", hex: "#f5f5f0" },
  { id: "beige", label: "Бежевый", hex: "#d4b896" },
  { id: "terracotta", label: "Терракот", hex: "#c1440e" },
  { id: "gray", label: "Серый", hex: "#6b7280" },
  { id: "yellow", label: "Жёлтый", hex: "#eab308" },
  { id: "blue", label: "Синий", hex: "#3b82f6" },
];

const MATERIALS = ["Все", "Керамогранит", "Керамика", "Мозаика"];
const SIZES = ["Все", "20×20", "30×60", "30×90", "45×45", "60×60", "60×120"];

const BLOG_POSTS = [
  { date: "28 апр 2026", tag: "Тренды", title: "Террацо возвращается: почему этот стиль снова в моде", desc: "Рассказываем, как включить мозаичную плитку в современный интерьер без претензий на ретро.", emoji: "🎨" },
  { date: "14 апр 2026", tag: "Советы", title: "Как выбрать плитку для ванной комнаты без ошибок", desc: "Разбираем ключевые параметры: влагостойкость, размер, укладка и уход.", emoji: "🛁" },
  { date: "2 апр 2026", tag: "Кейс", title: "Проект 'Лофт на Садовом': 200 м² в одном стиле", desc: "Как мы подобрали единую концепцию для квартиры с открытой планировкой.", emoji: "🏠" },
];

const CITIES = [
  "Москва", "Санкт-Петербург", "Краснодар", "Екатеринбург",
  "Новосибирск", "Казань", "Нижний Новгород", "Ростов-на-Дону",
];

const MARQUEE_ITEMS = [
  "Бесплатная доставка от 50 000 ₽",
  "Более 3 000 позиций в наличии",
  "Скидка 10% на первый заказ",
  "Примерка плитки у вас дома",
  "Монтаж «под ключ»",
  "Гарантия 5 лет",
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [city, setCity] = useState("Москва");
  const [cityOpen, setCityOpen] = useState(false);
  const [filterColor, setFilterColor] = useState("all");
  const [filterMaterial, setFilterMaterial] = useState("Все");
  const [filterSize, setFilterSize] = useState("Все");
  const [filterPrice, setFilterPrice] = useState(5000);
  const [cart, setCart] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    if (filterColor !== "all" && p.color !== filterColor) return false;
    if (filterMaterial !== "Все" && p.material !== filterMaterial) return false;
    if (filterSize !== "Все" && p.size !== filterSize) return false;
    if (p.price > filterPrice) return false;
    return true;
  });

  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.size.includes(searchQuery)
      )
    : [];

  const addToCart = (id: number) => {
    setCart((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!cityOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-city-picker]")) setCityOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cityOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-search-bar]")) setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); });
      },
      { threshold: 0.4 }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "hsl(30 20% 97%)" }}>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 h-16">
          {/* LOGO */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: "hsl(16 85% 48%)" }}>
              <span className="text-white font-display font-bold text-sm">TF</span>
            </div>
            <span className="hidden lg:block font-display font-bold text-xl tracking-wide" style={{ color: "hsl(20 15% 10%)" }}>TERRAFORMA</span>
          </div>

          {/* SEARCH BAR */}
          <div className="flex-1 relative max-w-xl" data-search-bar>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white transition-all focus-within:border-orange-400 focus-within:shadow-md" style={{ borderColor: "hsl(30 20% 85%)" }}>
              <Icon name="Search" size={17} style={{ color: "hsl(16 85% 48%)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Поиск по каталогу..."
                className="flex-1 text-sm font-body outline-none bg-transparent placeholder-gray-400"
                style={{ color: "hsl(20 15% 10%)" }}
                onKeyDown={(e) => { if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); } }}
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Icon name="X" size={15} />
                </button>
              )}
            </div>

            {/* DROPDOWN RESULTS */}
            {searchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50" style={{ borderColor: "hsl(30 20% 88%)" }}>
                {searchQuery.trim().length <= 1 ? (
                  <div className="p-4">
                    <p className="text-xs text-gray-400 font-body mb-3 uppercase tracking-wide">Популярные запросы</p>
                    <div className="flex flex-wrap gap-2">
                      {["Керамогранит", "Мозаика", "60×60", "Белая плитка", "Терракот"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1.5 rounded-full text-xs font-body border hover:border-orange-400 hover:text-orange-600 transition-all"
                          style={{ borderColor: "hsl(30 20% 88%)", color: "hsl(20 15% 45%)" }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="px-5 py-6 text-center">
                    <p className="text-sm text-gray-500 font-body">Ничего не найдено по «{searchQuery}»</p>
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b" style={{ borderColor: "hsl(30 20% 92%)" }}>
                      <span className="text-xs text-gray-400 font-body">Найдено: <b className="text-gray-700">{searchResults.length}</b></span>
                    </div>
                    {searchResults.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { scrollTo("catalog"); setSearchOpen(false); setSearchQuery(""); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors border-b last:border-0 text-left"
                        style={{ borderColor: "hsl(30 20% 92%)" }}
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: "hsl(30 20% 95%)" }}>
                          {p.img}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold text-sm truncate" style={{ color: "hsl(20 15% 10%)" }}>{p.name}</div>
                          <div className="text-xs text-gray-400 font-body">{p.material} · {p.size} см</div>
                        </div>
                        <div className="font-display font-bold text-sm flex-shrink-0" style={{ color: "hsl(16 85% 48%)" }}>
                          {p.price.toLocaleString()} ₽
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          <nav className="hidden lg:flex items-center gap-5 flex-shrink-0">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-link text-sm font-body font-medium transition-colors ${activeNav === link.id ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* CITY PICKER */}
            <div className="relative hidden md:block" data-city-picker>
              <button
                onClick={() => setCityOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all"
              >
                <Icon name="MapPin" size={14} style={{ color: "hsl(16 85% 48%)" }} />
                {city}
                <Icon name={cityOpen ? "ChevronUp" : "ChevronDown"} size={14} />
              </button>
              {cityOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-orange-100/60 py-1 z-50">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCity(c); setCityOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-body transition-colors flex items-center gap-2 ${c === city ? "text-orange-600 font-medium bg-orange-50" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      {c === city && <Icon name="Check" size={13} style={{ color: "hsl(16 85% 48%)" }} />}
                      {c !== city && <span className="w-[13px]" />}
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo("catalog")}
              className="relative p-2 rounded-full hover:bg-orange-50 transition-colors"
              aria-label="Корзина"
            >
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background: "hsl(16 85% 48%)" }}>
                  {cart.length}
                </span>
              )}
            </button>
            <a
              href="tel:88125662308"
              className="hidden sm:flex flex-col items-end leading-none gap-0.5 hover:opacity-80 transition-opacity"
            >
              <span className="font-display font-bold text-base tracking-wide" style={{ color: "hsl(20 15% 10%)" }}>8 (812) 566-2308</span>
              <span className="text-xs font-body" style={{ color: "hsl(20 10% 55%)" }}>ПН – ВС: 9:00 – 21:00</span>
            </a>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-orange-100 px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left text-base font-medium py-1 text-gray-700 hover:text-orange-600 transition-colors">
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MARQUEE BANNER */}
      <div className="fixed top-16 left-0 right-0 z-40 overflow-hidden py-2" style={{ background: "hsl(16 85% 48%)" }}>
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: "200%" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-white text-sm font-medium font-body mx-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 inline-block"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-28 overflow-hidden gradient-mesh noise-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-1/2 h-full opacity-20">
            {[...Array(6)].map((_, row) => (
              <div key={row} className="flex">
                {[...Array(5)].map((_, col) => (
                  <div
                    key={col}
                    className="border border-orange-300/40"
                    style={{
                      width: 80,
                      height: 80,
                      background: (row + col) % 3 === 0 ? "hsl(16 85% 48% / 0.08)" : (row + col) % 3 === 1 ? "hsl(52 95% 52% / 0.06)" : "transparent",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10" style={{ background: "hsl(16 85% 48%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 font-body" style={{ background: "hsl(52 95% 52% / 0.2)", color: "hsl(40 80% 30%)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse-dot inline-block" style={{ background: "hsl(52 95% 52%)" }}></span>
              Более 3 000 позиций в наличии
            </div>
            <h1 className="font-display text-6xl sm:text-7xl font-bold leading-none mb-6 animate-fade-up" style={{ color: "hsl(20 15% 10%)" }}>
              ПЛИТКА,<br />
              <span style={{ color: "hsl(16 85% 48%)" }}>КОТОРАЯ</span><br />
              ГОВОРИТ
            </h1>
            <p className="font-body text-lg text-gray-600 mb-8 max-w-md animate-fade-up animate-fade-up-delay-1">
              Керамика и керамогранит для квартир, домов и коммерческих пространств. Доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up animate-fade-up-delay-2">
              <button
                onClick={() => scrollTo("catalog")}
                className="px-8 py-4 rounded-sm font-display font-semibold text-white text-lg tracking-wide transition-all hover:opacity-90"
                style={{ background: "hsl(16 85% 48%)", boxShadow: "0 4px 20px hsl(16 85% 48% / 0.35)" }}
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="px-8 py-4 rounded-sm font-display font-semibold text-lg tracking-wide border-2 transition-all hover:bg-orange-50"
                style={{ borderColor: "hsl(16 85% 48%)", color: "hsl(16 85% 48%)" }}
              >
                Консультация
              </button>
            </div>

            <div className="flex gap-8 mt-12 animate-fade-up animate-fade-up-delay-3">
              {[["3 000+", "позиций"], ["500+", "проектов"], ["5 лет", "гарантия"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl font-bold" style={{ color: "hsl(16 85% 48%)" }}>{num}</div>
                  <div className="text-sm text-gray-500 font-body">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up animate-fade-up-delay-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-grid-float" style={{ boxShadow: "0 30px 80px hsl(16 85% 48% / 0.2)" }}>
              <img src={HERO_IMAGE} alt="Коллекция плитки" className="w-full h-[460px] object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(20 15% 10% / 0.4) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: "hsl(16 85% 48% / 0.1)" }}>🏆</div>
                  <div>
                    <div className="font-display font-semibold text-sm">Коллекция 2026</div>
                    <div className="text-xs text-gray-500 font-body">Более 40 новинок уже в наличии</div>
                  </div>
                  <button onClick={() => scrollTo("catalog")} className="ml-auto p-2 rounded-lg text-white" style={{ background: "hsl(16 85% 48%)" }}>
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 rounded-xl px-4 py-2 font-display font-bold text-sm shadow-lg">
              −10% на старт
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest font-body" style={{ color: "hsl(16 85% 48%)" }}>Наш каталог</span>
              <h2 className="font-display text-5xl font-bold mt-1" style={{ color: "hsl(20 15% 10%)" }}>ВЫБЕРИ СВОЮ ПЛИТКУ</h2>
            </div>
            <p className="text-gray-500 font-body text-sm max-w-xs">Фильтруй по параметрам и находи идеальное покрытие</p>
          </div>

          <div className="grid md:grid-cols-[260px_1fr] gap-8">
            {/* FILTERS */}
            <aside className="space-y-6">
              <div className="p-5 rounded-xl border" style={{ borderColor: "hsl(30 20% 88%)", background: "hsl(30 20% 97%)" }}>
                <h3 className="font-display font-semibold text-base mb-4 uppercase tracking-wide">Цвет</h3>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setFilterColor(c.id)}
                      title={c.label}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium font-body transition-all ${filterColor === c.id ? "border-orange-500 shadow-sm" : "border-transparent hover:border-gray-300"}`}
                      style={{ background: filterColor === c.id ? "hsl(16 85% 48% / 0.1)" : "white" }}
                    >
                      <span className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" style={{ background: c.hex }} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl border" style={{ borderColor: "hsl(30 20% 88%)", background: "hsl(30 20% 97%)" }}>
                <h3 className="font-display font-semibold text-base mb-4 uppercase tracking-wide">Материал</h3>
                <div className="flex flex-col gap-2">
                  {MATERIALS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setFilterMaterial(m)}
                      className={`text-left px-3 py-2 rounded-lg text-sm font-body transition-all ${filterMaterial === m ? "text-white" : "text-gray-700 hover:bg-orange-50"}`}
                      style={{ background: filterMaterial === m ? "hsl(16 85% 48%)" : "transparent" }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl border" style={{ borderColor: "hsl(30 20% 88%)", background: "hsl(30 20% 97%)" }}>
                <h3 className="font-display font-semibold text-base mb-4 uppercase tracking-wide">Размер</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-body border transition-all ${filterSize === s ? "text-white border-transparent" : "text-gray-600 border-gray-200 hover:border-orange-300"}`}
                      style={{ background: filterSize === s ? "hsl(16 85% 48%)" : "transparent" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl border" style={{ borderColor: "hsl(30 20% 88%)", background: "hsl(30 20% 97%)" }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-semibold text-base uppercase tracking-wide">Цена, ₽/м²</h3>
                  <span className="font-display font-bold text-sm" style={{ color: "hsl(16 85% 48%)" }}>до {filterPrice.toLocaleString()} ₽</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={50}
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(+e.target.value)}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1 font-body">
                  <span>500 ₽</span>
                  <span>5 000 ₽</span>
                </div>
              </div>

              <button
                onClick={() => { setFilterColor("all"); setFilterMaterial("Все"); setFilterSize("Все"); setFilterPrice(5000); }}
                className="w-full py-3 rounded-lg border text-sm font-medium font-body text-gray-500 hover:text-orange-600 hover:border-orange-300 transition-all"
                style={{ borderColor: "hsl(30 20% 88%)" }}
              >
                Сбросить фильтры
              </button>
            </aside>

            {/* PRODUCTS GRID */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500 font-body">Найдено: <b className="text-gray-800">{filtered.length}</b> позиций</span>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                  <Icon name="SearchX" size={48} />
                  <p className="mt-4 font-body text-lg">Ничего не найдено</p>
                  <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((product) => (
                    <div key={product.id} className="tile-card card-hover bg-white rounded-2xl overflow-hidden border relative group cursor-pointer" style={{ borderColor: "hsl(30 20% 88%)" }}>
                      {product.tag && (
                        <span
                          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-xs font-bold font-body"
                          style={{
                            background: product.tag === "Акция" ? "hsl(52 95% 52%)" : product.tag === "Новинка" ? "hsl(200 80% 50%)" : "hsl(16 85% 48%)",
                            color: product.tag === "Акция" ? "hsl(20 15% 10%)" : "white"
                          }}
                        >
                          {product.tag}
                        </span>
                      )}
                      <div className="h-48 flex items-center justify-center text-7xl relative overflow-hidden" style={{ background: "hsl(30 20% 95%)" }}>
                        <span>{product.img}</span>
                        <div className="tile-overlay absolute inset-0 flex items-center justify-center" style={{ background: "hsl(16 85% 48% / 0.9)" }}>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl font-body font-medium text-sm"
                            style={{ color: "hsl(16 85% 48%)" }}
                          >
                            <Icon name={cart.includes(product.id) ? "Check" : "ShoppingCart"} size={16} />
                            {cart.includes(product.id) ? "В корзине" : "В корзину"}
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-sm leading-tight mb-1" style={{ color: "hsl(20 15% 10%)" }}>{product.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-gray-400 font-body">{product.material}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs text-gray-400 font-body">{product.size} см</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-lg" style={{ color: "hsl(16 85% 48%)" }}>
                            {product.price.toLocaleString()} ₽<span className="text-xs font-normal text-gray-400">/м²</span>
                          </span>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="p-2 rounded-lg transition-all"
                            style={{
                              background: cart.includes(product.id) ? "hsl(16 85% 48%)" : "hsl(30 20% 93%)",
                              color: cart.includes(product.id) ? "white" : "hsl(20 15% 40%)"
                            }}
                          >
                            <Icon name={cart.includes(product.id) ? "Check" : "Plus"} size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative overflow-hidden" style={{ background: "hsl(20 15% 10%)" }}>
        <div className="absolute inset-0 opacity-5">
          <div className="grid" style={{ gridTemplateColumns: "repeat(12, 1fr)", height: "100%" }}>
            {[...Array(48)].map((_, i) => (
              <div key={i} className="border border-white/20 aspect-square" />
            ))}
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest font-body" style={{ color: "hsl(16 85% 48%)" }}>О компании</span>
              <h2 className="font-display text-5xl font-bold text-white mt-2 mb-6">МЫ ДЕЛАЕМ<br /><span style={{ color: "hsl(16 85% 48%)" }}>ПРОСТРАНСТВА</span><br />ЖИВЫМИ</h2>
              <p className="font-body text-gray-400 text-base leading-relaxed mb-8">
                TERRAFORMA — это команда архитекторов, дизайнеров и строителей, которые понимают, что правильная плитка меняет всё. Мы работаем с 2010 года и реализовали более 500 проектов по всей России.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "Award", title: "Сертифицированный импорт", desc: "Испания, Италия, Турция" },
                  { icon: "Truck", title: "Доставка за 3–5 дней", desc: "По всей России" },
                  { icon: "Layers", title: "3 000+ позиций", desc: "Постоянный сток" },
                  { icon: "Users", title: "Бесплатная консультация", desc: "Дизайнеры на связи" },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl" style={{ background: "hsl(20 15% 16%)" }}>
                    <div className="mb-2" style={{ color: "hsl(16 85% 48%)" }}>
                      <Icon name={item.icon} size={22} />
                    </div>
                    <div className="font-display font-semibold text-white text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-gray-400 font-body">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "500+", label: "Успешных проектов" },
                { num: "15", label: "Лет на рынке" },
                { num: "98%", label: "Довольных клиентов" },
                { num: "12", label: "Городов России" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl flex flex-col gap-2" style={{ background: "hsl(20 15% 16%)", border: "1px solid hsl(20 15% 22%)" }}>
                  <span className="font-display font-bold text-4xl" style={{ color: "hsl(16 85% 48%)" }}>{stat.num}</span>
                  <span className="text-gray-400 text-sm font-body">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24" style={{ background: "hsl(30 20% 97%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest font-body" style={{ color: "hsl(16 85% 48%)" }}>Блог</span>
              <h2 className="font-display text-5xl font-bold mt-1" style={{ color: "hsl(20 15% 10%)" }}>ИДЕИ И ТРЕНДЫ</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-medium font-body hover:text-orange-600 transition-colors" style={{ color: "hsl(16 85% 48%)" }}>
              Все статьи <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <article key={i} className="card-hover bg-white rounded-2xl overflow-hidden border cursor-pointer" style={{ borderColor: "hsl(30 20% 88%)" }}>
                <div className="h-44 flex items-center justify-center text-5xl" style={{ background: `hsl(${i === 0 ? "16 85% 48% / 0.1" : i === 1 ? "200 80% 50% / 0.1" : "52 95% 52% / 0.15"})` }}>
                  {post.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-2 py-1 rounded-md font-body font-medium" style={{ background: "hsl(16 85% 48% / 0.1)", color: "hsl(16 85% 48%)" }}>{post.tag}</span>
                    <span className="text-xs text-gray-400 font-body">{post.date}</span>
                  </div>
                  <h3 className="font-display font-semibold text-base leading-tight mb-2" style={{ color: "hsl(20 15% 10%)" }}>{post.title}</h3>
                  <p className="text-sm text-gray-500 font-body leading-relaxed">{post.desc}</p>
                  <button className="mt-4 flex items-center gap-1 text-sm font-medium font-body" style={{ color: "hsl(16 85% 48%)" }}>
                    Читать <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest font-body" style={{ color: "hsl(16 85% 48%)" }}>Доставка и оплата</span>
            <h2 className="font-display text-5xl font-bold mt-1" style={{ color: "hsl(20 15% 10%)" }}>КАК МЫ РАБОТАЕМ</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { step: "01", icon: "MousePointerClick" as const, title: "Выбираете", desc: "Подбираете товар в каталоге или с помощью нашего дизайнера" },
              { step: "02", icon: "CreditCard" as const, title: "Оплачиваете", desc: "Онлайн, наличными или безналичным расчётом для ЮЛ" },
              { step: "03", icon: "Package" as const, title: "Отправляем", desc: "Комплектуем и отправляем в течение 1–2 рабочих дней" },
              { step: "04", icon: "Home" as const, title: "Получаете", desc: "До двери или до терминала транспортной компании" },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110" style={{ background: "hsl(16 85% 48% / 0.1)" }}>
                  <Icon name={item.icon} size={24} style={{ color: "hsl(16 85% 48%)" }} />
                </div>
                <div className="font-display font-bold text-4xl mb-2" style={{ color: "hsl(30 20% 92%)" }}>{item.step}</div>
                <h3 className="font-display font-semibold text-xl mb-2" style={{ color: "hsl(20 15% 10%)" }}>{item.title}</h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "Truck" as const, title: "Транспортная компания", price: "от 800 ₽", desc: "СДЭК, Деловые линии, ПЭК — доставка до терминала или до двери" },
              { icon: "Star" as const, title: "Бесплатная доставка", price: "от 50 000 ₽", desc: "При заказе от 50 000 ₽ — доставка по Москве и МО бесплатно" },
              { icon: "MapPin" as const, title: "Самовывоз", price: "Бесплатно", desc: "Со склада в Москве, Санкт-Петербурге и Краснодаре" },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border" style={{ borderColor: "hsl(30 20% 88%)", background: "hsl(30 20% 97%)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(16 85% 48%)" }}>
                    <Icon name={item.icon} size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base mb-1" style={{ color: "hsl(20 15% 10%)" }}>{item.title}</h3>
                    <span className="font-display font-bold text-lg" style={{ color: "hsl(16 85% 48%)" }}>{item.price}</span>
                    <p className="text-xs text-gray-500 font-body mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative overflow-hidden" style={{ background: "hsl(16 85% 48%)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest font-body text-orange-200">Контакты</span>
              <h2 className="font-display text-5xl font-bold text-white mt-2 mb-6">ДАВАЙТЕ<br />ПОГОВОРИМ</h2>
              <p className="font-body text-orange-100 text-base leading-relaxed mb-8">
                Наши консультанты помогут подобрать плитку под ваш проект, рассчитают количество и стоимость доставки.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Phone" as const, label: "+7 (800) 555-35-35", sub: "Бесплатно, пн–пт 9:00–20:00" },
                  { icon: "Mail" as const, label: "hello@terraforma.ru", sub: "Ответим в течение 2 часов" },
                  { icon: "MapPin" as const, label: "Москва, ул. Садовая, 12", sub: "Шоурум открыт ежедневно 10:00–19:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20">
                      <Icon name={c.icon} size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-white">{c.label}</div>
                      <div className="text-xs text-orange-200 font-body">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="font-display font-bold text-2xl mb-6" style={{ color: "hsl(20 15% 10%)" }}>Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 font-body mb-1 block">Ваше имя</label>
                  <input type="text" placeholder="Иван Иванов" className="w-full px-4 py-3 rounded-xl border text-sm font-body focus:outline-none focus:ring-2 focus:ring-orange-400" style={{ borderColor: "hsl(30 20% 88%)" }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 font-body mb-1 block">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded-xl border text-sm font-body focus:outline-none focus:ring-2 focus:ring-orange-400" style={{ borderColor: "hsl(30 20% 88%)" }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 font-body mb-1 block">Комментарий</label>
                  <textarea rows={3} placeholder="Опишите ваш проект или задайте вопрос..." className="w-full px-4 py-3 rounded-xl border text-sm font-body focus:outline-none resize-none focus:ring-2 focus:ring-orange-400" style={{ borderColor: "hsl(30 20% 88%)" }} />
                </div>
                <button className="w-full py-4 rounded-xl font-display font-semibold text-lg text-white transition-all hover:opacity-90" style={{ background: "hsl(16 85% 48%)", boxShadow: "0 4px 20px hsl(16 85% 48% / 0.4)" }}>
                  Отправить заявку
                </button>
                <p className="text-xs text-gray-400 text-center font-body">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t" style={{ background: "hsl(20 15% 10%)", borderColor: "hsl(20 15% 18%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: "hsl(16 85% 48%)" }}>
              <span className="text-white font-display font-bold text-xs">TF</span>
            </div>
            <span className="font-display font-bold text-white">TERRAFORMA</span>
          </div>
          <p className="text-xs text-gray-500 font-body">© 2026 TERRAFORMA. Все права защищены.</p>
          <div className="flex gap-4">
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-xs text-gray-500 hover:text-orange-500 transition-colors font-body">
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: "hsl(20 15% 10% / 0.6)", backdropFilter: "blur(8px)" }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) { setSearchOpen(false); } }}
        >
          <div className="bg-white w-full shadow-2xl">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
              <div className="flex items-center gap-3">
                <Icon name="Search" size={22} style={{ color: "hsl(16 85% 48%)" }} />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по каталогу... (плитка, керамогранит, размер)"
                  className="flex-1 text-lg font-body outline-none bg-transparent placeholder-gray-400"
                  style={{ color: "hsl(20 15% 10%)" }}
                  onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 mt-4">
            {searchQuery.trim().length <= 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-sm text-gray-400 font-body mb-4">Популярные запросы</p>
                <div className="flex flex-wrap gap-2">
                  {["Керамогранит", "Мозаика", "60×60", "Белая плитка", "Терракот", "Ванная"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2 rounded-full text-sm font-body border transition-all hover:border-orange-400 hover:text-orange-600"
                      style={{ borderColor: "hsl(30 20% 88%)", color: "hsl(20 15% 40%)" }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery.trim().length > 1 && searchResults.length === 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="font-body text-gray-500">Ничего не найдено по запросу «{searchQuery}»</p>
                <p className="text-sm text-gray-400 mt-1 font-body">Попробуйте другой запрос</p>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-5 py-3 border-b" style={{ borderColor: "hsl(30 20% 88%)" }}>
                  <span className="text-xs text-gray-400 font-body">Найдено: <b className="text-gray-700">{searchResults.length}</b> товаров</span>
                </div>
                {searchResults.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { scrollTo("catalog"); setSearchOpen(false); }}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-orange-50 transition-colors border-b last:border-0 text-left"
                    style={{ borderColor: "hsl(30 20% 92%)" }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "hsl(30 20% 95%)" }}>
                      {p.img}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-sm" style={{ color: "hsl(20 15% 10%)" }}>{p.name}</div>
                      <div className="text-xs text-gray-400 font-body">{p.material} · {p.size} см</div>
                    </div>
                    <div className="font-display font-bold" style={{ color: "hsl(16 85% 48%)" }}>
                      {p.price.toLocaleString()} ₽
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-gray-300 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}