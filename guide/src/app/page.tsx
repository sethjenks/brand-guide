import { AppShell } from "@/components/AppShell";
import { loadBrand, type ColorSwatch } from "@/lib/load-brand";

function SwatchGrid({ colors }: { colors: readonly ColorSwatch[] }) {
  return (
    <div className="swatches">
      {colors.map((color) => (
        <div className="swatch" key={color.token}>
          <div
            className="swatch-chip"
            style={{ background: color.value }}
            aria-hidden="true"
          />
          <div className="swatch-meta">
            <strong>{color.name}</strong>
            <code>{color.value}</code>
            <p className="muted">{color.usage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const brand = loadBrand();

  return (
    <AppShell brandName={brand.name} year={brand.year} groups={brand.nav}>
      <div className="guide">
        <header
          className={`hero${brand.setup.status === "starter" ? " hero-setup" : ""}`}
          id="top"
        >
          {brand.setup.status === "starter" ? (
            <>
              <p className="hero-meta">Brand Guide · Setup</p>
              <h1 className="hero-name hero-name-setup">
                {brand.setup.headline}
              </h1>
              <p className="hero-support">{brand.setup.body}</p>

              <ul className="setup-sources" aria-label="Accepted sources">
                {brand.setup.sources.map((source) => (
                  <li key={source.label}>
                    <strong>{source.label}</strong>
                    <span className="muted">{source.detail}</span>
                  </li>
                ))}
              </ul>

              <div className="setup-prompt">
                <span className="stack-label">Prompt for your agent</span>
                <pre className="setup-prompt-text">{brand.setup.prompt}</pre>
              </div>

              <p className="setup-footnote muted">
                Starter preview below uses Sample Brand until you populate.
                When finished, set <code>status</code> to{" "}
                <code>populated</code> in <code>brand/setup.json</code>.
              </p>
            </>
          ) : (
            <>
              <p className="hero-meta">Brand Guide · {brand.year}</p>
              <h1 className="hero-name">{brand.name}</h1>
              <p className="hero-tagline">{brand.tagline}</p>
              <p className="hero-support">{brand.support}</p>
              <div className="hero-bar" aria-hidden="true" />
              <p className="setup-tertiary muted">
                Need to refresh from a source? See{" "}
                <code>intake/populate-from-source.md</code>.
              </p>
            </>
          )}
        </header>

        {/* —— What to say —— */}
        <section
          className="act"
          id="what-to-say"
          aria-labelledby="what-to-say-title"
        >
          <p className="act-label">{brand.strategy.actLabel}</p>
          <h2 className="act-title" id="what-to-say-title">
            Brand Strategy
          </h2>

          <div className="block" id="vision">
            <h3>Vision</h3>
            <div className="subsection" id="vision-overview">
              <h4>Overview</h4>
              <p>{brand.strategy.overview.what}</p>
            </div>
            <div className="subsection" id="vision-frame">
              <h4>Problem frame</h4>
              <div className="vision-grid">
                <div className="vision-cell">
                  <span className="stack-label">Problem</span>
                  <p>{brand.strategy.overview.problem}</p>
                </div>
                <div className="vision-cell">
                  <span className="stack-label">Current</span>
                  <p>{brand.strategy.overview.current}</p>
                </div>
                <div className="vision-cell">
                  <span className="stack-label">Opportunity</span>
                  <p>{brand.strategy.overview.opportunity}</p>
                </div>
                <div className="vision-cell">
                  <span className="stack-label">Solution</span>
                  <p>{brand.strategy.overview.solution}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="block" id="core-message" style={{ maxWidth: "none" }}>
            <h3>Core message</h3>
            <div className="vision-grid">
              <div className="vision-cell" id="core-mission">
                <span className="stack-label">Mission</span>
                <p>{brand.strategy.promise.mission}</p>
              </div>
              <div className="vision-cell" id="core-purpose">
                <span className="stack-label">Purpose</span>
                <p>{brand.strategy.promise.purpose}</p>
              </div>
              <div className="vision-cell" id="core-position">
                <span className="stack-label">Position</span>
                <p>{brand.strategy.promise.position}</p>
              </div>
              <div className="vision-cell" id="core-promise">
                <span className="stack-label">Promise</span>
                <p>{brand.strategy.promise.promise}</p>
              </div>
            </div>
          </div>

          <div className="block" id="pillars" style={{ maxWidth: "none" }}>
            <h3>Message pillars</h3>
            <div className="pillar-grid">
              {brand.strategy.pillars.map((pillar) => (
                <article className="pillar" key={pillar.name}>
                  <h4>{pillar.name}</h4>
                  <p>{pillar.summary}</p>
                  <dl>
                    <div>
                      <dt>Emotional</dt>
                      <dd>{pillar.emotional}</dd>
                    </div>
                    <div>
                      <dt>Functional</dt>
                      <dd>{pillar.functional}</dd>
                    </div>
                    <div>
                      <dt>Trust</dt>
                      <dd>“{pillar.trust}”</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>

          <div className="block panel" id="archetype">
            <h3>Archetype</h3>
            <p>
              <strong>{brand.strategy.archetype.name}</strong>
            </p>
            <p className="muted" style={{ marginTop: "0.75rem" }}>
              {brand.strategy.archetype.drive}
            </p>
            <p style={{ marginTop: "1rem" }}>
              Motto: {brand.strategy.archetype.motto}
            </p>
            <ul className="chip-row" aria-label="At best">
              {brand.strategy.archetype.atBest.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="block panel" id="personality">
            <h3>Personality</h3>
            <ul className="chip-row" aria-label="Traits">
              {brand.strategy.personality.traits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p style={{ marginTop: "1.25rem" }}>
              <span className="stack-label">We are</span>
              {brand.strategy.personality.weAre.join(" · ")}
            </p>
            <p style={{ marginTop: "1rem" }}>
              <span className="stack-label">We are not</span>
              {brand.strategy.personality.weAreNot.join(" · ")}
            </p>
          </div>

          <div className="block" id="guardrails">
            <h3>Guardrails</h3>
            <p>{brand.strategy.guardrails.tone}</p>
            <ul className="chip-row" aria-label="Cannot be">
              {brand.strategy.guardrails.cannotBe.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="litmus">{brand.strategy.guardrails.litmus}</p>
          </div>
        </section>

        <section className="act" id="voice" aria-labelledby="voice-title">
          <p className="act-label">{brand.voice.actLabel}</p>
          <h2 className="act-title" id="voice-title">
            Voice & Tone
          </h2>

          <div className="block subsection" id="voice-identity">
            <h3>Identity</h3>
            <p>{brand.voice.identity}</p>
            <p style={{ marginTop: "1rem", fontWeight: 500 }}>
              {brand.voice.essence}
            </p>
          </div>

          <div
            className="block subsection"
            id="voice-phrases"
            style={{ maxWidth: "none" }}
          >
            <h3>Phrases</h3>
            <ul className="phrase-list">
              {brand.voice.phrases.map((phrase) => (
                <li key={phrase}>{phrase}</li>
              ))}
            </ul>
          </div>

          <div
            className="block subsection"
            id="voice-rules"
            style={{ maxWidth: "none" }}
          >
            <h3>Tonal rules</h3>
            <div className="subsection">
              <h4>And / yet</h4>
              <ul className="andyet">
                {brand.voice.andYet.map((row) => (
                  <li key={row.lean}>
                    <span>{row.lean}</span>
                    <span className="yet">and yet</span>
                    <span>{row.yet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="subsection">
              <h4>We say / we never say</h4>
              <table className="say-table">
                <thead>
                  <tr>
                    <th scope="col">We say</th>
                    <th scope="col">We never say</th>
                  </tr>
                </thead>
                <tbody>
                  {brand.voice.weSay.map((row) => (
                    <tr key={row.say}>
                      <td>{row.say}</td>
                      <td className="never">{row.never}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="block subsection" id="voice-context">
            <h3>By context</h3>
            {brand.voice.contexts.map((ctx) => (
              <p key={ctx.context} style={{ marginBottom: "1rem" }}>
                <span className="stack-label">{ctx.context}</span>
                <span className="muted">{ctx.guidance}</span>
                <br />
                <em>“{ctx.example}”</em>
              </p>
            ))}
          </div>
        </section>

        {/* —— How to say it —— */}
        <section
          className="act"
          id="how-to-say-it"
          aria-labelledby="how-to-say-it-title"
        >
          <p className="act-label">{brand.visual.actLabel}</p>
          <h2 className="act-title" id="how-to-say-it-title">
            Visual Identity
          </h2>

          <div className="block" id="colors" style={{ maxWidth: "none" }}>
            <h3>Colors</h3>
            <p className="muted">{brand.visual.colors.intro}</p>

            <div className="subsection" id="colors-brand">
              <h4>Brand colors</h4>
              <p className="muted">
                Signature ink — the primary brand signal for type, wordmark, and
                key actions.
              </p>
              <SwatchGrid colors={brand.visual.colors.brand} />
            </div>

            <div className="subsection" id="colors-secondary">
              <h4>Secondary colors</h4>
              <p className="muted">
                Supporting tones for hierarchy without introducing a second brand
                hue.
              </p>
              <SwatchGrid colors={brand.visual.colors.secondary} />
            </div>

            <div className="subsection" id="colors-interface">
              <h4>Interface colors</h4>
              <p className="muted">
                Structural surfaces and edges for UI — not decorative accents.
              </p>
              <SwatchGrid colors={brand.visual.colors.interface} />
            </div>
          </div>

          <div className="block" id="typography" style={{ maxWidth: "none" }}>
            <h3>Typography</h3>

            <div className="subsection" id="type-faces">
              <h4>Typefaces</h4>
              <p className="muted">{brand.visual.typography.note}</p>
              <p style={{ marginTop: "0.75rem" }}>
                <span className="stack-label">Primary</span>
                {brand.visual.typography.faces.primary}
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <span className="stack-label">Fallback</span>
                {brand.visual.typography.faces.fallback}
              </p>
            </div>

            <div className="subsection" id="type-scale">
              <h4>Scale</h4>
              {brand.visual.typography.specimens.map((spec) => (
                <div className="type-specimen" key={spec.label}>
                  <p className="label">{spec.label}</p>
                  <p
                    className={
                      spec.size === "display"
                        ? "type-display"
                        : spec.size === "xl"
                          ? "type-xl"
                          : spec.size === "lg"
                            ? "type-lg"
                            : "type-base"
                    }
                  >
                    {spec.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="block" id="wordmark" style={{ maxWidth: "none" }}>
            <h3>Wordmark</h3>
            <div className="panel subsection" id="wordmark-usage">
              <h4>Usage</h4>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  marginBottom: "1rem",
                }}
              >
                {brand.name}
              </p>
              <p>{brand.visual.logo.description}</p>
            </div>
            <div className="panel subsection" id="wordmark-donts">
              <h4>Don’ts</h4>
              <ul className="chip-row">
                {brand.visual.logo.donts.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="block" id="imagery" style={{ maxWidth: "none" }}>
            <h3>Imagery</h3>
            <div className="panel subsection" id="imagery-direction">
              <h4>Direction</h4>
              <p>
                <span className="stack-label">Tone</span>
                {brand.visual.imagery.tone}
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <span className="stack-label">Subjects</span>
                {brand.visual.imagery.subjects}
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <span className="stack-label">Settings</span>
                {brand.visual.imagery.settings}
              </p>
            </div>
            <div className="panel subsection" id="imagery-avoid">
              <h4>Avoid</h4>
              <p>{brand.visual.imagery.avoid}</p>
            </div>
          </div>
        </section>

        {/* —— Where to say it —— */}
        <section
          className="act"
          id="where-to-say-it"
          aria-labelledby="where-to-say-it-title"
        >
          <p className="act-label">{brand.expressions.actLabel}</p>
          <h2 className="act-title" id="where-to-say-it-title">
            Brand Expressions
          </h2>
          <div className="expression-grid">
            {brand.expressions.items.map((item) => (
              <article
                className="expression"
                key={item.channel}
                id={`expression-${item.channel.toLowerCase()}`}
              >
                <p className="expression-channel">{item.channel}</p>
                <h4>{item.title}</h4>
                <p className="muted">{item.copy}</p>
                <p className="expression-sample">{item.sample}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="footer">
          <p>
            {brand.name} · Customize <code>brand.md</code> and{" "}
            <code>DESIGN.md</code>
          </p>
          <p>Grayscale starter · Agents: prefer brand.json (compiled)</p>
        </footer>
      </div>
    </AppShell>
  );
}
