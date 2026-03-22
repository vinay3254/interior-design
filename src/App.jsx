import { Buildings, CheckCircle, CircleNotch, Cube, HouseLine, Ruler, SquaresFour } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { startTransition, useEffect, useRef, useState } from "react";
import MagneticButton from "./components/MagneticButton";
import interiorVideo from "./D_Interior_Design_Render_Video.mp4";

const sectionEase = [0.16, 1, 0.3, 1];

const revealContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const revealItem = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: sectionEase,
    },
  },
};

const servicePanels = [
  {
    icon: HouseLine,
    eyebrow: "Apartment planning",
    title: "Layouts tuned for Indian apartments, foyers, utility zones, and family movement.",
    copy:
      "We plan 2BHK and 3BHK homes around shoe storage, dining flow, balcony access, and everyday family routines so every square foot works harder.",
    metric: "31 apartment layouts optimised across Bengaluru, Hyderabad, and Pune in the last two quarters.",
    image:
      "https://images.pexels.com/photos/6580223/pexels-photo-6580223.jpeg?cs=srgb&dl=pexels-artbovich-6580223.jpg&fm=jpg",
    alt: "Minimal living room with layered neutral seating and soft daylight.",
  },
  {
    icon: Ruler,
    eyebrow: "Modular detailing",
    title: "Kitchens, wardrobes, TV units, lofts, and pooja storage resolved to the millimeter.",
    copy:
      "Shutters, handles, drawers, open shelves, and appliance niches are coordinated as one modular package so site execution stays clean and predictable.",
    metric: "6 mm tolerance window maintained across modular factory and on-site installation packages.",
    image:
      "https://images.pexels.com/photos/15409439/pexels-photo-15409439.jpeg?cs=srgb&dl=pexels-curtis-adams-1694007-15409439.jpg&fm=jpg",
    alt: "Clean kitchen with timber flooring and dark cabinetry.",
  },
  {
    icon: Cube,
    eyebrow: "Material families",
    title: "Laminate, veneer, quartz, fluted glass, and hardware edited into one clean palette.",
    copy:
      "Every finish is tested in relation to wardrobes, kitchen shutters, vanity units, and wall treatments so the home feels consistent from entry to bedroom.",
    metric: "126 finish pairings tested before palette lock on larger full-home interior packages.",
    image:
      "https://images.pexels.com/photos/6908359/pexels-photo-6908359.jpeg?cs=srgb&dl=pexels-heyho-6908359.jpg&fm=jpg",
    alt: "Open-plan dining and kitchen interior with pale wood finishes.",
  },
];

const archiveCollections = {
  Residences: [
    {
      title: "Skyline 3BHK",
      location: "Bengaluru, Karnataka",
      details:
        "A 1,940 sq ft apartment with oak-finish wardrobes, a quartz kitchen, ribbed-glass crockery storage, and low-maintenance finishes for daily family use.",
      image:
        "https://images.pexels.com/photos/19889139/pexels-photo-19889139.jpeg?cs=srgb&dl=pexels-lisa-anna-901356985-19889139.jpg&fm=jpg",
      alt: "Minimal bright living room with white curtains and soft neutral furniture.",
    },
    {
      title: "Courtyard Villa",
      location: "Hyderabad, Telangana",
      details:
        "A duplex home shaped around warm beige surfaces, full-height wardrobes, pooja joinery, and layered lighting for shared family spaces.",
      image:
        "https://images.pexels.com/photos/28853337/pexels-photo-28853337.jpeg?cs=srgb&dl=pexels-s3t-koncepts-1636465088-28853337.jpg&fm=jpg",
      alt: "Quiet bedroom with layered wall lighting and built-in wardrobes.",
    },
  ],
  Retreats: [],
};

const processNotes = [
  {
    title: "Site measure and requirement call",
    timing: "Week 01",
    copy: "We measure the flat or villa, map electrical points, and understand family routines before the first layout is drawn.",
  },
  {
    title: "Layout and 3D views",
    timing: "Week 02-03",
    copy: "We test wardrobe walls, kitchen planning, TV units, and room circulation until the plan feels practical and visually clean.",
  },
  {
    title: "Material and costing lock",
    timing: "Week 04-05",
    copy: "Finishes, handles, shutters, countertops, and hardware are locked together so the design and budget stay aligned.",
  },
  {
    title: "Factory and installation cadence",
    timing: "Week 06 onward",
    copy: "Production, delivery, and site installation move in sequence so wardrobes, kitchens, vanities, and loose furniture land on time.",
  },
];

const journalSeed = [
  {
    title: "How we plan a 3BHK without wasting corners",
    summary:
      "A short note on foyer storage, utility access, and wardrobe depth so the home feels larger without looking overdesigned.",
  },
  {
    title: "Where a pooja niche should actually sit",
    summary:
      "The right pooja placement depends on entry sequence, privacy, and living-room balance more than decoration alone.",
  },
  {
    title: "The laminate mix that works in Indian daylight",
    summary:
      "Why warm oak, soft beige, and muted grey usually hold up better than overly glossy finishes in sun-heavy homes.",
  },
];

function App() {
  const [archiveView, setArchiveView] = useState("Residences");
  const [journalState, setJournalState] = useState({ status: "loading", items: [] });
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    projectType: "3BHK apartment",
    scope: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");
  const submitTimerRef = useRef(null);

  useEffect(() => {
    const journalTimer = window.setTimeout(() => {
      setJournalState({ status: "ready", items: journalSeed });
    }, 1200);

    return () => {
      window.clearTimeout(journalTimer);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const activeArchive = archiveCollections[archiveView];
  const LeadServiceIcon = servicePanels[0].icon;

  function handleArchiveChange(view) {
    startTransition(() => {
      setArchiveView(view);
    });
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));

    setFormErrors((current) => ({
      ...current,
      [name]: "",
    }));

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (formValues.name.trim().length < 2) {
      nextErrors.name = "Please share the lead contact name for the project.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = "Please enter a working email so we can send next steps.";
    }

    if (formValues.scope.trim().length < 48) {
      nextErrors.scope = "A short note on rooms, square footage, and timeline helps us assess fit.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setSubmitStatus("error");
      return;
    }

    setFormErrors({});
    setSubmitStatus("loading");

    submitTimerRef.current = window.setTimeout(() => {
      setSubmitStatus("success");
      setFormValues({
        name: "",
        email: "",
        projectType: "3BHK apartment",
        scope: "",
      });
    }, 1400);
  }

  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(227,223,217,0.42),transparent_26%),radial-gradient(circle_at_86%_12%,rgba(138,106,74,0.08),transparent_18%)]" />

      <header className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-6 md:px-8">
        <a className="font-display text-lg font-semibold tracking-[-0.04em] text-[color:var(--ink)]" href="#top">
          Nivasa Living
        </a>
        <nav className="hidden items-center gap-8 text-sm text-[color:var(--muted)] md:flex">
          <a className="transition-colors hover:text-[color:var(--ink)]" href="#projects">
            Projects
          </a>
          <a className="transition-colors hover:text-[color:var(--ink)]" href="#approach">
            Approach
          </a>
          <a className="transition-colors hover:text-[color:var(--ink)]" href="#journal">
            Journal
          </a>
          <a className="transition-colors hover:text-[color:var(--ink)]" href="#enquire">
            Enquire
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-[92dvh] w-full max-w-[1400px] gap-8 px-4 pb-10 pt-3 md:px-8 md:pb-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:pb-20">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-end gap-8"
            initial={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.95, ease: sectionEase }}
          >
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)] shadow-[0_16px_28px_-24px_rgba(23,22,20,0.28)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_6px_rgba(122,97,71,0.08)]" />
              Indian home interiors
            </div>

            <div className="space-y-4 md:space-y-6">
              <p className="text-sm uppercase tracking-[0.26em] text-[color:var(--muted)]">
                Modular furniture, wardrobes, kitchens, and full-home design
              </p>
              <h1 className="font-display max-w-[12ch] text-5xl leading-none tracking-[-0.07em] text-[color:var(--ink)] md:text-7xl">
                Modern Indian homes, framed with the polish of a premium brand.
              </h1>
              <p className="max-w-[62ch] text-base leading-relaxed text-[color:var(--muted)] md:text-lg">
                Nivasa Living brings together modular kitchens, wardrobes, TV units, loose furniture, and full-home
                interiors for Indian apartments and villas, presented through your 3D walkthrough as the hero product.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <MagneticButton
                className="border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--surface-strong)]"
                href="#enquire"
              >
                Book free design call
              </MagneticButton>
              <MagneticButton
                className="border-[color:var(--line)] bg-white text-[color:var(--ink)]"
                href="#projects"
              >
                View Indian homes
              </MagneticButton>
            </div>

            <div className="grid gap-3 border-t border-[color:var(--line)] pt-5 text-sm text-[color:var(--muted)] sm:grid-cols-3">
              <div>
                <p className="font-display text-3xl tracking-[-0.06em] text-[color:var(--ink)]">00:08</p>
                <p>An 8-second walkthrough that works cleanly as a premium home-interiors hero.</p>
              </div>
              <div>
                <p className="font-display text-3xl tracking-[-0.06em] text-[color:var(--ink)]">Pan-India</p>
                <p>Positioned for Indian apartments, villas, and family homes rather than a global studio portfolio.</p>
              </div>
              <div>
                <p className="font-display text-3xl tracking-[-0.06em] text-[color:var(--ink)]">Execution</p>
                <p>Built to sell design, modular production, and installation as one coordinated home package.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative"
            initial={{ opacity: 0, y: 42 }}
            transition={{ duration: 0.95, delay: 0.1, ease: sectionEase }}
          >
            <div className="ambient-card relative overflow-hidden p-4 sm:p-5">
              <div className="video-stage">
                <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/90 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)] shadow-[0_10px_20px_-18px_rgba(23,22,20,0.35)]">
                  3D home walkthrough
                </div>
                <video
                  aria-label="3D interior design render walkthrough"
                  autoPlay
                  className="relative aspect-[16/10] w-full bg-white object-contain"
                  loop
                  muted
                  playsInline
                  preload="auto"
                  src={interiorVideo}
                />
              </div>

              <div className="grid gap-4 border-t border-[color:var(--line)] pt-5 md:grid-cols-[1.1fr_0.9fr_0.7fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Primary use</p>
                  <p className="mt-2 font-display text-2xl tracking-[-0.05em] text-[color:var(--ink)]">
                    Brand hero for Indian homes
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Playback</p>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                    Muted autoplay, inline playback, and continuous looping for a showroom-clean first impression.
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Asset</p>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">MP4 / 8 seconds / local source</p>
                </div>
              </div>
            </div>

            <div className="glass-panel float-gentle absolute -left-2 top-10 hidden w-48 rounded-[1.5rem] p-5 lg:block xl:-left-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Presentation</p>
              <p className="mt-3 font-display text-2xl tracking-[-0.05em] text-[color:var(--ink)]">
                Clean white stage, Indian-home positioning.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)]">
                The hero frame now reads like a premium interiors brand instead of an abstract studio showcase.
              </p>
            </div>

            <div className="glass-panel float-gentle-delayed absolute -right-2 bottom-10 hidden w-56 rounded-[1.5rem] p-5 lg:block xl:-right-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Motion direction</p>
              <p className="mt-3 font-display text-2xl tracking-[-0.05em] text-[color:var(--ink)]">
                Slow pan. Warm finishes. Modular-home focus.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)]">
                The surrounding layout stays restrained so the reel reads like launch content for an Indian furniture and interiors brand.
              </p>
            </div>
          </motion.div>
        </section>

        <motion.section
          className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-12"
          id="approach"
          initial="hidden"
          variants={revealContainer}
          viewport={{ once: true, amount: 0.15 }}
          whileInView="show"
        >
          <motion.div className="mb-6 max-w-[760px] space-y-3 md:mb-8 md:space-y-4" variants={revealItem}>
            <p className="section-kicker">How we build calm</p>
            <h2 className="font-display text-4xl tracking-[-0.06em] text-[color:var(--ink)] md:text-6xl">
              Nivasa works like a full-home interiors partner, not just a furniture seller.
            </h2>
            <p className="max-w-[62ch] text-base leading-relaxed text-[color:var(--muted)]">
              Layouts, modular units, finishes, costing, and installation are resolved as one system. That keeps the
              home coherent and keeps late-stage site changes to a minimum.
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.06fr_0.94fr]">
            <motion.article className="ambient-card overflow-hidden p-4 md:p-5" variants={revealItem}>
              <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:gap-5">
                <figure className="aspect-[4/3] overflow-hidden rounded-[1.6rem] md:aspect-auto">
                  <img alt={servicePanels[0].alt} src={servicePanels[0].image} />
                </figure>
                <div className="flex flex-col justify-between gap-4 rounded-[1.6rem] bg-white/55 p-5 md:gap-6 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                      <LeadServiceIcon size={20} weight="regular" />
                      {servicePanels[0].eyebrow}
                    </div>
                    <h3 className="font-display text-3xl tracking-[-0.05em] text-[color:var(--ink)]">
                      {servicePanels[0].title}
                    </h3>
                    <p className="text-base leading-relaxed text-[color:var(--muted)]">{servicePanels[0].copy}</p>
                  </div>
                  <p className="border-t border-[color:var(--line)] pt-4 text-sm leading-relaxed text-[color:var(--muted)]">
                    {servicePanels[0].metric}
                  </p>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-4 md:gap-6">
              {servicePanels.slice(1).map((panel) => (
                <motion.article
                  className="ambient-card grid gap-4 overflow-hidden p-4 md:grid-cols-[0.75fr_1.25fr]"
                  key={panel.title}
                  variants={revealItem}
                >
                  <figure className="aspect-[4/3] overflow-hidden rounded-[1.4rem] md:aspect-auto">
                    <img alt={panel.alt} src={panel.image} />
                  </figure>
                  <div className="flex flex-col justify-between gap-4 rounded-[1.4rem] bg-white/45 p-4 md:gap-5 md:p-5">
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                        <panel.icon size={20} weight="regular" />
                        {panel.eyebrow}
                      </div>
                      <h3 className="font-display text-2xl tracking-[-0.05em] text-[color:var(--ink)]">
                        {panel.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[color:var(--muted)]">{panel.copy}</p>
                    </div>
                    <p className="border-t border-[color:var(--line)] pt-4 text-sm leading-relaxed text-[color:var(--muted)]">
                      {panel.metric}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-12"
          id="projects"
          initial="hidden"
          variants={revealContainer}
          viewport={{ once: true, amount: 0.15 }}
          whileInView="show"
        >
          <div className="grid gap-5 md:gap-8 lg:grid-cols-[0.84fr_1.16fr]">
            <motion.div className="space-y-5 md:space-y-6" variants={revealItem}>
              <p className="section-kicker">Selected homes</p>
              <h2 className="font-display text-4xl tracking-[-0.06em] text-[color:var(--ink)] md:text-6xl">
                Homes planned for everyday Indian living, not visual clutter.
              </h2>
              <p className="max-w-[58ch] text-base leading-relaxed text-[color:var(--muted)]">
                Current work spans compact city apartments, family 3BHKs, villas, and duplex homes. Each project is
                planned around practical storage, clean lines, and easy daily use.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {Object.keys(archiveCollections).map((view) => (
                  <button
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      archiveView === view
                        ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--surface-strong)]"
                        : "border-[color:var(--line)] bg-white/60 text-[color:var(--muted)] backdrop-blur-xl hover:text-[color:var(--ink)]"
                    }`}
                    key={view}
                    onClick={() => handleArchiveChange(view)}
                    type="button"
                  >
                    {view}
                  </button>
                ))}
              </div>

              <div className="ambient-card p-5 md:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-[color:var(--line)] pb-4 md:gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Delivery cadence</p>
                    <p className="mt-2 font-display text-2xl tracking-[-0.05em] text-[color:var(--ink)]">
                      Now taking fresh interior slots for August 2026.
                    </p>
                  </div>
                  <Buildings aria-hidden="true" className="text-[color:var(--accent)]" size={28} weight="regular" />
                </div>
                <div className="divide-y divide-[color:var(--line)] pt-2">
                  <div className="flex items-center justify-between py-4 text-sm text-[color:var(--muted)]">
                    <span>Design + 3D visual phase</span>
                    <span>3 to 5 weeks</span>
                  </div>
                  <div className="flex items-center justify-between py-4 text-sm text-[color:var(--muted)]">
                    <span>Factory production + site work</span>
                    <span>4 to 8 weeks</span>
                  </div>
                  <div className="flex items-center justify-between py-4 text-sm text-[color:var(--muted)]">
                    <span>Installation + handover</span>
                    <span>1 to 2 weeks</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="grid gap-4 md:gap-6" variants={revealItem}>
              {activeArchive.length > 0 ? (
                <>
                  {activeArchive.map((project) => (
                    <article className="ambient-card grid gap-4 overflow-hidden p-4 md:grid-cols-[0.95fr_1.05fr] md:gap-5" key={project.title}>
                      <figure className="aspect-[4/3] overflow-hidden rounded-[1.6rem] md:aspect-auto">
                        <img alt={project.alt} src={project.image} />
                      </figure>
                      <div className="flex flex-col justify-between gap-4 rounded-[1.6rem] bg-white/45 p-5 md:gap-6 md:p-6">
                        <div className="space-y-3 md:space-y-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">{project.location}</p>
                          <h3 className="font-display text-3xl tracking-[-0.05em] text-[color:var(--ink)]">
                            {project.title}
                          </h3>
                          <p className="text-base leading-relaxed text-[color:var(--muted)]">{project.details}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-4 text-sm text-[color:var(--muted)]">
                          <span>Delivered home</span>
                          <span>Design + modular execution</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </>
              ) : (
                <div className="glass-panel flex min-h-[300px] flex-col justify-center rounded-[2rem] p-6 md:p-10">
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Empty state</p>
                  <h3 className="mt-4 font-display text-4xl tracking-[-0.06em] text-[color:var(--ink)]">
                    Villa slots reopen in October 2026.
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-[color:var(--muted)]">
                    The current calendar is reserved for apartments and family homes. If your project is a larger
                    villa, we can place it on the next review cycle and share fit criteria.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-12"
          initial="hidden"
          variants={revealContainer}
          viewport={{ once: true, amount: 0.15 }}
          whileInView="show"
        >
          <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div className="space-y-5 md:space-y-6" variants={revealItem}>
              <p className="section-kicker">Studio method</p>
              <h2 className="font-display text-4xl tracking-[-0.06em] text-[color:var(--ink)] md:text-6xl">
                Materials are selected as one calm family, then detailed for Indian homes that get used every day.
              </h2>
              <p className="max-w-[58ch] text-base leading-relaxed text-[color:var(--muted)]">
                We do not reset the palette in every room. Wardrobes, kitchen shutters, wall tones, quartz, and
                hardware are tuned to work as one consistent home story.
              </p>

              <div className="ambient-card overflow-hidden p-0">
                <div className="material-marquee flex min-w-full gap-5 px-6 py-5 text-sm uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  {[
                    "oak laminate",
                    "matte beige",
                    "quartz top",
                    "fluted glass",
                    "warm grey",
                    "soft walnut",
                    "champagne handle",
                    "ivory wardrobe",
                    "oak laminate",
                    "matte beige",
                    "quartz top",
                    "fluted glass",
                    "warm grey",
                    "soft walnut",
                    "champagne handle",
                    "ivory wardrobe",
                  ].map((item, index) => (
                    <span className="flex items-center gap-5" key={`${item}-${index}`}>
                      <span>{item}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[rgba(122,97,71,0.7)]" />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="ambient-card p-5 md:p-8" variants={revealItem}>
              <div className="mb-5 flex items-center justify-between md:mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Project sequence</p>
                  <p className="mt-2 font-display text-3xl tracking-[-0.05em] text-[color:var(--ink)]">
                    A steady cadence from measure-up to handover.
                  </p>
                </div>
                <SquaresFour aria-hidden="true" className="text-[color:var(--accent)]" size={28} weight="regular" />
              </div>

              <div className="divide-y divide-[color:var(--line)]">
                {processNotes.map((note) => (
                  <div className="grid gap-3 py-4 md:grid-cols-[0.36fr_1fr] md:gap-4 md:py-5" key={note.title}>
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">{note.timing}</p>
                      <p className="mt-2 font-display text-2xl tracking-[-0.05em] text-[color:var(--ink)]">
                        {note.title}
                      </p>
                    </div>
                    <p className="max-w-[52ch] text-sm leading-relaxed text-[color:var(--muted)]">{note.copy}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-12"
          id="journal"
          initial="hidden"
          variants={revealContainer}
          viewport={{ once: true, amount: 0.15 }}
          whileInView="show"
        >
          <div className="grid gap-4 md:gap-6 lg:grid-cols-[0.74fr_1.26fr]">
            <motion.div className="glass-panel rounded-[2rem] p-6 md:p-10" variants={revealItem}>
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Client note</p>
              <p className="mt-6 font-display text-3xl leading-[1.05] tracking-[-0.05em] text-[color:var(--ink)] md:text-4xl">
                “The flat finally feels bigger. Storage is everywhere, but nothing looks bulky or overdone.”
              </p>
              <div className="mt-8 border-t border-white/15 pt-5 text-sm text-[color:var(--muted)]">
                <p className="font-medium text-[color:var(--ink)]">Aparna Menon</p>
                <p>Client, Skyline 3BHK</p>
              </div>
            </motion.div>

            <motion.div className="ambient-card p-5 md:p-8" variants={revealItem}>
              <div className="mb-5 flex items-end justify-between gap-4 md:mb-8 md:gap-6">
                <div>
                  <p className="section-kicker">Journal</p>
                  <h2 className="font-display text-4xl tracking-[-0.06em] text-[color:var(--ink)] md:text-5xl">
                    Short notes from Indian home projects.
                  </h2>
                </div>
                <p className="hidden max-w-[28ch] text-sm leading-relaxed text-[color:var(--muted)] md:block">
                  The feed loads as soon as the home-note index is ready, so the layout includes a matching skeleton state.
                </p>
              </div>

              {journalState.status === "loading" ? (
                <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                  <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white/45 p-5 md:p-6">
                    <div className="shimmer mb-4 h-4 w-24 rounded-full" />
                    <div className="shimmer mb-3 h-10 w-4/5 rounded-2xl" />
                    <div className="shimmer h-24 rounded-[1.2rem]" />
                  </div>
                  <div className="grid gap-4">
                    <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/45 p-5">
                      <div className="shimmer mb-3 h-4 w-20 rounded-full" />
                      <div className="shimmer mb-3 h-8 w-3/4 rounded-2xl" />
                      <div className="shimmer h-20 rounded-[1rem]" />
                    </div>
                    <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/45 p-5">
                      <div className="shimmer mb-3 h-4 w-20 rounded-full" />
                      <div className="shimmer mb-3 h-8 w-2/3 rounded-2xl" />
                      <div className="shimmer h-20 rounded-[1rem]" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                  <article className="rounded-[1.7rem] border border-[color:var(--line)] bg-white/52 p-6">
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Field note 01</p>
                    <h3 className="mt-4 font-display text-3xl tracking-[-0.05em] text-[color:var(--ink)]">
                      {journalState.items[0].title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[color:var(--muted)]">
                      {journalState.items[0].summary}
                    </p>
                  </article>

                  <div className="grid gap-4">
                    {journalState.items.slice(1).map((entry, index) => (
                      <article className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/48 p-4 md:p-5" key={entry.title}>
                        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                          Field note 0{index + 2}
                        </p>
                        <h3 className="mt-4 font-display text-2xl tracking-[-0.05em] text-[color:var(--ink)]">
                          {entry.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{entry.summary}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto w-full max-w-[1400px] px-4 py-6 pb-12 md:px-8 md:py-12 md:pb-16"
          id="enquire"
          initial="hidden"
          variants={revealContainer}
          viewport={{ once: true, amount: 0.15 }}
          whileInView="show"
        >
          <div className="grid gap-4 md:gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div className="space-y-5 md:space-y-6" variants={revealItem}>
              <p className="section-kicker">Enquire</p>
              <h2 className="font-display text-4xl tracking-[-0.06em] text-[color:var(--ink)] md:text-6xl">
                Tell us what kind of Indian home you are furnishing, renovating, or setting up.
              </h2>
              <p className="max-w-[58ch] text-base leading-relaxed text-[color:var(--muted)]">
                Share a short brief and we will reply with fit, city availability, and the next design call window.
              </p>
              <div className="ambient-card divide-y divide-[color:var(--line)] p-5 md:p-6">
                {[
                  "2BHK and 3BHK apartments",
                  "Villas, duplex homes, and builder floors",
                  "Kitchens, wardrobes, TV units, and full-home interiors",
                ].map((line) => (
                  <div className="flex items-center gap-3 py-4 text-sm text-[color:var(--muted)]" key={line}>
                    <CheckCircle aria-hidden="true" className="text-[color:var(--accent)]" size={18} weight="fill" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form className="ambient-card p-5 md:p-8" onSubmit={handleSubmit} variants={revealItem}>
              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[color:var(--ink)]">Lead contact</span>
                  <input
                    className="rounded-[1.15rem] border border-[color:var(--line)] bg-white/72 px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition-all duration-300 placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white"
                    name="name"
                    onChange={handleFieldChange}
                    placeholder="Priya Sharma"
                    type="text"
                    value={formValues.name}
                  />
                  <span className="text-xs text-[color:var(--muted)]">Who should receive our first review reply?</span>
                  {formErrors.name ? <span className="text-xs text-[#7d3f34]">{formErrors.name}</span> : null}
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[color:var(--ink)]">Email</span>
                  <input
                    className="rounded-[1.15rem] border border-[color:var(--line)] bg-white/72 px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition-all duration-300 placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white"
                    name="email"
                    onChange={handleFieldChange}
                    placeholder="priya.sharma@gmail.com"
                    type="email"
                    value={formValues.email}
                  />
                  <span className="text-xs text-[color:var(--muted)]">We usually respond within two working days.</span>
                  {formErrors.email ? <span className="text-xs text-[#7d3f34]">{formErrors.email}</span> : null}
                </label>
              </div>

              <div className="mt-4 grid gap-4 md:mt-5 md:gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[color:var(--ink)]">Project type</span>
                  <select
                    className="rounded-[1.15rem] border border-[color:var(--line)] bg-white/72 px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition-all duration-300 focus:border-[color:var(--accent)] focus:bg-white"
                    name="projectType"
                    onChange={handleFieldChange}
                    value={formValues.projectType}
                  >
                    <option>3BHK apartment</option>
                    <option>2BHK apartment</option>
                    <option>Villa or duplex</option>
                    <option>Office or showroom</option>
                  </select>
                  <span className="text-xs text-[color:var(--muted)]">This helps us route the brief to the right studio lead.</span>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[color:var(--ink)]">Scope note</span>
                  <textarea
                    className="min-h-40 rounded-[1.25rem] border border-[color:var(--line)] bg-white/72 px-4 py-3 text-sm leading-relaxed text-[color:var(--ink)] outline-none transition-all duration-300 placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:bg-white"
                    name="scope"
                    onChange={handleFieldChange}
                    placeholder="3BHK in Whitefield, Bengaluru, 1,780 sq ft, looking for modular kitchen, wardrobes, TV unit, pooja space, and full installation before Diwali."
                    value={formValues.scope}
                  />
                  <span className="text-xs text-[color:var(--muted)]">Include city, rooms, square footage, and your ideal handover window.</span>
                  {formErrors.scope ? <span className="text-xs text-[#7d3f34]">{formErrors.scope}</span> : null}
                </label>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <MagneticButton
                  className="border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--surface-strong)]"
                  disabled={submitStatus === "loading"}
                  icon={submitStatus !== "loading"}
                  type="submit"
                >
                  {submitStatus === "loading" ? (
                    <span className="flex items-center gap-3">
                      <CircleNotch className="animate-spin" size={18} weight="bold" />
                      Sending brief
                    </span>
                  ) : submitStatus === "success" ? (
                    "Brief received"
                  ) : (
                    "Send project brief"
                  )}
                </MagneticButton>

                <div className="text-sm text-[color:var(--muted)]">
                  {submitStatus === "success"
                    ? "We have your note. Expect fit, availability, and next steps within two working days."
                    : submitStatus === "error"
                      ? "Please resolve the highlighted fields so we can assess the brief."
                      : "We review each brief before opening a first call."}
                </div>
              </div>
            </motion.form>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-[color:var(--line)]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-8 text-sm text-[color:var(--muted)] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Nivasa Living. Modular interiors and furniture for modern Indian homes.</p>
          <div className="flex flex-wrap gap-4">
            <a className="transition-colors hover:text-[color:var(--ink)]" href="mailto:hello@nivasaliving.in">
              hello@nivasaliving.in
            </a>
            <span>Bengaluru</span>
            <span>Hyderabad</span>
            <span>Chennai</span>
            <span>Pune</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
