import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  ChevronRight,
  CircleDot,
  Clock3,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Mail,
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

type Page = 'home' | 'industries' | 'article';
type IconType = typeof Factory;

const problemFormUrl = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=eEcqLfuG0kitWNJMTEyIR5ZdlX8JXJ1Bp6vgfg1m8lJUMTNLNEdWOU5OSUVNREJDMTdDMVVRTTlVTi4u';
const articleTitle = 'Kako je eDIH FusionX podržao tri kompanije na putu zelene i digitalne transformacije';

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

function Header({ page, setPage, onNavigateToSection }: { page: Page; setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: 'Usluge', action: () => onNavigateToSection('services') },
    { label: 'Industrije', action: () => setPage('industries') },
    { label: 'Kako radimo', action: () => onNavigateToSection('how-we-work') },
    { label: 'O nama', action: () => onNavigateToSection('about') },
    { label: 'Novosti', action: () => setPage('article') },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo onClick={() => setPage('home')} />
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Glavna navigacija">
          {links.map((link) => (
            <button className={(page === 'industries' && link.label === 'Industrije') || (page === 'article' && link.label === 'Novosti') ? 'active' : ''} key={link.label} onClick={() => { link.action(); setMenuOpen(false); }} type="button">
              {link.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language" type="button">BS <span>/</span> EN</button>
          <a className="primary-button header-cta" href={problemFormUrl} target="_blank" rel="noopener noreferrer">Prijavite problem <ArrowRight size={16} /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Otvori meni">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function PrimaryButton({ children }: { children: string }) {
  return <a className="primary-button" href={problemFormUrl} target="_blank" rel="noopener noreferrer">{children}<ArrowRight size={17} /></a>;
}

function HeroArt() {
  return (
    <div className="hero-art">
      <img
        src="/images/Futuristic Cloud Computing Executive.png"
        alt="Stručnjakinja s laptopom okružena digitalnim oblakom"
      />
      <span className="hero-orbit" aria-hidden="true">
        <span className="hero-orbit-comet" />
      </span>
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
    <section className="process-band" id={industry ? undefined : 'how-we-work'}>
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

function Footer({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  return <footer className="footer"><div className="container footer-inner"><div><Logo onClick={() => setPage('home')} /><p>Partner za vašu<br />pametnu digitalizaciju.</p></div><div className="footer-links"><div><strong>O nama</strong><button type="button" onClick={() => onNavigateToSection('about')}>O FusionX-u</button><button type="button" onClick={() => onNavigateToSection('partners')}>Tim i partneri</button></div><div><strong>Podrška</strong><button type="button" onClick={() => onNavigateToSection('services')}>Usluge</button><button type="button" onClick={() => onNavigateToSection('how-we-work')}>Kako radimo</button><button type="button" onClick={() => onNavigateToSection('contact')}>Kontakt</button></div><div><strong>Novosti</strong><button type="button" onClick={() => setPage('article')}>Priče o uspjehu</button></div></div>
<div className="eu-badge">
  <img src="/images/euflag.jpg" alt="Zastava Evropske unije" />
  <small>Sufinansirano sredstvima<br />Evropske unije.</small>
</div>
</div><div className="container footer-bottom"><span>© 2025 FusionX EDH. Sva prava zadržana.</span><span>Politika privatnosti | Uslovi korištenja</span></div></footer>;
}

function HomePage({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">PARTNER ZA VAŠU PAMETNU DIGITALIZACIJU</p><h1>Digitalizacija ne počinje tehnologijom.<br /><em>Počinje problemom.</em></h1><p className="hero-lead">Saznajte gdje gubite vrijeme i novac.<br />Testirajte rješenje — pa tek onda odlučite.</p><div className="hero-buttons"><PrimaryButton>Prijavite problem</PrimaryButton><button className="text-button" type="button" onClick={() => onNavigateToSection('how-we-work')}>Kako radimo <ArrowRight size={16} /></button></div>
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
    <section className="services section" id="services"><div className="container"><p className="eyebrow">NAŠE USLUGE</p><h2>Podrška za svaki naredni korak.</h2><div className="service-grid">{[[Lightbulb, 'Testiranje rješenja', 'Ispitajte rješenje u stvarnom okruženju prije donošenja odluke.'], [GraduationCap, 'Edukacija i vještine', 'Razvijajte znanje i vještine potrebne za digitalnu transformaciju.'], [CircleDot, 'Pristup finansiranju', 'Povezujemo vas s odgovarajućim izvorima finansiranja.'], [Network, 'Povezivanje s partnerima', 'Otvaramo pristup ekspertima, tehnologijama i partnerima.']].map(([Icon, title, text]) => { const ServiceIcon = Icon as IconType; return <button className="service-card" type="button" key={title as string}><ServiceIcon size={34} /><div><h3>{title as string}</h3><p>{text as string}</p></div><ChevronRight size={17} /></button>; })}</div></div></section>
    <IndustryPreview setPage={setPage} />
    <NewsPreview setPage={setPage} />
    <CtaBanner label="Počnite od jednog problema." button="Prijavite problem" />
    <AboutSection />
    <PartnersSection />
    <Footer setPage={setPage} onNavigateToSection={onNavigateToSection} />
  </>;
}

function NewsPreview({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="news-preview section">
      <div className="container">
        <p className="eyebrow">NOVOSTI · PRIČE O USPJEHU</p>
        <div className="news-preview-card">
          <img src="/images/three-companies-success-stories.png" alt="Infografika o podršci kompanijama METALOS, SEMING i Geodet" />
          <div>
            <p className="news-category">ZELENA I DIGITALNA TRANSFORMACIJA</p>
            <h2>{articleTitle}</h2>
            <p className="lead">Tri kompanije povezale su konkretne razvojne potrebe sa stručnom podrškom, digitalnim rješenjima i planovima za naredne investicije.</p>
            <button className="text-button" type="button" onClick={() => setPage('article')}>Pročitajte članak <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryPreview({ setPage }: { setPage: (page: Page) => void }) {
  return <section className="industry-preview section"><div className="container industry-preview-inner"><div><p className="eyebrow">INDUSTRIJE</p><h2>Vaša industrija.<br /><em>Vaš konkretan izazov.</em></h2><p className="lead">Svaka industrija ima specifične potrebe. Zajedno pronalazimo rješenja koja imaju smisla za vaš sektor.</p><button className="primary-button" onClick={() => setPage('industries')} type="button">Istražite mogućnosti <ArrowRight size={16} /></button></div><div className="industry-mini-grid">{industries.map(({ name, icon: Icon }) => <button type="button" key={name}><Icon size={26} /><span>{name}</span></button>)}</div></div></section>;
}

function CtaBanner({ label, button }: { label: string; button: string }) { return <section className="cta-wrap" id="contact"><div className="container cta-banner"><div><h2>{label}</h2><p>Ne trebate znati rješenje. Dovoljno je da nam opišete šta vas usporava.</p></div><a className="dark-button" href={problemFormUrl} target="_blank" rel="noopener noreferrer">{button} <ArrowRight size={16} /></a>
<div className="cta-eu">
  <img src="/images/euflag.jpg" alt="Zastava Evropske unije" />
  <small>Podrška kroz EU sufinansiranje,<br />u skladu s uslovima programa.</small>
</div>
</div></section>; }

function PartnersSection() {
  return <section className="partners-section section" id="partners"><div className="container"><div className="partners-heading"><div><p className="eyebrow">NAŠI PARTNERI</p><h2>Znanje, infrastruktura i partnerstva na jednom mjestu.</h2></div><span className="partners-note">11 partnera okupljenih oko digitalne transformacije.</span></div>
  <div className="partner-logos" role="region" aria-label="Logotipi partnera, pomjerite horizontalno da vidite sve" tabIndex={0}>
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

function AboutSection() {
  return (
    <section className="about-section section" id="about">
      <div className="container">
        <p className="eyebrow">O FUSIONX-U</p>
        <div className="about-intro">
          <div>
            <h2>Povezujemo potrebe.<br /><em>Znanje pretvaramo u primjenu.</em></h2>
          </div>
          <p className="lead">FusionX je Evropski digitalni inovacijski hub u Bosni i Hercegovini. Povezujemo privredu, istraživanje, obrazovanje i tehnologiju kako bismo kompanijama i institucijama pomogli da naprave konkretne korake u digitalnoj transformaciji.</p>
        </div>
        <div className="about-cards">
          <div className="about-card"><Users size={30} /><h3>Blizu stvarnih potreba</h3><p>Počinjemo od izazova kompanija i javnih institucija, a podršku prilagođavamo njihovim ciljevima i mogućnostima.</p></div>
          <div className="about-card"><Network size={30} /><h3>Pristup široj ekspertizi</h3><p>Okupljamo partnere iz privrede, istraživanja i IT sektora, te povezujemo korisnike s odgovarajućim znanjem i kapacitetima.</p></div>
          <div className="about-card"><Building2 size={30} /><h3>Znanje i infrastruktura</h3><p>Partneri hub-a donose istraživačku ekspertizu, tehnologije i infrastrukturu za procjenu, testiranje i razvoj rješenja.</p></div>
        </div>
      </div>
    </section>
  );
}

function ArticlePage({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  return (
    <>
      <main className="article-page">
        <article className="container article">
          <button className="article-back" type="button" onClick={() => setPage('home')}>
            <ArrowLeft size={16} /> Nazad na početnu
          </button>
          <header className="article-header">
            <p className="eyebrow">PRIČE O USPJEHU · ZELENA I DIGITALNA TRANSFORMACIJA</p>
            <h1>{articleTitle}</h1>
            <p className="article-standfirst">
              Za mnoge kompanije izazov nije prepoznati šta treba unaprijediti, nego pronaći odgovarajuću podršku da se promjena zaista ostvari.
            </p>
          </header>

          <figure className="article-visual">
            <img src="/images/three-companies-success-stories.png" alt="Rezultati podrške za kompanije METALOS, SEMING i Geodet" />
            <figcaption>Tri primjera kako stručna podrška može odgovoriti na konkretne potrebe kompanija.</figcaption>
          </figure>

          <div className="article-body">
            <p>
              Energetski gubici, zahtjevi evropskog tržišta i dugotrajna ručna obrada podataka dio su svakodnevnog poslovanja. Njihovo rješavanje traži stručnost, ulaganja i partnera koji razumije potrebe kompanije. Upravo tu svoju ulogu ostvaruje FusionX – Evropski digitalni inovacijski hub (EDIH) u Bosni i Hercegovini.
            </p>
            <p>
              Na osnovu identificiranih potreba, planiranih mjera i procijenjenih investicija, stručnjaci FusionX-a pomažu kompanijama da bolje razumiju dostupne mogućnosti finansiranja. To uključuje relevantne grantove, programe podrške, kreditne linije i druge izvore finansiranja namijenjene digitalnoj i zelenoj transformaciji. Podrška obuhvata i usmjeravanje kompanije prema odgovarajućim instrumentima te pripremu kvalitetnije osnove za razgovore s finansijskim institucijama, investitorima i programima podrške.
            </p>
            <p>
              U proteklom ciklusu podrške, kompanije iz metaloprerađivačke industrije, proizvodnje industrijskih dizalica i transportne opreme te geodetskih usluga dobile su podršku da svoje razvojne potrebe povežu s odgovarajućim izvorima stručne i finansijske podrške. Uz stručnu podršku članova FusionX tima i vlastito sufinansiranje, angažovale su pružaoce usluga za unapređenje poslovanja u oblastima zelene tranzicije, digitalne transformacije i tehnoloških inovacija.
            </p>

            <h2>Priča kompanije iz Kreševa: podaci kao osnova za energetski efikasniju proizvodnju</h2>
            <p>
              Za METALOS d.o.o. Kreševo, proizvođača metalnih konstrukcija i ogradnih sistema, energetska efikasnost i priprema za zahtjeve evropskog tržišta predstavljaju važan dio daljnjeg razvoja. Važan aspekt tog razvoja je i CBAM – mehanizam EU za ugljično prilagođavanje na granicama, koji zahtijeva pouzdane podatke o emisijama povezanim s proizvodnjom. Kompaniji je nedostajao integrisani sistem za praćenje potrošnje energije, resursa i emisija po proizvodnim procesima, što je otežavalo prepoznavanje mogućih ušteda, planiranje investicija i pripremu CBAM izvještaja. Dodatni izazov bio je nedostatak plana za uvođenje obnovljivih izvora energije u proizvodnju.
            </p>
            <p>
              Tokom tri mjeseca proveden je energetski i resursni audit, kojim su analizirani proizvodni procesi i potrošnja energije i drugih resursa. Na osnovu nalaza izrađen je plan mjera za unapređenje grijanja, rasvjete, sistema komprimovanog zraka i proizvodnih procesa te su razmotrene mogućnosti korištenja solarne energije. Razvijen je i prilagođeni digitalni alat za praćenje energetskih pokazatelja i emisija stakleničkih plinova, pripremljen CBAM izvještaj i provedena obuka zaposlenih.
            </p>
            <p>
              Saradnja s eDIH FusionX i njegovim stručnjacima METALOS-u je donijela jasne prioritete za ulaganja u energetsku efikasnost i osnovu za sistematsko praćenje potrošnje i emisija. Rezultati projekta omogućavaju kompaniji da investicione odluke donosi na temelju tehničkih i ekonomskih analiza te da podatke potrebne za CBAM izvještavanje prikuplja i obrađuje na strukturiran način.
            </p>

            <h2>Priča kompanije iz Gračanice: jasan plan za zelenu tranziciju</h2>
            <p>
              SEMING d.o.o. Gračanica, specijaliziran za projektovanje, proizvodnju i montažu industrijskih dizalica i transportne opreme, svoju je razvojnu potrebu usmjerio na održiviju i energetski efikasniju proizvodnju. Kompaniji je nedostajao sistemski pristup upravljanju energijom, uz ograničene podatke o potrošnji po proizvodnim procesima i nepostojanje sistema za praćenje emisija stakleničkih plinova. Dodatni izazov predstavljali su loše toplotne karakteristike proizvodnog objekta, energetski neefikasan sistem grijanja i zastarjela rasvjeta, koji su doprinosili povećanoj potrošnji energije i višim operativnim troškovima.
            </p>
            <p>
              Tokom tri mjeseca analizirani su proizvodni procesi, potrošnja energije, sistem grijanja, rasvjeta i toplotne karakteristike proizvodnog objekta. Procijenjene su direktne i indirektne emisije stakleničkih plinova te definisane prioritetne mjere za unapređenje energetske efikasnosti. Projekat je obuhvatio analizu mogućnosti korištenja fotonaponske elektrane, preporuke za uspostavljanje sistema energetskog menadžmenta i pripremu podataka i procedura za buduće CBAM izvještavanje. Razvijen je jednostavan digitalni alat za praćenje energetskih i okolišnih pokazatelja, uz obuku zaposlenih za njegovu primjenu.
            </p>
            <p>
              Saradnja s eDIH FusionX i njegovim stručnjacima SEMING-u je donijela sistemski pregled energetskih gubitaka i plan ulaganja s procjenom mogućih ušteda. Rezultati projekta omogućavaju kompaniji da naredne korake zelene tranzicije planira prema jasno utvrđenim potrebama i prioritetima.
            </p>

            <h2>Priča kompanije iz Sarajeva: od terenskih mjerenja do automatizovane izrade elaborata</h2>
            <p>
              Geodet d.o.o. Sarajevo, kompanija specijalizirana za geodetske usluge, uključujući terenska snimanja, izradu geodetskih situacija, parcelaciju zemljišta i izradu baza podataka, svoju je razvojnu potrebu usmjerila na efikasniju obradu mjerenja i pripremu dokumentacije. Savremena oprema za satelitska geodetska mjerenja prikupljala je podatke koji su se zatim obrađivali ručno. Takav postupak zahtijevao je značajno vrijeme i povećavao mogućnost grešaka, posebno kod obimnijih poslova.
            </p>
            <p>
              Tokom tri mjeseca razvijen je softver koji automatski preuzima i obrađuje podatke iz mjernih uređaja, popunjava odgovarajuće geodetske obrasce i generiše elaborate u Excel formatu. Rješenje je testirano na stvarnim terenskim podacima, a provjere su potvrdile pouzdanost prenosa i obrade podataka iz podržanih formata. Izrađeno je korisničko uputstvo i provedeno osposobljavanje korisnika, dok je procjena digitalne konkurentnosti izdvojila pravce za daljnji razvoj kompanije.
            </p>
            <p>
              Saradnja s eDIH FusionX Geodetu je donijela funkcionalno rješenje spremno za svakodnevnu upotrebu, koje smanjuje potrebu za ručnim unosom i olakšava pripremu elaborata. Time je savremena terenska oprema povezana s digitalnim procesom obrade, uz veću standardizaciju rada i manji rizik od grešaka.
            </p>

            <h2>Od stručne podrške do investicije</h2>
            <p>
              Podrška eDIH FusionX ne završava identifikacijom problema, izradom analiza ili razvojem digitalnih rješenja. Kroz uslugu pristupa finansiranju, kompanijama se pomaže da rezultate stručne podrške pretvore u konkretne razvojne i investicione korake. Na taj način tehničke preporuke ne ostaju samo na nivou izvještaja. Kompanija dobija jasniji odgovor na tri ključna pitanja: u šta investirati, kojim redoslijedom i gdje tražiti sredstva za realizaciju.
            </p>
            <p>
              Primjeri METALOS-a, SEMING-a i Geodeta pokazuju vrijednost takvog pristupa. FusionX povezuje tehničku ekspertizu, digitalna rješenja, razvoj kompetencija i pristup finansiranju u jedinstven proces podrške. Cilj nije samo unaprijediti jedan proces, nego kompaniji dati znanje, podatke i konkretan plan za narednu fazu razvoja.
            </p>

            <aside className="article-contact">
              <h2>Želite unaprijediti poslovanje svoje kompanije?</h2>
              <p>Razvijate digitalno rješenje ili želite pokrenuti zelenu tranziciju? Javite se FusionX EDIH-u.</p>
              <a href="mailto:fusionx@verlabinstitute.com"><Mail size={18} /> fusionx@verlabinstitute.com</a>
            </aside>
          </div>
        </article>
      </main>
      <Footer setPage={setPage} onNavigateToSection={onNavigateToSection} />
    </>
  );
}

function IndustriesPage({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  return <>
    <section className="industry-hero">
      <div className="container industry-hero-grid">
        <div className="industry-hero-copy">
          <p className="breadcrumbs">
            Naslovna / Industrije
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
    <ProcessBand industry /><CtaBanner label="Ne pronalazite svoj sektor?" button="Opišite problem" /><Footer setPage={setPage} onNavigateToSection={onNavigateToSection} />
  </>;
}

function App() {
  const [page, setPage] = useState<Page>('home');
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  useEffect(() => {
    if (page === 'home' && pendingSection) {
      document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth' });
      setPendingSection(null);
    }
  }, [page, pendingSection]);

  const navigateToSection = (section: string) => {
    if (page === 'home') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setPendingSection(section);
    setPage('home');
  };

  return <><Header page={page} setPage={setPage} onNavigateToSection={navigateToSection} />{page === 'home' ? <HomePage setPage={setPage} onNavigateToSection={navigateToSection} /> : page === 'industries' ? <IndustriesPage setPage={setPage} onNavigateToSection={navigateToSection} /> : <ArticlePage setPage={setPage} onNavigateToSection={navigateToSection} />}</>;
}

export default App;
