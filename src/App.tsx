import { createContext, useContext, useEffect, useState } from 'react';
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
import { getLanguageLabel, type Language, translate } from './translations';

type Page = 'home' | 'industries' | 'article' | 'privacy' | 'terms' | 'contact';
type IconType = typeof Factory;

const problemFormUrl = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=eEcqLfuG0kitWNJMTEyIR5ZdlX8JXJ1Bp6vgfg1m8lJUMTNLNEdWOU5OSUVNREJDMTdDMVVRTTlVTi4u';
const articleTitle = 'Kako je eDIH FusionX podržao tri kompanije na putu zelene i digitalne transformacije';
const contactEmails = ['fusionx@verlabinstitute.com', 'info@fusionxhub.com', 'fusionx@cdt.ba'];

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('Language context is missing');
  return context;
}

function ContactEmails({ className = '' }: { className?: string }) {
  return (
    <ul className={`contact-emails ${className}`}>
      {contactEmails.map((email) => (
        <li key={email}><a href={`mailto:${email}`}>{email}</a></li>
      ))}
    </ul>
  );
}

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

function Logo({ onClick, variant = 'light' }: { onClick: () => void; variant?: 'light' | 'dark' }) {
  const { t } = useLanguage();
  return (
    <button
      className="logo"
      onClick={onClick}
      type="button"
      aria-label={t('Fusion X početna stranica')}
    >
      <img
        src={variant === 'dark' ? '/images/partner-fusionx-edih-blue.png' : '/images/fusionx-edih-light.png'}
        alt="FusionX EDIH"
      />
    </button>
  );
}

function Header({ page, setPage, onNavigateToSection }: { page: Page; setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const links = [
    { key: 'Usluge', action: () => onNavigateToSection('services') },
    { key: 'Industrije', action: () => setPage('industries') },
    { key: 'Kako radimo', action: () => onNavigateToSection('how-we-work') },
    { key: 'O nama', action: () => onNavigateToSection('about') },
    { key: 'Novosti', action: () => setPage('article') },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo onClick={() => setPage('home')} />
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label={t('Glavna navigacija')}>
          {links.map((link) => (
            <button className={(page === 'industries' && link.key === 'Industrije') || (page === 'article' && link.key === 'Novosti') ? 'active' : ''} key={link.key} onClick={() => { link.action(); setMenuOpen(false); }} type="button">
              {t(link.key)}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language" type="button" onClick={toggleLanguage} aria-label={t(language === 'bs' ? 'Switch language to English' : 'Prebaci jezik na bosanski')}>{getLanguageLabel(language)}</button>
          <a className="primary-button header-cta" href={problemFormUrl} target="_blank" rel="noopener noreferrer">{t('Prijavite problem')} <ArrowRight size={16} /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={t(menuOpen ? 'Zatvori meni' : 'Otvori meni')}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function PrimaryButton({ children }: { children: string }) {
  const { t } = useLanguage();
  return <a className="primary-button" href={problemFormUrl} target="_blank" rel="noopener noreferrer">{t(children)}<ArrowRight size={17} /></a>;
}

function HeroArt() {
  const { t } = useLanguage();
  return (
    <div className="hero-art">
      <img
        src="/images/Futuristic Cloud Computing Executive.png"
        alt={t('Stručnjakinja s laptopom okružena digitalnim oblakom')}
      />
      <span className="hero-orbit" aria-hidden="true">
        <span className="hero-orbit-comet" />
      </span>
    </div>
  );
}

function ProblemStrip() {
  const { t } = useLanguage();
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
        <p className="eyebrow">{t('POČINJEMO OD VAŠEG POSLOVANJA')}</p>
        <h2>{t('Šta vas najviše usporava?')}</h2>
        <p className="lead">{t('Prepoznajte problem koji svakodnevno troši vaše vrijeme i novac.')}</p>
        <div className="problem-grid">
          {problems.map(({ icon: Icon, title, text }) => <div className="problem-item" key={title}><Icon size={41} strokeWidth={1.5} /><h3>{t(title)}</h3><p>{t(text)}</p></div>)}
        </div>
        <p className="section-note">{t('Krenite od jednog problema. Onog koji ima najveći uticaj.')}</p>
      </div>
    </section>
  );
}

function ProcessBand({ industry = false }: { industry?: boolean }) {
  const { t } = useLanguage();
  const steps: Array<[string, string, string, IconType]> = industry
    ? [['01', 'Opišete problem', 'Šta vas usporava i gdje nastaju gubici?', Search], ['02', 'Dogovorimo test', 'Odredimo obim, podatke i pokazatelje.', Lightbulb], ['03', 'Procijenite rezultat', 'Odlučite ima li smisla nastaviti.', BarChart3]]
    : [['01', 'Razumijemo problem', 'Analiziramo gdje gubite vrijeme, resurse i novac.', Search], ['02', 'Predlažemo rješenje', 'Biramo najprikladniji pristup za vaš slučaj.', Lightbulb], ['03', 'Testiramo', 'Provjeravamo rješenje u stvarnim uslovima.', Settings], ['04', 'Podržavamo uvođenje', 'Pomažemo pri planiranju i implementaciji.', BarChart3], ['05', 'Pomažemo dalje', 'Povezujemo vas s partnerima i izvorima finansiranja.', Users]];
  return (
    <section className="process-band" id={industry ? undefined : 'how-we-work'}>
      <div className="process-glow" />
      <div className="container process-content">
        <h2>{industry ? <>{t('Ne počinjemo od tehnologije.')}<br />{t('Počinjemo od')} <em>{t('vašeg procesa.')}</em></> : <><em>{t('Testirajte')}</em> {t('prije nego')}<br />{t('što investirate.')}</>}</h2>
        <p>{t(industry ? 'Prvo razumijemo gdje nastaje problem, a tek onda tražimo najbolje rješenje.' : 'Zajedno provjeravamo šta rješenje može promijeniti u vašem poslovanju. Odluku donosite na osnovu rezultata.')}</p>
        <div className={`steps ${industry ? 'three' : ''}`}>
          {steps.map(([number, title, text, Icon]) => { const StepIcon = Icon as IconType; return <div className="step" key={number}><div className="step-line"><span>{number}</span><StepIcon size={26} /></div><h3>{t(title)}</h3><p>{t(text)}</p></div>; })}
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const { t } = useLanguage();
  return <footer className="footer"><div className="container footer-inner"><div><Logo variant="dark" onClick={() => setPage('home')} /><p>{t('Partner za vašu')}<br />{t('pametnu digitalizaciju.')}</p></div><div className="footer-links"><div><strong>{t('O nama')}</strong><button type="button" onClick={() => onNavigateToSection('about')}>{t('O FusionX-u')}</button><button type="button" onClick={() => onNavigateToSection('partners')}>{t('Tim i partneri')}</button></div><div><strong>{t('Podrška')}</strong><button type="button" onClick={() => onNavigateToSection('services')}>{t('Usluge')}</button><button type="button" onClick={() => onNavigateToSection('how-we-work')}>{t('Kako radimo')}</button><button type="button" onClick={() => setPage('contact')}>{t('Kontakt')}</button></div><div><strong>{t('Novosti')}</strong><button type="button" onClick={() => setPage('article')}>{t('Priče o uspjehu')}</button></div></div>
<div className="eu-badge">
  <img src="/images/euflag.jpg" alt={t('Zastava Evropske unije')} />
  <small>{t('Sufinansirano sredstvima')}<br />{t('Evropske unije.')}</small>
</div>
</div><div className="container footer-disclaimer">{t('Disclaimer: FusionX EDIH je projekat koji se provodi u okviru Programa Digitalna Evropa Evropske unije, na osnovu Sporazuma o dodjeli bespovratnih sredstava br. 101269890.')}<br />{t('Sufinansirano sredstvima Evropske unije. Stavovi i mišljenja izraženi su isključivo stavovi autora i ne odražavaju nužno stavove Evropske unije ili HADEA-e. Ni Evropska unija ni HADEA ne mogu se smatrati odgovornim za njih.')}</div><div className="container footer-bottom"><span>{t('© 2026 FusionX EDIH. Sva prava zadržana.')}</span><nav className="legal-links" aria-label={t('Pravne informacije')}><button type="button" onClick={() => setPage('privacy')}>{t('Politika privatnosti')}</button><span aria-hidden="true">|</span><button type="button" onClick={() => setPage('terms')}>{t('Uslovi korištenja')}</button></nav></div></footer>;
}

function HomePage({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const { t } = useLanguage();
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">{t('PARTNER ZA VAŠU PAMETNU DIGITALIZACIJU')}</p><h1>{t('Digitalizacija ne počinje tehnologijom.')}<br /><em>{t('Počinje problemom.')}</em></h1><p className="hero-lead">{t('Saznajte gdje gubite vrijeme i novac.')}<br />{t('Testirajte rješenje — pa tek onda odlučite.')}</p><div className="hero-buttons"><PrimaryButton>Prijavite problem</PrimaryButton><button className="text-button" type="button" onClick={() => onNavigateToSection('how-we-work')}>{t('Kako radimo')} <ArrowRight size={16} /></button></div>
<p className="funding">
  {t('Dio evropske EDHI mreže')}{" "}
  <img src="/images/euflag.jpg" alt={t('Zastava Evropske unije')} />
  {t('Sufinansirano sredstvima')}
  <br />
  {t('Evropske unije.')}
</p>
</div><HeroArt /></div></section>
    <ProblemStrip />
    <ProcessBand />
    <section className="services section" id="services"><div className="container"><p className="eyebrow">{t('NAŠE USLUGE')}</p><h2>{t('Podrška za svaki naredni korak.')}</h2><div className="service-grid">{[[Lightbulb, 'Testiranje rješenja', 'Ispitajte rješenje u stvarnom okruženju prije donošenja odluke.'], [GraduationCap, 'Edukacija i vještine', 'Razvijajte znanje i vještine potrebne za digitalnu transformaciju.'], [CircleDot, 'Pristup finansiranju', 'Povezujemo vas s odgovarajućim izvorima finansiranja.'], [Network, 'Povezivanje s partnerima', 'Otvaramo pristup ekspertima, tehnologijama i partnerima.']].map(([Icon, title, text]) => { const ServiceIcon = Icon as IconType; return <button className="service-card" type="button" key={title as string}><ServiceIcon size={34} /><div><h3>{t(title as string)}</h3><p>{t(text as string)}</p></div><ChevronRight size={17} /></button>; })}</div></div></section>
    <IndustryPreview setPage={setPage} />
    <NewsPreview setPage={setPage} />
    <CtaBanner label="Počnite od jednog problema." button="Prijavite problem" />
    <AboutSection />
    <PartnersSection />
    <Footer setPage={setPage} onNavigateToSection={onNavigateToSection} />
  </>;
}

function NewsPreview({ setPage }: { setPage: (page: Page) => void }) {
  const { t } = useLanguage();
  return (
    <section className="news-preview section">
      <div className="container">
        <p className="eyebrow">{t('NOVOSTI · PRIČE O USPJEHU')}</p>
        <div className="news-preview-card">
          <img src="/images/three-companies-success-stories.png" alt={t('Infografika o podršci kompanijama METALOS, SEMING i Geodet')} />
          <div>
            <p className="news-category">{t('ZELENA I DIGITALNA TRANSFORMACIJA')}</p>
            <h2>{t(articleTitle)}</h2>
            <p className="lead">{t('Tri kompanije povezale su konkretne razvojne potrebe sa stručnom podrškom, digitalnim rješenjima i planovima za naredne investicije.')}</p>
            <button className="text-button" type="button" onClick={() => setPage('article')}>{t('Pročitajte članak')} <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryPreview({ setPage }: { setPage: (page: Page) => void }) {
  const { t } = useLanguage();
  return <section className="industry-preview section"><div className="container industry-preview-inner"><div><p className="eyebrow">{t('INDUSTRIJE')}</p><h2>{t('Vaša industrija.')}<br /><em>{t('Vaš konkretan izazov.')}</em></h2><p className="lead">{t('Svaka industrija ima specifične potrebe. Zajedno pronalazimo rješenja koja imaju smisla za vaš sektor.')}</p><button className="primary-button" onClick={() => setPage('industries')} type="button">{t('Istražite mogućnosti')} <ArrowRight size={16} /></button></div><div className="industry-mini-grid">{industries.map(({ name, icon: Icon }) => <button type="button" key={name}><Icon size={26} /><span>{t(name)}</span></button>)}</div></div></section>;
}

function CtaBanner({ label, button }: { label: string; button: string }) { const { t } = useLanguage(); return <section className="cta-wrap" id="contact"><div className="container cta-banner"><div><h2>{t(label)}</h2><p>{t('Ne trebate znati rješenje. Dovoljno je da nam opišete šta vas usporava.')}</p></div><a className="dark-button" href={problemFormUrl} target="_blank" rel="noopener noreferrer">{t(button)} <ArrowRight size={16} /></a>
<div className="cta-eu">
  <img src="/images/euflag.jpg" alt={t('Zastava Evropske unije')} />
  <small>{t('Podrška kroz EU sufinansiranje,')}<br />{t('u skladu s uslovima programa.')}</small>
</div>
</div></section>; }

function PartnersSection() {
  const { t } = useLanguage();
  const partners = [
    { src: '/images/partner-cnt-sarajevo.png', alt: 'JU Centar za napredne tehnologije u Sarajevu' },
    { src: '/images/partner-verlab-institute.png', alt: 'Verlab Institut' },
    { src: '/images/partner-bh-telecom.png', alt: 'BH Telecom' },
    { src: '/images/partner-university-dzemal-bijedic.png', alt: 'Univerzitet Džemal Bijedić u Mostaru' },
    { src: '/images/partner-university-bihac.png', alt: 'Univerzitet u Bihaću' },
    { src: '/images/partner-employers-association.png', alt: 'Udruženje poslodavaca' },
    { src: '/images/partner-chamber-fbih.png', alt: 'Privredna komora Federacije Bosne i Hercegovine' },
    { src: '/images/partner-cidea.png', alt: 'CIDEA – Gradska razvojna agencija Banja Luka' },
    { src: '/images/partner-bit-alliance.png', alt: 'Bit Alliance' },
    { src: '/images/partner-verlab.png', alt: 'Verlab d.o.o.' },
    { src: '/images/partner-medit.png', alt: 'medIT' },
  ];

  return <section className="partners-section section" id="partners"><div className="container"><div className="partners-heading"><div><p className="eyebrow">{t('NAŠI PARTNERI')}</p><h2>{t('Znanje, infrastruktura i partnerstva na jednom mjestu.')}</h2></div><span className="partners-note">{t('11 partnera okupljenih oko digitalne transformacije.')}</span></div>
  <div className="partner-logos" role="region" aria-label={t('Logotipi partnera, pomjerite horizontalno da vidite sve')} tabIndex={0}>
    {partners.map(({ src, alt }) => (
      <div className="partner-logo" key={src}>
        <img src={src} alt={t(alt)} />
      </div>
    ))}
  </div>
  </div></section>;
  }

function AboutSection() {
  const { t } = useLanguage();
  return (
    <section className="about-section section" id="about">
      <div className="container">
        <p className="eyebrow">{t('O FUSIONX-U')}</p>
        <div className="about-intro">
          <div>
            <h2>{t('Povezujemo potrebe.')}<br /><em>{t('Znanje pretvaramo u primjenu.')}</em></h2>
          </div>
          <p className="lead">{t('FusionX je Evropski digitalni inovacijski hub u Bosni i Hercegovini. Povezujemo privredu, istraživanje, obrazovanje i tehnologiju kako bismo kompanijama i institucijama pomogli da naprave konkretne korake u digitalnoj transformaciji.')}</p>
        </div>
        <div className="about-cards">
          <div className="about-card"><Users size={30} /><h3>{t('Blizu stvarnih potreba')}</h3><p>{t('Počinjemo od izazova kompanija i javnih institucija, a podršku prilagođavamo njihovim ciljevima i mogućnostima.')}</p></div>
          <div className="about-card"><Network size={30} /><h3>{t('Pristup široj ekspertizi')}</h3><p>{t('Okupljamo partnere iz privrede, istraživanja i IT sektora, te povezujemo korisnike s odgovarajućim znanjem i kapacitetima.')}</p></div>
          <div className="about-card"><Building2 size={30} /><h3>{t('Znanje i infrastruktura')}</h3><p>{t('Partneri hub-a donose istraživačku ekspertizu, tehnologije i infrastrukturu za procjenu, testiranje i razvoj rješenja.')}</p></div>
        </div>
      </div>
    </section>
  );
}

function ArticlePage({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const { t } = useLanguage();
  return (
    <>
      <main className="article-page">
        <article className="container article">
          <button className="article-back" type="button" onClick={() => setPage('home')}>
            <ArrowLeft size={16} /> {t('Nazad na početnu')}
          </button>
          <header className="article-header">
            <p className="eyebrow">{t('PRIČE O USPJEHU · ZELENA I DIGITALNA TRANSFORMACIJA')}</p>
            <h1>{t(articleTitle)}</h1>
            <p className="article-standfirst">
              {t('Za mnoge kompanije izazov nije prepoznati šta treba unaprijediti, nego pronaći odgovarajuću podršku da se promjena zaista ostvari.')}
            </p>
          </header>

          <figure className="article-visual">
            <img src="/images/three-companies-success-stories.png" alt={t('Rezultati podrške za kompanije METALOS, SEMING i Geodet')} />
            <figcaption>{t('Tri primjera kako stručna podrška može odgovoriti na konkretne potrebe kompanija.')}</figcaption>
          </figure>

          <div className="article-body">
            <p>
              {t('Energetski gubici, zahtjevi evropskog tržišta i dugotrajna ručna obrada podataka dio su svakodnevnog poslovanja. Njihovo rješavanje traži stručnost, ulaganja i partnera koji razumije potrebe kompanije. Upravo tu svoju ulogu ostvaruje FusionX – Evropski digitalni inovacijski hub (EDIH) u Bosni i Hercegovini.')}
            </p>
            <p>
              {t('Na osnovu identificiranih potreba, planiranih mjera i procijenjenih investicija, stručnjaci FusionX-a pomažu kompanijama da bolje razumiju dostupne mogućnosti finansiranja. To uključuje relevantne grantove, programe podrške, kreditne linije i druge izvore finansiranja namijenjene digitalnoj i zelenoj transformaciji. Podrška obuhvata i usmjeravanje kompanije prema odgovarajućim instrumentima te pripremu kvalitetnije osnove za razgovore s finansijskim institucijama, investitorima i programima podrške.')}
            </p>
            <p>
              {t('U proteklom ciklusu podrške, kompanije iz metaloprerađivačke industrije, proizvodnje industrijskih dizalica i transportne opreme te geodetskih usluga dobile su podršku da svoje razvojne potrebe povežu s odgovarajućim izvorima stručne i finansijske podrške. Uz stručnu podršku članova FusionX tima i vlastito sufinansiranje, angažovale su pružaoce usluga za unapređenje poslovanja u oblastima zelene tranzicije, digitalne transformacije i tehnoloških inovacija.')}
            </p>

            <h2>{t('Priča kompanije iz Kreševa: podaci kao osnova za energetski efikasniju proizvodnju')}</h2>
            <p>
              {t('Za METALOS d.o.o. Kreševo, proizvođača metalnih konstrukcija i ogradnih sistema, energetska efikasnost i priprema za zahtjeve evropskog tržišta predstavljaju važan dio daljnjeg razvoja. Važan aspekt tog razvoja je i CBAM – mehanizam EU za ugljično prilagođavanje na granicama, koji zahtijeva pouzdane podatke o emisijama povezanim s proizvodnjom. Kompaniji je nedostajao integrisani sistem za praćenje potrošnje energije, resursa i emisija po proizvodnim procesima, što je otežavalo prepoznavanje mogućih ušteda, planiranje investicija i pripremu CBAM izvještaja. Dodatni izazov bio je nedostatak plana za uvođenje obnovljivih izvora energije u proizvodnju.')}
            </p>
            <p>
              {t('Tokom tri mjeseca proveden je energetski i resursni audit, kojim su analizirani proizvodni procesi i potrošnja energije i drugih resursa. Na osnovu nalaza izrađen je plan mjera za unapređenje grijanja, rasvjete, sistema komprimovanog zraka i proizvodnih procesa te su razmotrene mogućnosti korištenja solarne energije. Razvijen je i prilagođeni digitalni alat za praćenje energetskih pokazatelja i emisija stakleničkih plinova, pripremljen CBAM izvještaj i provedena obuka zaposlenih.')}
            </p>
            <p>
              {t('Saradnja s eDIH FusionX i njegovim stručnjacima METALOS-u je donijela jasne prioritete za ulaganja u energetsku efikasnost i osnovu za sistematsko praćenje potrošnje i emisija. Rezultati projekta omogućavaju kompaniji da investicione odluke donosi na temelju tehničkih i ekonomskih analiza te da podatke potrebne za CBAM izvještavanje prikuplja i obrađuje na strukturiran način.')}
            </p>

            <h2>{t('Priča kompanije iz Gračanice: jasan plan za zelenu tranziciju')}</h2>
            <p>
              {t('SEMING d.o.o. Gračanica, specijaliziran za projektovanje, proizvodnju i montažu industrijskih dizalica i transportne opreme, svoju je razvojnu potrebu usmjerio na održiviju i energetski efikasniju proizvodnju. Kompaniji je nedostajao sistemski pristup upravljanju energijom, uz ograničene podatke o potrošnji po proizvodnim procesima i nepostojanje sistema za praćenje emisija stakleničkih plinova. Dodatni izazov predstavljali su loše toplotne karakteristike proizvodnog objekta, energetski neefikasan sistem grijanja i zastarjela rasvjeta, koji su doprinosili povećanoj potrošnji energije i višim operativnim troškovima.')}
            </p>
            <p>
              {t('Tokom tri mjeseca analizirani su proizvodni procesi, potrošnja energije, sistem grijanja, rasvjeta i toplotne karakteristike proizvodnog objekta. Procijenjene su direktne i indirektne emisije stakleničkih plinova te definisane prioritetne mjere za unapređenje energetske efikasnosti. Projekat je obuhvatio analizu mogućnosti korištenja fotonaponske elektrane, preporuke za uspostavljanje sistema energetskog menadžmenta i pripremu podataka i procedura za buduće CBAM izvještavanje. Razvijen je jednostavan digitalni alat za praćenje energetskih i okolišnih pokazatelja, uz obuku zaposlenih za njegovu primjenu.')}
            </p>
            <p>
              {t('Saradnja s eDIH FusionX i njegovim stručnjacima SEMING-u je donijela sistemski pregled energetskih gubitaka i plan ulaganja s procjenom mogućih ušteda. Rezultati projekta omogućavaju kompaniji da naredne korake zelene tranzicije planira prema jasno utvrđenim potrebama i prioritetima.')}
            </p>

            <h2>{t('Priča kompanije iz Sarajeva: od terenskih mjerenja do automatizovane izrade elaborata')}</h2>
            <p>
              {t('Geodet d.o.o. Sarajevo, kompanija specijalizirana za geodetske usluge, uključujući terenska snimanja, izradu geodetskih situacija, parcelaciju zemljišta i izradu baza podataka, svoju je razvojnu potrebu usmjerila na efikasniju obradu mjerenja i pripremu dokumentacije. Savremena oprema za satelitska geodetska mjerenja prikupljala je podatke koji su se zatim obrađivali ručno. Takav postupak zahtijevao je značajno vrijeme i povećavao mogućnost grešaka, posebno kod obimnijih poslova.')}
            </p>
            <p>
              {t('Tokom tri mjeseca razvijen je softver koji automatski preuzima i obrađuje podatke iz mjernih uređaja, popunjava odgovarajuće geodetske obrasce i generiše elaborate u Excel formatu. Rješenje je testirano na stvarnim terenskim podacima, a provjere su potvrdile pouzdanost prenosa i obrade podataka iz podržanih formata. Izrađeno je korisničko uputstvo i provedeno osposobljavanje korisnika, dok je procjena digitalne konkurentnosti izdvojila pravce za daljnji razvoj kompanije.')}
            </p>
            <p>
              {t('Saradnja s eDIH FusionX Geodetu je donijela funkcionalno rješenje spremno za svakodnevnu upotrebu, koje smanjuje potrebu za ručnim unosom i olakšava pripremu elaborata. Time je savremena terenska oprema povezana s digitalnim procesom obrade, uz veću standardizaciju rada i manji rizik od grešaka.')}
            </p>

            <h2>{t('Od stručne podrške do investicije')}</h2>
            <p>
              {t('Podrška eDIH FusionX ne završava identifikacijom problema, izradom analiza ili razvojem digitalnih rješenja. Kroz uslugu pristupa finansiranju, kompanijama se pomaže da rezultate stručne podrške pretvore u konkretne razvojne i investicione korake. Na taj način tehničke preporuke ne ostaju samo na nivou izvještaja. Kompanija dobija jasniji odgovor na tri ključna pitanja: u šta investirati, kojim redoslijedom i gdje tražiti sredstva za realizaciju.')}
            </p>
            <p>
              {t('Primjeri METALOS-a, SEMING-a i Geodeta pokazuju vrijednost takvog pristupa. FusionX povezuje tehničku ekspertizu, digitalna rješenja, razvoj kompetencija i pristup finansiranju u jedinstven proces podrške. Cilj nije samo unaprijediti jedan proces, nego kompaniji dati znanje, podatke i konkretan plan za narednu fazu razvoja.')}
            </p>

            <aside className="article-contact">
              <h2>{t('Želite unaprijediti poslovanje svoje kompanije?')}</h2>
              <p>{t('Razvijate digitalno rješenje ili želite pokrenuti zelenu tranziciju? Javite se FusionX EDIH-u.')}</p>
              <ContactEmails className="article-email-list" />
            </aside>
          </div>
        </article>
      </main>
      <Footer setPage={setPage} onNavigateToSection={onNavigateToSection} />
    </>
  );
}

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

const privacySections: LegalSection[] = [
  {
    heading: 'Ko upravlja podacima?',
    paragraphs: [
      'Ova stranica predstavlja FusionX – Evropski digitalni inovacijski hub (EDIH) u Bosni i Hercegovini. Zvanični naziv i kontakt podaci pravnog lica koje je kontrolor ličnih podataka trebaju biti objavljeni ovdje prije puštanja stranice u javni rad. Za pitanja o privatnosti možete pisati na jednu od kontakt-adresa navedenih ispod.',
    ],
  },
  {
    heading: 'Koje podatke obrađujemo i zašto?',
    paragraphs: [
      'Sama web stranica ne traži otvaranje korisničkog računa niti sadrži polja za direktan unos ličnih podataka. Ako nas kontaktirate putem e-maila ili obrasca „Prijavite problem“, obrađuju se podaci koje sami navedete, kako bismo odgovorili na upit i razmotrili moguću podršku.',
      'Molimo da u obrascu ne šaljete posebne kategorije ličnih podataka, povjerljive podatke trećih lica ili druge informacije koje nisu potrebne za opis poslovnog izazova.',
    ],
  },
  {
    heading: 'Obrazac i vanjske usluge',
    paragraphs: [
      'Obrazac „Prijavite problem“ nalazi se na Microsoft Forms stranici i otvara se na Microsoftovoj platformi. Kada pređete na obrazac, Microsoft može obrađivati tehničke podatke u skladu sa svojim pravilima, a podaci koje pošaljete zavise od pitanja i postavki tog obrasca. Prije objave ove politike potrebno je potvrditi vlasnika obrasca, ko ima pristup odgovorima, uključene pružaoce usluga i odgovarajuće obavještenje prikazano uz obrazac.',
      'Web stranica ne ugrađuje analitičke ili oglasne alate u svoju aplikaciju. Podešavanja kolačića, logova i drugih tehničkih zapisa kod pružaoca web hostinga treba provjeriti na okruženju na kojem se stranica objavljuje.',
    ],
  },
  {
    heading: 'Pravni osnov, primaoci i rok čuvanja',
    paragraphs: [
      'Pravni osnov obrade, kategorije primalaca i rokovi čuvanja zavise od načina na koji FusionX zaprima i rješava prijave te od konfiguracije Microsoft Forms obrasca. Odgovorno pravno lice treba unijeti te konkretne podatke i uskladiti ih s važećim propisima prije objave ove politike. Podaci se ne trebaju čuvati duže nego što je potrebno za navedenu svrhu i primjenjive obaveze.',
    ],
  },
  {
    heading: 'Vaša prava i kontakt',
    paragraphs: [
      'U skladu s primjenjivim propisima, možete zatražiti informaciju o obradi svojih podataka, pristup, ispravku ili brisanje, ograničenje obrade, odnosno uložiti prigovor kada je to primjenjivo. Zahtjev možete poslati na jednu od kontakt-adresa navedenih ispod. Možete se obratiti i nadležnoj Agenciji za zaštitu ličnih podataka u Bosni i Hercegovini.',
      'Ova politika će biti ažurirana kada se promijene način rada stranice, obrazac ili pravni zahtjevi. Datum i verzija politike trebaju se dodati nakon što odgovorno pravno lice potvrdi sadržaj.',
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    heading: 'O stranici',
    paragraphs: [
      'Ova web stranica pruža opće informacije o FusionX-u, njegovim aktivnostima, uslugama i mogućnostima podrške za digitalnu i zelenu transformaciju. Sadržaj je informativan i sam po sebi ne predstavlja ponudu, garanciju finansiranja niti obavezu da će određena usluga biti pružena.',
    ],
  },
  {
    heading: 'Prijava problema i usluge podrške',
    paragraphs: [
      'Slanje prijave ili upita ne garantuje prihvatanje u program, finansiranje, određeni rezultat ili početak saradnje. Obim, uslovi, raspoloživost i odgovornost za konkretnu uslugu utvrđuju se zasebno s odgovornim pružaocem usluge.',
      'Molimo da putem javnog obrasca ne dostavljate lozinke, povjerljive poslovne informacije koje nisu potrebne za upit ili lične podatke drugih osoba bez odgovarajućeg ovlaštenja.',
    ],
  },
  {
    heading: 'Sadržaj i intelektualno vlasništvo',
    paragraphs: [
      'Tekstovi, vizuelni materijali, logotipi i drugi sadržaji na stranici pripadaju njihovim nosiocima prava ili se koriste uz odgovarajuće ovlaštenje. Nije dozvoljeno kopirati, mijenjati ili komercijalno koristiti sadržaj na način koji krši prava nosilaca. Imena i logotipi partnera ostaju vlasništvo njihovih nosilaca.',
    ],
  },
  {
    heading: 'Vanjske stranice i dostupnost',
    paragraphs: [
      'Stranica može sadržavati poveznice na usluge trećih strana, uključujući Microsoft Forms. Te usluge imaju vlastite uslove korištenja i pravila privatnosti; FusionX ne upravlja njihovim sadržajem ni radom.',
      'Nastojimo da informacije budu ažurne i stranica dostupna, ali ne garantujemo neprekidan pristup niti da je svaka informacija potpuna ili prikladna za svaku pojedinačnu odluku. Za odluke o ulaganjima, finansiranju ili usklađenosti zatražite odgovarajući stručni savjet.',
    ],
  },
  {
    heading: 'Izmjene i kontakt',
    paragraphs: [
      'Uslovi se mogu ažurirati kada se promijeni stranica ili način pružanja podrške. Nastavak korištenja stranice nakon objave izmjena znači da se primjenjuje ažurirana verzija u mjeri dozvoljenoj važećim propisima. Za pitanja o stranici ili ovim uslovima pišite na jednu od kontakt-adresa navedenih ispod.',
      'Prije objave, odgovorno pravno lice treba potvrditi identitet pružaoca stranice, mjerodavno pravo i eventualna ograničenja odgovornosti. Ovaj tekst nije zamjena za pravnu provjeru.',
    ],
  },
];

function LegalPage({ page, setPage, onNavigateToSection }: { page: 'privacy' | 'terms'; setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const { t } = useLanguage();
  const isPrivacy = page === 'privacy';
  const sections = isPrivacy ? privacySections : termsSections;
  const title = t(isPrivacy ? 'Politika privatnosti' : 'Uslovi korištenja');

  return (
    <>
      <main className="legal-page">
        <article className="container legal-document">
          <button className="article-back" type="button" onClick={() => setPage('home')}>
            <ArrowLeft size={16} /> {t('Nazad na početnu')}
          </button>
          <header className="legal-header">
            <p className="eyebrow">{t('FUSIONX EDIH · PRAVNE INFORMACIJE')}</p>
            <h1>{title}</h1>
            <p className="legal-intro">
              {isPrivacy
                ? t('Informacije o tome kako se postupa s podacima kada posjetite stranicu ili pošaljete upit FusionX-u.')
                : t('Osnovna pravila za korištenje informativne web stranice FusionX EDIH-a.')}
            </p>
          </header>
          <div className="legal-body">
            {sections.map(({ heading, paragraphs }) => (
              <section key={heading}>
                <h2>{t(heading)}</h2>
                {paragraphs.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}
              </section>
            ))}
          </div>
          <div className="legal-updated">{t('Za pitanja:')}<ContactEmails className="legal-email-list" /></div>
        </article>
      </main>
      <Footer setPage={setPage} onNavigateToSection={onNavigateToSection} />
    </>
  );
}

function ContactPage({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const { t } = useLanguage();
  return (
    <>
      <main className="contact-page">
        <section className="container contact-content">
          <button className="contact-back" type="button" onClick={() => setPage('home')}>
            <ArrowLeft size={16} /> {t('Nazad na početnu')}
          </button>
          <p className="eyebrow">{t('KONTAKT · FUSIONX EDIH')}</p>
          <h1>{t('Razgovarajmo o vašem')}<br /><em>{t('sljedećem koraku.')}</em></h1>
          <p className="contact-intro">{t('Recite nam s kojim se poslovnim izazovom suočavate. Zajedno možemo istražiti odgovarajuće mogućnosti podrške za digitalnu i zelenu transformaciju.')}</p>
          <div className="contact-options">
            <section className="contact-card">
              <Mail size={28} />
              <h2>{t('Pišite nam')}</h2>
              <p>{t('Za pitanja o uslugama, partnerstvu ili radu FusionX EDIH-a javite nam se e-mailom.')}</p>
              <ContactEmails />
            </section>
            <section className="contact-card contact-card-highlight">
              <FileText size={28} />
              <h2>{t('Prijavite problem')}</h2>
              <p>{t('Opišite izazov svoje kompanije putem obrasca. Prijava je prvi korak, a daljnje mogućnosti razmatramo zajedno.')}</p>
              <a href={problemFormUrl} target="_blank" rel="noopener noreferrer">{t('Otvorite obrazac')} <ArrowRight size={16} /></a>
            </section>
          </div>
        </section>
      </main>
      <Footer setPage={setPage} onNavigateToSection={onNavigateToSection} />
    </>
  );
}

function IndustriesPage({ setPage, onNavigateToSection }: { setPage: (page: Page) => void; onNavigateToSection: (section: string) => void }) {
  const { t } = useLanguage();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  return <>
    <section className="industry-hero">
      <div className="container industry-hero-grid">
        <div className="industry-hero-copy">
          <p className="breadcrumbs">
            {t('Naslovna / Industrije')}
          </p>

          <p className="eyebrow">
            {t('RJEŠENJA PO MJERI VAŠEG POSLOVANJA')}
          </p>

          <h1>
            {t('Vaša industrija.')}
            <br />
            <em>{t('Vaš konkretan izazov.')}</em>
          </h1>

          <p className="lead">
            {t('Svaki sektor ima svoje izazove. Zajedno prepoznajemo šta vas usporava i testiramo rješenje prije nego što investirate.')}
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() =>
              document.getElementById("industry-list")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t('Pronađite svoju industriju')}
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
        {t('GDJE ŽELITE NAPRAVITI POMAK?')}
      </p>

      <h2>
        {t('Odaberite sektor i pogledajte primjere problema koje možemo istražiti s vama.')}
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
              <h3>{t(name)}</h3>
              <p>{t(description)}</p>
              <span>
                {t('Pogledajte mogućnosti')} <ArrowRight size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
   <section className="production section"><div className="container production-grid"><div><p className="eyebrow">{t('PROIZVODNJA · MOGUĆNOSTI TESTIRANJA')}</p><h2>{t('Manje zastoja. Bolji uvid u proizvodnju.')}</h2><p className="lead">{t('Počinjemo od jednog procesa i provjeravamo šta se može unaprijediti u stvarnim uslovima.')}</p><div className="test-table"><div><strong>{t('Vaš problem')}</strong><strong>{t('Šta možemo testirati')}</strong></div>{[['Greške i škart', 'Rano otkrivanje odstupanja u kvalitetu'], ['Zastoji u proizvodnji', 'Analizu uskih grla i uzroka zastoja'], ['Loše planiranje', 'Planiranje na osnovu dostupnih podataka'], ['Ručno vođenje evidencija', 'Digitalno praćenje procesa']].map(([a, b]) => <div key={a}><span>{t(a)}</span><span>{t(b)}</span></div>)}</div><PrimaryButton>Prijavite problem u proizvodnji</PrimaryButton></div><div className="production-art">
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
  const [language, setLanguage] = useState<Language>(() => window.localStorage.getItem('fusionx-language') === 'en' ? 'en' : 'bs');

  const toggleLanguage = () => setLanguage((current) => current === 'bs' ? 'en' : 'bs');
  const t = (text: string) => translate(text, language);

  useEffect(() => {
    window.localStorage.setItem('fusionx-language', language);
    document.documentElement.lang = language;
    document.title = translate('FusionX EDIH | Digitalna i zelena transformacija', language);
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = translate('FusionX EDIH povezuje kompanije s ekspertizom, tehnologijom i podrškom za digitalnu i zelenu transformaciju.', language);
    }
    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (openGraphTitle) openGraphTitle.content = document.title;
    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (openGraphDescription) openGraphDescription.content = description?.content ?? '';
  }, [language]);

  useEffect(() => {
    if (page === 'home' && pendingSection) {
      document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth' });
      setPendingSection(null);
    }
  }, [page, pendingSection]);

  const navigateToPage = (nextPage: Page) => {
    setPendingSection(null);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToSection = (section: string) => {
    if (page === 'home') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setPendingSection(section);
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}><Header page={page} setPage={navigateToPage} onNavigateToSection={navigateToSection} />{page === 'home' ? <HomePage setPage={navigateToPage} onNavigateToSection={navigateToSection} /> : page === 'industries' ? <IndustriesPage setPage={navigateToPage} onNavigateToSection={navigateToSection} /> : page === 'article' ? <ArticlePage setPage={navigateToPage} onNavigateToSection={navigateToSection} /> : page === 'contact' ? <ContactPage setPage={navigateToPage} onNavigateToSection={navigateToSection} /> : <LegalPage page={page} setPage={navigateToPage} onNavigateToSection={navigateToSection} />}</LanguageContext.Provider>;
}

export default App;
