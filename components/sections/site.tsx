"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { restaurant } from "@/data/restaurant";

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="wrap header-inner"><Link className="brand-link" href="/" aria-label="The White Rabbit home"><Image src="/images/brand/white-rabbit-logo.png" alt="The White Rabbit" width={402} height={101} priority/></Link><button className="menu-toggle" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button><nav className={`nav ${open ? "open" : ""}`} aria-label="Main navigation" onClick={() => setOpen(false)}><Link href="/#menu">Menu</Link><Link href="/#about">About</Link><Link href="/#events">Events</Link><Link href="/#gallery">Food</Link><Link href="/#book">Book</Link><Link href="/#visit">Visit</Link><a className="nav-cta" href={`tel:${restaurant.phone.replace(/[\s-]/g, "")}`}>Call us</a></nav></div></header>;
}

function MenuPages() {
  const [expandedPage, setExpandedPage] = useState<number | null>(null);
  const pages = restaurant.menuImages;

  useEffect(() => {
    if (expandedPage === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedPage(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [expandedPage]);

  return <div className="menu-carousel">
    <div className="menu-pages-grid">
      {pages.map((page) => <button className="menu-page-card" type="button" onClick={() => setExpandedPage(page.page)} key={page.page} aria-label={`Enlarge menu page ${page.page}`}><Image src={page.src} alt={page.alt} width={1000} height={1250} sizes="(max-width: 760px) 44vw, 24vw"/><span><strong>Page {String(page.page).padStart(2, "0")}</strong><span>View menu ↗</span></span></button>)}
    </div>
    {expandedPage !== null && (() => {
      const page = pages.find((item) => item.page === expandedPage);
      if (!page) return null;
      return <div className="menu-lightbox" role="dialog" aria-modal="true" aria-label={`Menu page ${page.page}`} onClick={() => setExpandedPage(null)}>
        <div className="menu-lightbox-panel" onClick={(event) => event.stopPropagation()}>
          <div className="menu-lightbox-toolbar"><span>MENU · PAGE {String(page.page).padStart(2, "0")}</span><button type="button" onClick={() => setExpandedPage(null)} aria-label="Close enlarged menu">Close <span aria-hidden="true">×</span></button></div>
          <div className="menu-lightbox-image"><Image src={page.src} alt={page.alt} width={1000} height={1250} sizes="(max-width: 760px) 94vw, 760px" priority/></div>
          <div className="menu-lightbox-nav"><button type="button" disabled={page.page === 1} onClick={() => setExpandedPage(page.page - 1)}>← Previous</button><button type="button" disabled={page.page === pages.length} onClick={() => setExpandedPage(page.page + 1)}>Next →</button></div>
        </div>
      </div>;
    })()}
  </div>;
}

export function MenuPage() { return <><Header/><main className="page-menu wrap"><div className="eyebrow">Pepsicola · Kathmandu</div><h1 className="serif">The menu<span className="hero-period">.</span></h1><p className="menu-intro">Choose a page to read it full size.</p><MenuPages/><p className="menu-meta" style={{ marginTop: 24 }}>Prices are subject to a 10% service charge.</p></main><Footer/></>; }

const eventMoments = [
  { src: "/images/events/bridal-shower.webp", width: 1100, height: 734, alt: "Friends celebrating a bridal shower at The White Rabbit", kind: "Bridal shower", caption: "A shower for the bride-to-be." },
  { src: "/images/events/doorway-portrait.webp", width: 1066, height: 1600, alt: "A guest posing by The White Rabbit's red doorway", kind: "At the Rabbit", caption: "A photo by the red doorway." },
  { src: "/images/events/friends-outing.webp", width: 640, height: 960, alt: "Two friends enjoying a visit outside The White Rabbit", kind: "Friends together", caption: "A daytime visit and a catch-up." },
  { src: "/images/events/flower-wall-portrait.webp", width: 1066, height: 1600, alt: "A guest at The White Rabbit's flower wall", kind: "Photo moments", caption: "A keepsake by the flower wall." },
  { src: "/images/events/birthday-gathering.webp", width: 1066, height: 1600, alt: "Guests celebrating a birthday at The White Rabbit", kind: "Birthday gathering", caption: "A birthday table with close friends." },
  { src: "/images/events/garden-portrait.webp", width: 1066, height: 1600, alt: "A guest posing in the garden at The White Rabbit", kind: "A day out", caption: "A bright afternoon in the garden." },
  { src: "/images/events/group-evening.webp", width: 1066, height: 1600, alt: "A group of friends gathered at The White Rabbit", kind: "Group evenings", caption: "Dinner and a proper catch-up." },
  { src: "/images/events/celebration-portrait.webp", width: 1066, height: 1600, alt: "A guest celebrating at The White Rabbit", kind: "Celebration moments", caption: "A special moment at the Rabbit." },
  { src: "/images/events/birthday-celebration.webp", width: 1066, height: 1600, alt: "A birthday celebration with balloons and cake at The White Rabbit", kind: "Birthday celebration", caption: "Balloons, cake and a birthday toast." },
  { src: "/images/events/red-dress-portrait.webp", width: 1066, height: 1600, alt: "A guest posing in the garden at The White Rabbit", kind: "Photo moments", caption: "A portrait among the red and green." },
  { src: "/images/events/friends-together.webp", width: 1100, height: 734, alt: "Friends gathered outside The White Rabbit", kind: "Friends together", caption: "A group photo outside the Rabbit." },
  { src: "/images/events/family-celebration.webp", width: 1100, height: 734, alt: "A group celebrating around a cake at The White Rabbit", kind: "Birthday gathering", caption: "A birthday shared across generations." },
];

function EventsSection() {
  return <section className="section events-section" id="events"><div className="wrap">
    <div className="events-heading"><div><div className="eyebrow">Gather at The White Rabbit</div><h2 className="section-heading serif">Moments made together.</h2></div><p>Birthdays, bridal showers and casual catch-ups, celebrated around one table.</p></div>
    <div className="events-collage">{eventMoments.map((event, index) => <figure className={`event-card event-card-${index + 1}`} key={event.src}>
      <div className="event-photo"><Image src={event.src} alt={event.alt} width={event.width} height={event.height} sizes="(max-width: 600px) 46vw, (max-width: 900px) 30vw, 23vw"/></div>
      <figcaption><span>{event.kind}</span><p>{event.caption}</p></figcaption>
    </figure>)}</div>
  </div></section>;
}

function SocialLinks({ location }: { location: "footer" | "visit" }) {
  return <div className={`social-links social-links-${location}`} aria-label="The White Rabbit social media">
    <a href={restaurant.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit The White Rabbit on Instagram" title="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle className="social-icon-dot" cx="18" cy="6" r="1"/></svg><span>Instagram</span>
    </a>
    <a href={restaurant.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit The White Rabbit on Facebook" title="Facebook">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.2 1.2 16.1 1 15 1c-3.3 0-5 2-5 5.5V9H7v4h3v8z"/></svg><span>Facebook</span>
    </a>
  </div>;
}

function Footer() { return <footer className="footer"><div className="wrap footer-inner"><Link className="brand-link footer-brand" href="/" aria-label="The White Rabbit home"><Image src="/images/brand/white-rabbit-logo.png" alt="The White Rabbit" width={402} height={101}/></Link><span>Pepsicola · Kathmandu</span><SocialLinks location="footer"/></div></footer>; }

function ReservationForm() {
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const optional = (key: string) => String(values.get(key) || "").trim();
    const message = [
      "Hello The White Rabbit! I'd like to request a table.",
      `Name: ${optional("name")}`,
      `Phone: ${optional("phone")}`,
      `Date: ${optional("date")}`,
      `Time: ${optional("time")}`,
      `Guests: ${optional("guests")}`,
      `Occasion: ${optional("occasion") || "Not specified"}`,
      `Notes: ${optional("notes") || "None"}`,
      "Please let me know if this time is available.",
    ].join("\n");
    const url = `https://wa.me/${restaurant.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    setWhatsAppUrl(url);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return <form className="reservation-form" onSubmit={sendRequest}>
    <div className="reservation-photo">
      <Image src="/images/gallery/restaurant-guests.webp" alt="Guests outside The White Rabbit" fill sizes="(max-width: 760px) 100vw, 58vw" priority={false}/>
      <div className="reservation-photo-caption"><span>THE WHITE RABBIT · PEPSICOLA</span><strong>Good things happen<br/>around the table.</strong></div>
    </div>
    <div className="reservation-form-heading"><h3>Reservation request</h3><span>We’ll reply to confirm your table</span></div>
    <div className="form-fields">
      <label>Name<input name="name" autoComplete="name" placeholder="Your name" required/></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required/></label>
      <label>Date<input name="date" type="date" required/></label>
      <label>Preferred time<select name="time" defaultValue="" required><option value="" disabled>Select a time</option><option>11:00 AM</option><option>12:00 PM</option><option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option><option>4:00 PM</option><option>5:00 PM</option><option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option></select></label>
      <label>Guests<select name="guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9+</option></select></label>
      <label>Occasion<select name="occasion" defaultValue=""><option value="">Choose an occasion (optional)</option><option>Casual dining</option><option>Birthday</option><option>Family gathering</option><option>Group hangout</option><option>Other celebration</option></select></label>
      <label className="form-notes">Notes<textarea name="notes" rows={3} placeholder="Anything we should know? (optional)"/></label>
    </div>
    <button className="button reservation-submit" type="submit">Request a table on WhatsApp <span aria-hidden="true">↗</span></button>
    <p className="reservation-status" aria-live="polite">{whatsAppUrl && <>WhatsApp should open with your request ready. If it doesn’t, <a href={whatsAppUrl} target="_blank" rel="noreferrer">open your message here</a>.</>}</p>
    <p className="reservation-note">No payment is required to send a request.</p>
  </form>;
}

function VisitSection() {
  const phone = restaurant.phone.replace(/\D/g, "");
  return <section className="section visit" id="visit"><div className="wrap">
    <div className="eyebrow">Visit us</div>
    <h2 className="section-heading serif visit-heading">Find your way here.</h2>
    <div className="visit-grid">
      <div className="visit-card">
        <div className="visit-block"><h3>Address</h3><p>{restaurant.address}</p></div>
        <div className="visit-block"><h3>Hours</h3><p>Monday — Sunday<br/>10:30 AM — 10:00 PM</p></div>
        <div className="visit-block"><h3>Call or message</h3><p><a href={`tel:+${phone}`}>{restaurant.phone}</a><br/><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a></p></div>
        <div className="visit-block"><h3>Follow along</h3><SocialLinks location="visit"/></div>
        <div className="amenities">{restaurant.amenities.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="visit-map">
        <iframe title="Map to The White Rabbit in Pepsicola, Kathmandu" src="https://maps.google.com/maps?q=The%20White%20Rabbit%20Pepsicola%20Kathmandu&t=m&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
        <a className="map-direction-link" href={restaurant.mapUrl} target="_blank" rel="noreferrer">Open directions in Google Maps ↗</a>
      </div>
    </div>
  </div></section>;
}

function LifeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.25 });

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return <video ref={videoRef} muted loop playsInline preload="none" aria-label="Life at The White Rabbit"><source src="/video/white-rabbit.mp4" type="video/mp4"/></video>;
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set the media properties before requesting playback. Mobile Safari can
    // otherwise treat a React-rendered muted attribute as a late mute change.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startPlayback = () => {
      if (document.visibilityState === "visible" && video.paused) {
        void video.play().catch(() => {});
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") startPlayback();
    };

    startPlayback();
    video.addEventListener("canplay", startPlayback);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      video.removeEventListener("canplay", startPlayback);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <video ref={videoRef} className="hero-video-main" autoPlay muted loop playsInline preload="auto" aria-label="Food being served at The White Rabbit"><source src="/video/food-service.mp4" type="video/mp4"/></video>;
}

export function HomePage() {
  return <><Header/><main>
    <section className="hero"><HeroVideo/><div className="wrap hero-content fade-up"><div className="hero-overline">Pepsicola · Kathmandu</div><div className="hero-brand"><Image src="/images/brand/white-rabbit-logo-light.png" alt="The White Rabbit" width={402} height={101} priority/></div><div className="hero-bottom"><p className="hero-sub">A cozy place for good food and good company.</p><div className="hero-actions"><a className="button button-light" href="#menu">Explore the menu</a><a className="button" href="#book">Book a table</a></div></div></div></section>
    <section className="section wrap intro" id="about"><div><div className="eyebrow">The White Rabbit</div><h2 className="section-heading serif">Life at The White Rabbit.</h2><p className="intro-copy">Good food served fresh, rooftop conversations, and small celebrations that turn an ordinary evening into a favorite memory. From coffee and relaxed dinners to birthdays with friends and family, there’s room here to make the day your own.</p></div><figure className="intro-film-portrait" id="gallery"><LifeVideo/><figcaption>LIFE AT THE WHITE RABBIT</figcaption></figure></section>
    <EventsSection/>
    <section className="section menu-section" id="menu"><div className="wrap"><div className="menu-heading"><div><div className="eyebrow">Fresh from our kitchen</div><h2 className="section-heading serif">The menu<span className="hero-period">.</span></h2></div><p>Tap a page to read the menu full size.</p></div><MenuPages/><p className="menu-meta" style={{ marginTop: 18 }}>Prices are subject to a 10% service charge.</p><Link className="menu-full-link" href="/menu">Open the full menu <span aria-hidden="true">↗</span></Link></div></section>
    <section className="section reservation-section" id="book"><div className="wrap reservation-grid"><div className="reservation-copy"><div className="eyebrow">Reservations · Pepsicola, Kathmandu</div><h2 className="section-heading serif">Book a table.</h2><p>Tell us when you’d like to visit. Your request opens in WhatsApp, where our team can confirm availability directly.</p><div className="reservation-details"><div><span>Open daily</span><strong>10:30 am — 10:00 pm</strong></div><div><span>Typical spend</span><strong>NPR 500 — 1,000 per person</strong></div></div><div className="reservation-contact"><span>Prefer to call?</span><a href={`tel:${restaurant.phone.replace(/[\s-]/g, "")}`}>{restaurant.phone}</a></div></div><ReservationForm/></div></section>
    <VisitSection/>
  </main><Footer/></>;
}
