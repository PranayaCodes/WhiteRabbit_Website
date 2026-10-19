"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type UIEvent } from "react";
import { restaurant } from "@/data/restaurant";

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="wrap header-inner"><Link className="brand-link" href="/" aria-label="The White Rabbit home"><Image src="/images/brand/white-rabbit-logo.png" alt="The White Rabbit" width={402} height={101} priority/></Link><button className="menu-toggle" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button><nav className={`nav ${open ? "open" : ""}`} aria-label="Main navigation" onClick={() => setOpen(false)}><Link href="/#menu">Menu</Link><Link href="/#about">About</Link><Link href="/#gallery">Food</Link><Link href="/#visit">Visit</Link><a className="nav-cta" href={`tel:${restaurant.phone.replace(/[\s-]/g, "")}`}>Call us</a></nav></div></header>;
}

function MenuPages() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const pages = restaurant.menuImages;

  function scrollToPage(index: number) {
    const rail = railRef.current;
    const card = rail?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActivePage(index);
  }

  function updateActivePage(event: UIEvent<HTMLDivElement>) {
    const rail = event.currentTarget;
    const railLeft = rail.getBoundingClientRect().left;
    const closestPage = Array.from(rail.children).reduce((closest, child, index, all) => {
      const distance = Math.abs((child as HTMLElement).getBoundingClientRect().left - railLeft);
      const closestDistance = Math.abs((all[closest] as HTMLElement).getBoundingClientRect().left - railLeft);
      return distance < closestDistance ? index : closest;
    }, 0);
    setActivePage(closestPage);
  }

  return <div className="menu-carousel">
    <div className="menu-carousel-tools" aria-label="Menu page controls">
      <span className="menu-page-count">Page {activePage + 1} <span aria-hidden="true">/</span> {pages.length}</span>
      <div className="menu-carousel-buttons">
        <button type="button" onClick={() => scrollToPage(Math.max(0, activePage - 1))} disabled={activePage === 0} aria-label="Previous menu page">←</button>
        <button type="button" onClick={() => scrollToPage(Math.min(pages.length - 1, activePage + 1))} disabled={activePage === pages.length - 1} aria-label="Next menu page">→</button>
      </div>
    </div>
    <div className="menu-pages-grid" ref={railRef} onScroll={updateActivePage}>
      {pages.map((page) => <a className="menu-page-card" href={page.src} target="_blank" rel="noreferrer" key={page.page} aria-label={`Open menu page ${page.page} full size`}><Image src={page.src} alt={page.alt} width={1000} height={1250} sizes="(max-width: 760px) 88vw, 48vw"/><span>Page {String(page.page).padStart(2, "0")} <span aria-hidden="true">↗</span></span></a>)}
    </div>
  </div>;
}

export function MenuPage() { return <><Header/><main className="page-menu wrap"><div className="eyebrow">Pepsicola · Kathmandu</div><h1 className="serif">The menu<span className="hero-period">.</span></h1><p className="menu-intro">Swipe through all four pages or tap any page to open it full size.</p><MenuPages/><p className="menu-meta" style={{ marginTop: 24 }}>Prices are subject to a 10% service charge.</p></main><Footer/></>; }

function Footer() { return <footer className="footer"><div className="wrap footer-inner"><Link className="brand-link footer-brand" href="/" aria-label="The White Rabbit home"><Image src="/images/brand/white-rabbit-logo.png" alt="The White Rabbit" width={402} height={101}/></Link><span>Pepsicola · Kathmandu</span><div className="footer-social"><a href={restaurant.socials.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={restaurant.socials.facebook} target="_blank" rel="noreferrer">Facebook</a></div></div></footer>; }

export function HomePage() {
  return <><Header/><main><section className="hero"><video className="hero-video-main" autoPlay muted loop playsInline preload="auto" aria-label="Food being served at The White Rabbit"><source src="/video/food-service.mp4" type="video/mp4"/></video><div className="wrap hero-content fade-up"><div className="hero-overline">Pepsicola · Kathmandu</div><div className="hero-brand"><Image src="/images/brand/white-rabbit-logo-light.png" alt="The White Rabbit" width={402} height={101} priority/></div><div className="hero-bottom"><p className="hero-sub">A cozy place for good food and good company.</p><div className="hero-actions"><a className="button button-light" href="#menu">Explore the menu</a><a className="button" href={`tel:${restaurant.phone.replace(/[\s-]/g, "")}`}>Call to visit</a></div></div></div></section>
  <section className="section wrap intro" id="about"><div><div className="eyebrow">The White Rabbit</div><h2 className="section-heading serif">Life at The White Rabbit.</h2><p className="intro-copy">Good food served fresh, rooftop conversations, and small celebrations that turn an ordinary evening into a favorite memory. From coffee and relaxed dinners to birthdays with friends and family, there’s room here to make the day your own.</p></div><figure className="intro-film-portrait" id="gallery"><video autoPlay muted loop playsInline preload="metadata" aria-label="Life at The White Rabbit"><source src="/video/white-rabbit.mp4" type="video/mp4"/></video><figcaption>LIFE AT THE WHITE RABBIT</figcaption></figure></section>
  <section className="section menu-section" id="menu"><div className="wrap"><div className="menu-heading"><div><div className="eyebrow">Fresh from our kitchen</div><h2 className="section-heading serif">The menu<span className="hero-period">.</span></h2></div><p>Four pages of dishes, drinks and cocktails. Swipe on your phone or tap a page to enlarge it.</p></div><MenuPages/><p className="menu-meta" style={{ marginTop: 24 }}>Prices are subject to a 10% service charge.</p><Link className="menu-full-link" href="/menu">Open the full menu <span aria-hidden="true">↗</span></Link></div></section>
  <section className="section visit" id="visit"><div className="wrap visit-grid"><div><div className="eyebrow">Visit us</div><h2 className="section-heading serif">Find your way<br/>here.</h2><div className="visit-info"><div className="visit-block"><h3>Address</h3><p>{restaurant.address}</p></div><div className="visit-block"><h3>Hours</h3><p>Monday — Sunday<br/>10:30 AM — 10:00 PM</p></div><div className="visit-block"><h3>Phone</h3><p><a href={`tel:${restaurant.phone.replace(/[\s-]/g, "")}`}>{restaurant.phone}</a></p></div><div className="visit-block"><h3>Follow along</h3><p><a href={restaurant.socials.instagram} target="_blank" rel="noreferrer">Instagram</a><br/><a href={restaurant.socials.facebook} target="_blank" rel="noreferrer">Facebook</a></p></div></div><div className="amenities">{restaurant.amenities.map((item) => <span key={item}>{item}</span>)}</div></div><a className="visit-map" href={restaurant.mapUrl} target="_blank" rel="noreferrer"><span className="map-note">COME FIND US</span><strong className="map-city">PEPSICOLA</strong><span className="map-address">Old Sinamangal · Divyeswori Planning</span><span className="button">Get directions ↗</span></a></div></section></main><Footer/></>;
}
