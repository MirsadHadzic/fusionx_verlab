import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Menu,
  Network,
  PieChart,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  Utensils,
  X,
} from 'lucide-react';

type Page = 'home' | 'industries';
type IconType = typeof Factory;

type Industry = {
  name: string;
  description: string;
  icon: IconType;
};

const industries: Industry[] = [
  { name: 'Proizvodnja', description: 'Zastoji u radu i škart. Ručno praćenje proizvodnje.', icon: Factory },
  { name: 'Trgovina i distribucija', description: 'Višak ili manjak robe. Spora obrada narudžbi.', icon: ShoppingCart },
  { name: 'Usluge i administracija', description: 'Ručno unošenje podataka. Dugo traženje dokumenata.', icon: Users },
  { name: 'Ugostiteljstvo', description: 'Bacanje hrane i gubici. Neusklađene smjene.', icon: Utensils },
  { name: 'Turizam i hotelijerstvo', description: 'Slaba popunjenost. Sporo upravljanje rezervacijama.', icon: Sparkles },
  { name: 'Zdravstvo', description: 'Složeno zakazivanje. Spora obrada dokumentacije.', icon: HeartPulse },
  { name: 'Logistika i transport', description: 'Neefikasne rute. Kašnjenja u isporuci.', icon: Truck },
  { name: 'Građevina', description: 'Prekoračenje budžeta. Slaba koordinacija radova.', icon: Building2 },
  { name: 'Edukacija', description: 'Ručno evidentiranje. Nedovoljan uvid u rezultate.', icon: BookOpen },
];

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="logo"
      onClick={onClick}
      type="button"
      aria-label="Fusion X početna stranica"
    >
      <img src="/images/fusion-x.png" alt="Fusion X" />
    </button>
  );
}

function Header({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: 'Usluge', action: () => undefined },
    { label: 'Industrije', action: () => setPage('industries') },
    { label: 'Kako radimo', action: () => undefined },
    { label: 'O nama', action: () => undefined },
    { label: 'Novosti', action: () => undefined },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo onClick={() => setPage('home')} />
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Glavna navigacija">
          {links.map((link) => (
            <button className={page === 'industries' && link.label === 'Industrije' ? 'active' : ''} key={link.label} onClick={() => { link.action(); setMenuOpen(false); }} type="button">
              {link.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language" type="button">BS <span>/</span> EN</button>
          <button className="primary-button header-cta" type="button">Prijavite problem <ArrowRight size={16} /></button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Otvori meni">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function PrimaryButton({ children }: { children: string }) {
  return <button className="primary-button" type="button">{children}<ArrowRight size={17} /></button>;
}

function HeroArt() {
  return (
    <div className="hero-art">
      <img
        src="/images/Futuristic Cloud Computing Executive.png"
        alt="pictures of futuristic cloud computing and executive"
      />
      <div className="hero-badge">
        <Check size={13} /> Problem <ArrowRight size={12} />
        Test <ArrowRight size={12} /> Odluka
      </div>
    </div>
  );
}

function ProblemStrip() {
  const problems = [
    { icon: Settings, title: 'Previše ručnog rada', text: 'Rutinski zadaci oduzimaju vrijeme vašem timu.' },
    { icon: FileText, title: 'Greške koje se ponavljaju', text: 'Isti problemi se stalno vraćaju.' },
    { icon: BarChart3, title: 'Neiskorišteni podaci', text: 'Vrijedni podaci ostaju neiskorišteni.' },
    { icon: PieChart, title: 'Odluke bez jasnog uvida', text: 'Teško je donijeti pravovremene odluke.' },
    { icon: Clock3, title: 'Spora administracija', text: 'Procedure traju duže nego što bi trebale.' },
  ];
  return (
    <section className="problem-section section">
      <div className="container">
        <p className="eyebrow">POČINJEMO OD VAŠEG POSLOVANJA</p>
        <h2>Šta vas najviše usporava?</h2>
        <p className="lead">Prepoznajte problem koji svakodnevno troši vaše vrijeme i novac.</p>
        <div className="problem-grid">
          {problems.map(({ icon: Icon, title, text }) => <div className="problem-item" key={title}><Icon size={41} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></div>)}
        </div>
        <p className="section-note">Krenite od jednog problema. Onog koji ima najveći uticaj.</p>
      </div>
    </section>
  );
}

function ProcessBand({ industry = false }: { industry?: boolean }) {
  const steps: Array<[string, string, string, IconType]> = industry
    ? [['01', 'Opišete problem', 'Šta vas usporava i gdje nastaju gubici?', Search], ['02', 'Dogovorimo test', 'Odredimo obim, podatke i pokazatelje.', Lightbulb], ['03', 'Procijenite rezultat', 'Odlučite ima li smisla nastaviti.', BarChart3]]
    : [['01', 'Razumijemo problem', 'Analiziramo gdje gubite vrijeme, resurse i novac.', Search], ['02', 'Predlažemo rješenje', 'Biramo najprikladniji pristup za vaš slučaj.', Lightbulb], ['03', 'Testiramo', 'Provjeravamo rješenje u stvarnim uslovima.', Settings], ['04', 'Podržavamo uvođenje', 'Pomažemo pri planiranju i implementaciji.', BarChart3], ['05', 'Pomažemo dalje', 'Povezujemo vas s partnerima i izvorima finansiranja.', Users]];
  return (
    <section className="process-band">
      <div className="process-glow" />
      <div className="container process-content">
        <h2>{industry ? <>Ne počinjemo od tehnologije.<br />Počinjemo od <em>vašeg procesa.</em></> : <><em>Testirajte</em> prije nego<br />što investirate.</>}</h2>
        <p>{industry ? 'Prvo razumijemo gdje nastaje problem, a tek onda tražimo najbolje rješenje.' : 'Zajedno provjeravamo šta rješenje može promijeniti u vašem poslovanju. Odluku donosite na osnovu rezultata.'}</p>
        <div className={`steps ${industry ? 'three' : ''}`}>
          {steps.map(([number, title, text, Icon]) => { const StepIcon = Icon as IconType; return <div className="step" key={number}><div className="step-line"><span>{number}</span><StepIcon size={26} /></div><h3>{title}</h3><p>{text}</p></div>; })}
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }: { setPage: (page: Page) => void }) {
  return <footer className="footer"><div className="container footer-inner"><div><Logo onClick={() => setPage('home')} /><p>Partner za vašu<br />pametnu digitalizaciju.</p></div><div className="footer-links"><div><strong>O nama</strong><button type="button">Tim i partneri</button><button type="button">O projektu</button></div><div><strong>Podrška</strong><button type="button">Usluge</button><button type="button">Česta pitanja</button><button type="button">Kontakt</button></div><div><strong>Novosti</strong><button type="button">Događaji</button></div></div>
<div className="eu-badge">
  <img src="/images/euflag.jpg" alt="Zastava Evropske unije" />
  <small>Sufinansirano sredstvima<br />Evropske unije.</small>
</div>
</div><div className="container footer-bottom"><span>© 2025 FusionX EDH. Sva prava zadržana.</span><span>Politika privatnosti　|　Uslovi korištenja</span></div></footer>;
}

function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">PARTNER ZA VAŠU PAMETNU DIGITALIZACIJU</p><h1>Digitalizacija ne počinje tehnologijom.<br /><em>Počinje problemom.</em></h1><p className="hero-lead">Saznajte gdje gubite vrijeme i novac.<br />Testirajte rješenje — pa tek onda odlučite.</p><div className="hero-buttons"><PrimaryButton>Prijavite problem</PrimaryButton><button className="text-button" type="button">Kako radimo <ArrowRight size={16} /></button></div>
<p className="funding">
  Dio evropske EDHI mreže{" "}
  <img src="/images/euflag.jpg" alt="Zastava Evropske unije" />
  Sufinansirano sredstvima
  <br />
  Evropske unije
</p>
</div><HeroArt /></div></section>
    <ProblemStrip />
    <ProcessBand />
    <section className="services section"><div className="container"><p className="eyebrow">NAŠE USLUGE</p><h2>Podrška za svaki naredni korak.</h2><div className="service-grid">{[[Lightbulb, 'Testiranje rješenja', 'Ispitajte rješenje u stvarnom okruženju prije donošenja odluke.'], [GraduationCap, 'Edukacija i vještine', 'Razvijajte znanje i vještine potrebne za digitalnu transformaciju.'], [CircleDot, 'Pristup finansiranju', 'Povezujemo vas s odgovarajućim izvorima finansiranja.'], [Network, 'Povezivanje s partnerima', 'Otvaramo pristup ekspertima, tehnologijama i partnerima.']].map(([Icon, title, text]) => { const ServiceIcon = Icon as IconType; return <button className="service-card" type="button" key={title as string}><ServiceIcon size={34} /><div><h3>{title as string}</h3><p>{text as string}</p></div><ChevronRight size={17} /></button>; })}</div></div></section>
    <IndustryPreview setPage={setPage} />
    <CtaBanner label="Počnite od jednog problema." button="Prijavite problem" />
    <PartnersSection />
    <Footer setPage={setPage} />
  </>;
}

function IndustryPreview({ setPage }: { setPage: (page: Page) => void }) {
  return <section className="industry-preview section"><div className="container industry-preview-inner"><div><p className="eyebrow">INDUSTRIJE</p><h2>Vaša industrija.<br /><em>Vaš konkretan izazov.</em></h2><p className="lead">Svaka industrija ima specifične potrebe. Zajedno pronalazimo rješenja koja imaju smisla za vaš sektor.</p><button className="primary-button" onClick={() => setPage('industries')} type="button">Istražite mogućnosti <ArrowRight size={16} /></button></div><div className="industry-mini-grid">{industries.map(({ name, icon: Icon }) => <button type="button" key={name}><Icon size={26} /><span>{name}</span></button>)}</div></div></section>;
}

function CtaBanner({ label, button }: { label: string; button: string }) { return <section className="cta-wrap"><div className="container cta-banner"><div><h2>{label}</h2><p>Ne trebate znati rješenje. Dovoljno je da nam opišete šta vas usporava.</p></div><button className="dark-button" type="button">{button} <ArrowRight size={16} /></button>
<div className="cta-eu">
  <img src="/images/euflag.jpg" alt="Zastava Evropske unije" />
  <small>Podrška kroz EU sufinansiranje,<br />u skladu s uslovima programa.</small>
</div>
</div></section>; }

function PartnersSection() {
  return <section className="partners-section section"><div className="container"><div className="partners-heading"><div><p className="eyebrow">NAŠI PARTNERI</p><h2>Znanje, infrastruktura i partnerstva na jednom mjestu.</h2></div><button className="text-button" type="button">Upoznajte sve partnere <ArrowRight size={16} /></button></div>
  <div className="partner-logos">
    <div className="partner-logo">
      <img src="/images/cnt-institut.png" alt="CNT Institut" />
    </div>

    <div className="partner-logo">
      <img src="/images/verlab-institut.png" alt="Verlab Institut" />
    </div>

    <div className="partner-logo">
      <img src="/images/bh-telecom.png" alt="BH Telecom" />
    </div>

    <div className="partner-logo">
      <img src="/images/bit-alijansa.png" alt="BIT Alijansa" />
    </div>

    <div className="partner-logo">
      <img src="/images/univerzitet-u-bihacu.png" alt="Univerzitet u Bihaću" />
    </div>

    <div className="partner-logo">
      <img src="/images/univerzitet-dzemal-bijedic.png" alt="Univerzitet Džemal Bijedić" />
    </div>
  </div>
  </div></section>;
  }

function IndustriesPage({ setPage }: { setPage: (page: Page) => void }) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  return <>
    <section className="industry-hero">
      <div className="container industry-hero-grid">
        <div className="industry-hero-copy">
          <p className="breadcrumbs">
            Naslovna　/　Industrije
          </p>

          <p className="eyebrow">
            RJEŠENJA PO MJERI VAŠEG POSLOVANJA
          </p>

          <h1>
            Vaša industrija.
            <br />
            <em>Vaš konkretan izazov.</em>
          </h1>

          <p className="lead">
            Svaki sektor ima svoje izazove. Zajedno
            prepoznajemo šta vas usporava i testiramo
            rješenje prije nego što investirate.
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() =>
              document.getElementById("industry-list")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Pronađite svoju industriju
            <ArrowDown size={16} />
          </button>
        </div>

        <div className="industry-visual">
          <img
            src="/images/Modern Industrial Innovation Collage.png"
            alt="image industrial innovation collage"
          />
        </div>
      </div>
    </section>
  <section className="industry-list section" id="industry-list">
    <div className="container">
      <p className="eyebrow">
        GDJE ŽELITE NAPRAVITI POMAK?
      </p>

      <h2>
        Odaberite sektor i pogledajte primjere problema koje možemo istražiti s vama.
      </h2>

      <div className="industry-grid">
        {industries.map(({ name, description, icon: Icon }) => (
          <button
            className={`industry-card ${
              selectedIndustry === name ? 'selected' : ''
            }`}
            type="button"
            key={name}
            onClick={() => setSelectedIndustry(name)}
          >
            <Icon size={38} strokeWidth={1.6} />

            <div>
              <h3>{name}</h3>
              <p>{description}</p>
              <span>
                Pogledajte mogućnosti <ArrowRight size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
   <section className="production section"><div className="container production-grid"><div><p className="eyebrow">PROIZVODNJA · MOGUĆNOSTI TESTIRANJA</p><h2>Manje zastoja. Bolji uvid u proizvodnju.</h2><p className="lead">Počinjemo od jednog procesa i provjeravamo šta se može unaprijediti u stvarnim uslovima.</p><div className="test-table"><div><strong>Vaš problem</strong><strong>Šta možemo testirati</strong></div>{[['Greške i škart', 'Rano otkrivanje odstupanja u kvalitetu'], ['Zastoji u proizvodnji', 'Analizu uskih grla i uzroka zastoja'], ['Loše planiranje', 'Planiranje na osnovu dostupnih podataka'], ['Ručno vođenje evidencija', 'Digitalno praćenje procesa']].map(([a, b]) => <div key={a}><span>{a}</span><span>{b}</span></div>)}</div><PrimaryButton>Prijavite problem u proizvodnji</PrimaryButton></div><div className="production-art">
    <img
      src="/images/Industrial Technician Monitoring Factory Dashboard.png"
      alt="image industrial technician monitoring factory dashboard"
    />
    </div></div></section>
    <ProcessBand industry /><CtaBanner label="Ne pronalazite svoj sektor?" button="Opišite problem" /><Footer setPage={setPage} />
  </>;
}

function App() {
  const [page, setPage] = useState<Page>('home');
  return <><Header page={page} setPage={setPage} />{page === 'home' ? <HomePage setPage={setPage} /> : <IndustriesPage setPage={setPage} />}</>;
}

export default App;
