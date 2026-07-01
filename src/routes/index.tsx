import { createFileRoute } from "@tanstack/react-router";
import { Mermaid } from "@/components/Mermaid";
import robot1 from "@/assets/robot1.png.asset.json";
import robot2 from "@/assets/robot2.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uncoverly · Proyecto Formativo" },
      { name: "description", content: "Documentación técnica del proyecto Uncoverly: plataforma educativa personalizada con Firebase y Gemini API." },
      { property: "og:title", content: "Uncoverly · Proyecto Formativo" },
      { property: "og:description", content: "Introducción, arquitectura, diagramas y stack del proyecto formativo Uncoverly." },
    ],
  }),
  component: Index,
});

const nav = [
  ["intro", "Introducción"],
  ["objetivos", "Objetivos"],
  ["mer", "MER"],
  ["logico", "Lógico"],
  ["arquitectura", "Arquitectura"],
  ["patron", "Patrón"],
  ["stack", "Stack"],
  ["scrum", "Scrum"],
] as const;

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <h2 className="mb-10 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function DiagramCard({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-10">
      {children}
      {caption && <figcaption className="mt-6 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

// ---------- Diagrams ----------
const merDiagram = `erDiagram
  USUARIO ||--o{ INSCRIPCION : "tiene"
  USUARIO {
    string id PK
    string nombre
    string email
    string rol
  }
  CURSO ||--o{ INSCRIPCION : "recibe"
  CURSO ||--o{ EVALUACION : "contiene"
  CURSO ||--o{ RECURSO : "incluye"
  CURSO {
    string id PK
    string titulo
    string nivel
    string docente_id FK
  }
  INSCRIPCION {
    string id PK
    string usuario_id FK
    string curso_id FK
    date fecha
  }
  EVALUACION ||--o{ RESULTADO : "genera"
  EVALUACION {
    string id PK
    string curso_id FK
    string tipo
  }
  RESULTADO {
    string id PK
    string usuario_id FK
    string evaluacion_id FK
    float puntaje
    string feedback_ia
  }
  RECURSO {
    string id PK
    string curso_id FK
    string url
    string tipo
  }
  PAGO {
    string id PK
    string usuario_id FK
    float monto
    date fecha
  }
  USUARIO ||--o{ PAGO : "realiza"
  USUARIO ||--o{ RESULTADO : "obtiene"
`;

const logicoDiagram = `classDiagram
  class usuarios {
    +id : string PK
    nombre : string
    email : string
    rol_id : FK
  }
  class roles {
    +id : string PK
    nombre : string
  }
  class cursos {
    +id : string PK
    titulo : string
    docente_id : FK
    nivel : string
  }
  class inscripciones {
    +id : string PK
    usuario_id : FK
    curso_id : FK
    fecha : timestamp
  }
  class evaluaciones {
    +id : string PK
    curso_id : FK
    tipo : string
  }
  class resultados {
    +id : string PK
    usuario_id : FK
    evaluacion_id : FK
    puntaje : number
    feedback_ia : string
  }
  class recursos {
    +id : string PK
    curso_id : FK
    tipo : string
    url : string
  }
  class pagos {
    +id : string PK
    usuario_id : FK
    monto : number
    fecha : timestamp
  }
  usuarios --> roles
  usuarios --> inscripciones
  cursos --> inscripciones
  cursos --> evaluaciones
  cursos --> recursos
  evaluaciones --> resultados
  usuarios --> resultados
  usuarios --> pagos
`;

const arqDiagram = `flowchart LR
  U["Usuarios<br/>Estudiante · Docente · Admin"]
  subgraph Client["Frontend · React + Tailwind"]
    UI["Interfaz Modular"]
    Router["Router / Guards"]
  end
  subgraph Cloud["Firebase (Serverless)"]
    Auth["Firebase Auth"]
    Fn["Cloud Functions"]
    DB["Firestore (NoSQL)"]
    Storage["Storage"]
    Host["Hosting + CDN"]
  end
  IA["Gemini API<br/>Retroalimentación IA"]
  U --> UI --> Router
  Router --> Auth
  Router --> Fn
  Fn --> DB
  Fn --> Storage
  Fn --> IA
  Host --> UI
`;

const patternDiagram = `flowchart TB
  V["View · Componente React"]
  VM["ViewModel / Hook<br/>useCourse, useAuth"]
  M["Model · Firestore SDK"]
  V -- "eventos UI" --> VM
  VM -- "estado reactivo" --> V
  VM -- "queries / mutations" --> M
  M -- "snapshots en tiempo real" --> VM
`;

const scrumDiagram = `flowchart LR
  BL["Product Backlog"] --> SP["Sprint Planning"]
  SP --> SPR["Sprint · 2 semanas"]
  SPR --> DAILY["Daily Stand-up"]
  DAILY --> SPR
  SPR --> REV["Sprint Review"]
  REV --> RETRO["Retrospectiva"]
  RETRO --> BL
`;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2">
            <img src={robot1.url} alt="Uncoverly" className="h-8 w-8" />
            <span className="font-semibold tracking-tight">Uncoverly</span>
          </a>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="transition-colors hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
          <div>
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              Proyecto formativo · SENA · Ficha 3227025
            </span>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
              Uncoverly
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
              Plataforma educativa personalizada para una academia de idiomas — construida con Firebase, React y Gemini API.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#mer" className="rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]" style={{ background: "var(--gradient-primary)" }}>
                Ver diagramas
              </a>
              <a href="#intro" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                Introducción
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl" />
            <img src={robot1.url} alt="Mascota Uncoverly" className="w-64 drop-shadow-2xl md:w-80" />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <Section id="intro" eyebrow="01 · Contexto" title="Introducción">
        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Uncoverly es una plataforma digital privada, escalable y personalizada para la academia de idiomas del mismo nombre. Se diferencia de los LMS tradicionales al integrar inteligencia artificial, dashboards de progreso y un banco de recursos para docentes.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            El desarrollo sigue el <span className="text-foreground font-medium">ciclo de vida del software</span> con un enfoque ágil-iterativo, transformando los requerimientos del cliente en un sistema robusto y funcional.
          </p>
        </div>
      </Section>

      {/* OBJETIVOS */}
      <Section id="objetivos" eyebrow="02 · Propósito" title="Objetivos">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:col-span-3">
            <div className="text-xs font-medium uppercase tracking-wider text-primary">General</div>
            <p className="mt-2 text-lg text-foreground">
              Desarrollar una plataforma personalizada para Uncoverly que integre Firebase y Gemini API, ofreciendo a estudiantes, docentes y administradores un entorno seguro, escalable e interactivo.
            </p>
          </div>
          {[
            ["Analizar", "necesidades del cliente y usuarios via entrevistas, encuestas y observación."],
            ["Diseñar", "arquitectura del sistema con UML, esquemas de BD y mockups."],
            ["Implementar", "los módulos usando Firebase (auth, DB, hosting) y Gemini API."],
            ["Probar", "usabilidad, unitarias e integración para asegurar estabilidad."],
            ["Desplegar", "en producción con disponibilidad y rendimiento óptimo."],
            ["Evaluar", "escalabilidad y sostenibilidad para futuros contextos."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="text-sm font-semibold text-primary">{t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MER */}
      <Section id="mer" eyebrow="03 · Datos" title="Diagrama MER">
        <DiagramCard caption="Modelo Entidad-Relación · Entidades principales del dominio Uncoverly">
          <Mermaid chart={merDiagram} />
        </DiagramCard>
      </Section>

      {/* LOGICO */}
      <Section id="logico" eyebrow="04 · Datos" title="Diagrama Lógico">
        <DiagramCard caption="Modelo lógico traducido a colecciones Firestore con claves foráneas y relaciones">
          <Mermaid chart={logicoDiagram} />
        </DiagramCard>
      </Section>

      {/* ARQUITECTURA */}
      <Section id="arquitectura" eyebrow="05 · Sistema" title="Arquitectura">
        <DiagramCard caption="Arquitectura cliente-servidor serverless · Frontend React + Backend Firebase + IA Gemini">
          <Mermaid chart={arqDiagram} />
        </DiagramCard>
      </Section>

      {/* PATRÓN */}
      <Section id="patron" eyebrow="06 · Diseño" title="Patrón de diseño">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <div className="inline-flex rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              MVVM · Model-View-ViewModel
            </div>
            <p className="text-muted-foreground">
              El frontend React con hooks personalizados actúa como <span className="text-foreground">ViewModel</span>, desacoplando la vista de la lógica de datos y aprovechando la reactividad de Firestore.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>· Componentes puros de presentación (View)</li>
              <li>· Hooks reactivos que orquestan estado (ViewModel)</li>
              <li>· SDK de Firestore como fuente de datos (Model)</li>
            </ul>
          </div>
          <DiagramCard>
            <Mermaid chart={patternDiagram} />
          </DiagramCard>
        </div>
      </Section>

      {/* STACK */}
      <Section id="stack" eyebrow="07 · Tecnología" title="Stack, lenguaje y herramientas">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { tag: "Lenguaje", title: "JavaScript / TypeScript", desc: "Ecosistema unificado front & back, tipado estático opcional, gran comunidad y soporte nativo en Firebase Functions." },
            { tag: "Frontend", title: "React + TailwindCSS", desc: "Componentes modulares, renderizado declarativo y sistema de utilidades para UI consistente." },
            { tag: "Backend", title: "Firebase Functions", desc: "Serverless: escala automáticamente, sin gestión de infraestructura." },
            { tag: "Base de datos", title: "Firestore (NoSQL)", desc: "Documentos y colecciones con sincronización en tiempo real y reglas de seguridad por rol." },
            { tag: "Auth & Hosting", title: "Firebase Auth · Hosting · Storage", desc: "Autenticación segura, CDN global y almacenamiento para material didáctico." },
            { tag: "IA", title: "Gemini API", desc: "Retroalimentación personalizada y evaluaciones adaptativas." },
          ].map((c) => (
            <div key={c.title} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
              <div className="text-xs font-medium uppercase tracking-wider text-primary">{c.tag}</div>
              <div className="mt-2 text-lg font-semibold text-foreground">{c.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <h3 className="text-lg font-semibold text-foreground">Justificación del lenguaje</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              JavaScript/TypeScript permite unificar frontend y backend en un solo ecosistema, reduce curva de aprendizaje del equipo y se integra nativamente con Firebase. TypeScript aporta seguridad de tipos en un dominio con múltiples entidades relacionadas (usuarios, cursos, evaluaciones).
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <h3 className="text-lg font-semibold text-foreground">Justificación del stack</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Firebase entrega auth, base de datos, storage y hosting como servicios administrados. Esto acelera el time-to-market, elimina overhead de DevOps y garantiza escalabilidad automática — clave para una plataforma educativa con picos de demanda.
            </p>
          </div>
        </div>
      </Section>

      {/* SCRUM */}
      <Section id="scrum" eyebrow="08 · Proceso" title="Metodología Scrum">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <DiagramCard caption="Ciclo iterativo Scrum aplicado al desarrollo de Uncoverly">
            <Mermaid chart={scrumDiagram} />
          </DiagramCard>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Roles</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><span className="text-foreground font-medium">Product Owner</span> — Co-propietario de la academia</li>
                <li><span className="text-foreground font-medium">Scrum Master</span> — Instructora María del Pilar Bonilla</li>
                <li><span className="text-foreground font-medium">Development Team</span> — Aprendiz Josué Tovar</li>
                <li><span className="text-foreground font-medium">Stakeholders</span> — Docentes y estudiantes de Uncoverly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Insumos</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>· Entrevistas al cliente y stakeholders</li>
                <li>· Encuestas a potenciales estudiantes</li>
                <li>· Observación y benchmarking (Duolingo, Busuu, Moodle)</li>
                <li>· Requerimientos funcionales (RF01–RF20) y no funcionales (RNF01–RNF10)</li>
                <li>· Diagramas UML validados con el cliente</li>
                <li>· Mockups navegables en Figma</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {[
            ["Sprint 1", "Autenticación y roles"],
            ["Sprint 2", "Dashboard y repositorio"],
            ["Sprint 3", "Integración Gemini"],
            ["Sprint 4", "Banco de recursos"],
            ["Sprint 5", "Despliegue y QA"],
          ].map(([s, d]) => (
            <div key={s} className="rounded-xl border border-border bg-card p-4 text-center shadow-[var(--shadow-card)]">
              <div className="text-xs font-semibold text-primary">{s}</div>
              <div className="mt-1 text-sm text-foreground">{d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <img src={robot2.url} alt="" className="h-10 w-10" />
            <div>
              <div className="text-sm font-semibold text-foreground">Uncoverly · Proyecto Formativo</div>
              <div className="text-xs text-muted-foreground">SENA · ADSO · Ficha 3227025 · Josué Tovar</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Instructora: María del Pilar Bonilla · Octubre 2025</div>
        </div>
      </footer>
    </div>
  );
}
