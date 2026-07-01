import { createFileRoute } from "@tanstack/react-router";
import { Mermaid } from "@/components/Mermaid";
import robot1 from "@/assets/robot1.svg";
import robot2 from "@/assets/robot2.svg";
import type { ReactNode } from "react";

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

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
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

function DiagramCard({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <figure className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-10">
      {children}
      {caption && <figcaption className="mt-6 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

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

const stackDiagram = `flowchart TB
  A["React"] --> B["TypeScript"]
  B --> C["Tailwind CSS"]
  C --> D["Firebase"]
  D --> E["Gemini API"]
`;

export function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2">
            <img src={robot1} alt="Uncoverly" className="h-8 w-8" />
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
              Plataforma educativa personalizada para una academia de idiomas, con arquitectura escalable y retroalimentación asistida por IA.
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
            <img src={robot1} alt="Mascota Uncoverly" className="w-64 drop-shadow-2xl md:w-80" />
          </div>
        </div>
      </section>

      <Section id="intro" eyebrow="01 · Contexto" title="Introducción">
        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Uncoverly es una plataforma digital privada, escalable y personalizada para una academia de idiomas. El objetivo es mejorar la experiencia de aprendizaje con rutas guiadas, seguimiento del progreso y asistencia inteligente.
          </p>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-xl font-semibold text-foreground">Problema que resuelve</h3>
            <p className="mt-3 text-muted-foreground">
              La academia necesita una experiencia más personalizada, con orientación automática para cada estudiante y menos carga operativa para el equipo docente.
            </p>
          </div>
        </div>
      </Section>

      <Section id="objetivos" eyebrow="02 · Alcance" title="Objetivos">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Personalización", "Ofrecer experiencias de aprendizaje a medida según el nivel y las metas del estudiante."],
            ["Automatización", "Reducir la carga operativa con flujos inteligentes y seguimiento continuo."],
            ["Escalabilidad", "Construir una base técnica preparada para crecer con más cursos, usuarios y servicios de IA."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="mer" eyebrow="03 · Modelado" title="MER">
        <DiagramCard caption="Modelo entidad-relación principal del dominio de cursos, usuarios, inscripciones y evaluaciones.">
          <Mermaid chart={merDiagram} />
        </DiagramCard>
      </Section>

      <Section id="logico" eyebrow="04 · Diseño" title="Lógico">
        <DiagramCard caption="Vista lógica orientada a clases y relaciones esenciales del sistema.">
          <Mermaid chart={logicoDiagram} />
        </DiagramCard>
      </Section>

      <Section id="arquitectura" eyebrow="05 · Infraestructura" title="Arquitectura">
        <DiagramCard caption="Arquitectura propuesta con frontend, backend serverless, almacenamiento y servicios de IA.">
          <Mermaid chart={arqDiagram} />
        </DiagramCard>
      </Section>

      <Section id="patron" eyebrow="06 · Patrones" title="Patrón">
        <DiagramCard caption="Aplicación del patrón View-ViewModel-Model para separar interfaz, lógica y datos.">
          <Mermaid chart={patternDiagram} />
        </DiagramCard>
      </Section>

      <Section id="stack" eyebrow="07 · Tecnologías" title="Stack">
        <div className="grid gap-6 md:grid-cols-2">
          <DiagramCard caption="Stack principal del proyecto: React, Tailwind, Firebase y Gemini API.">
            <Mermaid chart={stackDiagram} />
          </DiagramCard>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-xl font-semibold text-foreground">Stack elegido</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>• React + TypeScript para la interfaz.</li>
              <li>• Tailwind CSS para diseño rápido y consistente.</li>
              <li>• Firebase para autenticación, base de datos y hosting.</li>
              <li>• Gemini API para retroalimentación y apoyo pedagógico.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="scrum" eyebrow="08 · Gestión" title="Scrum">
        <DiagramCard caption="Ciclo de trabajo ágil propuesto para el proyecto.">
          <Mermaid chart={scrumDiagram} />
        </DiagramCard>
      </Section>

      <footer className="border-t border-border/60 bg-background/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Uncoverly · Documento técnico de arquitectura y diseño.</p>
          <img src={robot2} alt="Robot secundario" className="h-8 w-8" />
        </div>
      </footer>
    </div>
  );
}

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
