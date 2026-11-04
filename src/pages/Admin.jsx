import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Award,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileText,
  FlaskConical,
  FolderKanban,
  Github,
  ImagePlus,
  LayoutDashboard,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useContent, ADMIN_SESSION_KEY } from "../components/ContentContext";
import { compressImage } from "../lib/github";

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || "shahriar2026";
const GH_CONFIG_KEY = "portfolio-github-config";
const GH_TOKEN_KEY = "portfolio-github-token";

const inputClass =
  "w-full rounded-xl border border-line bg-dark/60 px-3.5 py-2.5 text-sm text-light placeholder:text-muted/50 transition-all focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted";
const panelClass = "rounded-2xl border border-line bg-surface/70 backdrop-blur-md";

const uid = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const move = (array, index, direction) => {
  const next = [...array];
  const target = index + direction;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

/* ------------------------------------------------------------------ */
/* Shared fields                                                       */
/* ------------------------------------------------------------------ */

const Toggle = ({ checked, onChange, label }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
      checked
        ? "border-emerald-400/30 bg-emerald-400/10"
        : "border-line bg-dark/40 hover:border-primary/30"
    }`}
  >
    <span className="flex items-center gap-2 text-xs font-semibold text-light">
      {checked ? (
        <Eye size={14} className="text-emerald-300" />
      ) : (
        <EyeOff size={14} className="text-muted" />
      )}
      {label}
    </span>
    <span
      className={`relative h-5 w-9 rounded-full transition-colors ${
        checked ? "bg-emerald-400" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
          checked ? "left-[18px]" : "left-0.5"
        }`}
      />
    </span>
  </button>
);

const ImageManager = ({ images = [], onChange, label = "Images" }) => {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");

  const addFiles = async (files) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const converted = [];
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        converted.push(await compressImage(file));
      }
      onChange([...images, ...converted]);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const addUrl = () => {
    const value = urlDraft.trim();
    if (!value) return;
    onChange([...images, value]);
    setUrlDraft("");
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className={labelClass}>{label}</span>
        <span className="text-[10px] text-muted">{images.length} image(s)</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={`${image.slice(0, 24)}-${index}`}
            className="group relative overflow-hidden rounded-xl border border-line bg-dark"
          >
            <img src={image} alt="" className="h-24 w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, i) => i !== index))}
              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-dark/80 text-rose-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <X size={13} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex h-24 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line bg-dark/30 text-muted transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-50"
        >
          {busy ? (
            <RefreshCw size={18} className="animate-spin" />
          ) : (
            <ImagePlus size={18} />
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {busy ? "Optimising" : "Upload"}
          </span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => addFiles(Array.from(event.target.files || []))}
      />

      <div className="mt-2 flex gap-2">
        <input
          value={urlDraft}
          onChange={(event) => setUrlDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addUrl();
            }
          }}
          placeholder="…or paste an image URL"
          className={inputClass}
        />
        <button
          type="button"
          onClick={addUrl}
          className="shrink-0 rounded-xl border border-line px-3 text-xs font-bold text-muted transition-colors hover:border-primary/40 hover:text-primary"
        >
          Add
        </button>
      </div>
    </div>
  );
};

const SingleImage = ({ value, onChange, label = "Image" }) => {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setBusy(true);
    try {
      onChange(await compressImage(file));
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex items-center gap-3">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-line bg-dark">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">
              <ImagePlus size={20} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-dark/40 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-light transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-50"
          >
            {busy ? <RefreshCw size={13} className="animate-spin" /> : <UploadCloud size={13} />}
            {value ? "Replace" : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted transition-colors hover:border-rose-400/40 hover:text-rose-300"
            >
              <Trash2 size={13} />
              Remove
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Generic collection editor                                           */
/* ------------------------------------------------------------------ */

const FieldRenderer = ({ item, field, onChange }) => {
  if (field.showWhen && !field.showWhen(item)) return null;

  const value = item[field.key];

  if (field.type === "checkbox") {
    return (
      <div className={field.full ? "sm:col-span-2" : ""}>
        <Toggle
          checked={value !== false}
          onChange={(checked) => onChange({ [field.key]: checked })}
          label={field.label}
        />
      </div>
    );
  }

  if (field.type === "images") {
    return (
      <div className={field.full ? "sm:col-span-2" : ""}>
        <ImageManager
          images={Array.isArray(value) ? value : []}
          onChange={(next) => onChange({ [field.key]: next })}
          label={field.label}
        />
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <div className={field.full ? "sm:col-span-2" : ""}>
        <SingleImage
          value={value || ""}
          onChange={(next) => onChange({ [field.key]: next })}
          label={field.label}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={field.full ? "sm:col-span-2" : ""}>
        <label className={labelClass}>{field.label}</label>
        <select
          value={value || field.options?.[0]?.value || ""}
          onChange={(event) => onChange({ [field.key]: event.target.value })}
          className={inputClass}
        >
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={field.full ? "sm:col-span-2" : ""}>
        <label className={labelClass}>{field.label}</label>
        <textarea
          rows={field.rows || 3}
          value={value || ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange({ [field.key]: event.target.value })}
          className={`${inputClass} resize-y`}
        />
      </div>
    );
  }

  if (field.type === "tags") {
    return (
      <div className={field.full ? "sm:col-span-2" : ""}>
        <label className={labelClass}>{field.label}</label>
        <input
          value={(Array.isArray(value) ? value : []).join(", ")}
          placeholder={field.placeholder || "Separate with commas"}
          onChange={(event) =>
            onChange({
              [field.key]: event.target.value
                .split(",")
                .map((entry) => entry.trim())
                .filter(Boolean),
            })
          }
          className={inputClass}
        />
      </div>
    );
  }

  if (field.type === "lines") {
    return (
      <div className={field.full ? "sm:col-span-2" : ""}>
        <label className={labelClass}>{field.label}</label>
        <textarea
          rows={field.rows || 4}
          value={(Array.isArray(value) ? value : []).join("\n")}
          placeholder={field.placeholder || "One item per line"}
          onChange={(event) =>
            onChange({
              [field.key]: event.target.value
                .split("\n")
                .map((entry) => entry.trim())
                .filter(Boolean),
            })
          }
          className={`${inputClass} resize-y`}
        />
      </div>
    );
  }

  return (
    <div className={field.full ? "sm:col-span-2" : ""}>
      <label className={labelClass}>{field.label}</label>
      <input
        type="text"
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(event) => onChange({ [field.key]: event.target.value })}
        className={inputClass}
      />
    </div>
  );
};

const CollectionPanel = ({
  title,
  description,
  icon: Icon,
  items = [],
  fields,
  createItem,
  renderSummary,
  itemNoun = "item",
  onUpdate,
  onAdd,
  onRemove,
  onReorder,
}) => {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? null);
  const selected = items.find((item) => item.id === selectedId) || items[0] || null;

  const handleAdd = () => {
    const item = createItem();
    onAdd(item);
    setSelectedId(item.id);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Icon size={20} />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-light">{title}</h2>
            <p className="mt-1 text-xs text-muted">{description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
        >
          <Plus size={14} />
          Add {itemNoun}
        </button>
      </div>

      {items.length === 0 ? (
        <div className={`${panelClass} flex flex-col items-center justify-center px-6 py-16 text-center`}>
          <Icon size={30} className="mb-3 text-primary/60" />
          <p className="text-sm text-muted">No {itemNoun}s yet. Add your first one to get started.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-[290px_minmax(0,1fr)]">
          {/* List */}
          <div className="space-y-2">
            {items.map((item, index) => {
              const summary = renderSummary(item);
              const isActive = selected?.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`group rounded-xl border p-3 transition-colors ${
                    isActive
                      ? "border-primary/40 bg-primary/10"
                      : "border-line bg-surface/60 hover:border-primary/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className="w-full text-left"
                  >
                    <p className="truncate text-xs font-bold text-light">{summary.title}</p>
                    {summary.subtitle && (
                      <p className="mt-0.5 truncate text-[10px] text-muted">{summary.subtitle}</p>
                    )}
                  </button>

                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider ${
                        item.visible === false ? "text-muted" : "text-emerald-300"
                      }`}
                    >
                      {item.visible === false ? <EyeOff size={10} /> : <Eye size={10} />}
                      {item.visible === false ? "Hidden" : "Visible"}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onReorder(index, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-white/5 hover:text-light"
                        aria-label="Move up"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onReorder(index, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-white/5 hover:text-light"
                        aria-label="Move down"
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editor */}
          {selected && (
            <div className={`${panelClass} p-5`}>
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-line pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                    Editing
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-light">
                    {renderSummary(selected).title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete this ${itemNoun}? This cannot be undone after publishing.`
                      )
                    ) {
                      onRemove(selected.id);
                      setSelectedId(null);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-300 transition-colors hover:bg-rose-400/20"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <FieldRenderer
                    key={field.key}
                    item={selected}
                    field={field}
                    onChange={(patch) => onUpdate(selected.id, patch)}
                  />
                ))}
              </div>

              <p className="mt-5 flex items-center gap-1.5 text-[10px] text-muted">
                <CheckCircle2 size={11} className="text-emerald-400" />
                Changes save to your local draft automatically.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Panels                                                              */
/* ------------------------------------------------------------------ */

const ProjectPanel = () => {
  const { content, setContent } = useContent();
  const items = content.projects || [];

  const fields = [
    { key: "title", label: "Project title", full: true, placeholder: "Dashboard name" },
    {
      key: "category",
      label: "Section",
      type: "select",
      options: [
        { value: "data", label: "Data Intelligence" },
        { value: "web", label: "Software Engineering" },
      ],
    },
    {
      key: "subCategory",
      label: "Data category",
      type: "select",
      options: [
        { value: "powerbi", label: "Power BI" },
        { value: "excel", label: "Excel" },
        { value: "sql", label: "SQL" },
      ],
      showWhen: (item) => item.category === "data",
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      full: true,
      rows: 3,
    },
    { key: "images", label: "Preview images", type: "images", full: true },
    {
      key: "tools",
      label: "Tools / tech stack",
      type: "tags",
      full: true,
      placeholder: "Power BI, DAX, SQL",
    },
    { key: "liveLink", label: "Live demo / primary link", placeholder: "https://" },
    { key: "githubLink", label: "GitHub link", placeholder: "https://github.com/..." },
    { key: "visible", label: "Show on portfolio", type: "checkbox" },
  ];

  return (
    <CollectionPanel
      title="Projects"
      description="Add dashboards and apps, then choose the section and data category they appear under."
      icon={FolderKanban}
      items={items}
      fields={fields}
      itemNoun="project"
      createItem={() => ({
        id: uid("proj"),
        category: "data",
        subCategory: "powerbi",
        title: "New project",
        description: "",
        images: [],
        tools: [],
        liveLink: "",
        githubLink: "",
        visible: true,
      })}
      renderSummary={(item) => ({
        title: item.title || "Untitled project",
        subtitle: item.category === "data" ? `Data · ${item.subCategory || "powerbi"}` : "Software Engineering",
      })}
      onUpdate={(id, patch) =>
        setContent((previous) => ({
          ...previous,
          projects: previous.projects.map((item) =>
            item.id === id ? { ...item, ...patch } : item
          ),
        }))
      }
      onAdd={(item) =>
        setContent((previous) => ({ ...previous, projects: [...previous.projects, item] }))
      }
      onRemove={(id) =>
        setContent((previous) => ({
          ...previous,
          projects: previous.projects.filter((item) => item.id !== id),
        }))
      }
      onReorder={(index, direction) =>
        setContent((previous) => ({
          ...previous,
          projects: move(previous.projects, index, direction),
        }))
      }
    />
  );
};

const ExperiencePanel = () => {
  const { content, setContent } = useContent();
  const items = content.experience || [];

  const fields = [
    { key: "role", label: "Job title", placeholder: "Officer — ERP & Data Operations" },
    { key: "company", label: "Company", placeholder: "Bata" },
    { key: "department", label: "Department", placeholder: "Local Sourcing" },
    { key: "location", label: "Location", placeholder: "Dhaka, Bangladesh" },
    { key: "start", label: "Start date", placeholder: "11 Aug 2026" },
    { key: "end", label: "End date", placeholder: "14 Oct 2026" },
    { key: "current", label: "I currently work here", type: "checkbox" },
    { key: "description", label: "Summary", type: "textarea", full: true, rows: 3 },
    {
      key: "highlights",
      label: "Highlights",
      type: "lines",
      full: true,
      rows: 4,
      placeholder: "One achievement per line",
    },
    { key: "visible", label: "Show on portfolio", type: "checkbox" },
  ];

  return (
    <CollectionPanel
      title="Experience"
      description="Control what visitors see. Toggle visibility any time, or publish to make it live."
      icon={BriefcaseBusiness}
      items={items}
      fields={fields}
      itemNoun="role"
      createItem={() => ({
        id: uid("exp"),
        role: "New role",
        company: "",
        department: "",
        start: "",
        end: "",
        current: false,
        location: "",
        description: "",
        highlights: [],
        visible: true,
      })}
      renderSummary={(item) => ({
        title: item.role || "Untitled role",
        subtitle: [item.company, item.department].filter(Boolean).join(" · "),
      })}
      onUpdate={(id, patch) =>
        setContent((previous) => ({
          ...previous,
          experience: previous.experience.map((item) =>
            item.id === id ? { ...item, ...patch } : item
          ),
        }))
      }
      onAdd={(item) =>
        setContent((previous) => ({ ...previous, experience: [...previous.experience, item] }))
      }
      onRemove={(id) =>
        setContent((previous) => ({
          ...previous,
          experience: previous.experience.filter((item) => item.id !== id),
        }))
      }
      onReorder={(index, direction) =>
        setContent((previous) => ({
          ...previous,
          experience: move(previous.experience, index, direction),
        }))
      }
    />
  );
};

const ResearchPanel = () => {
  const { content, setContent } = useContent();
  const items = content.research || [];

  const fields = [
    { key: "title", label: "Title", full: true, placeholder: "Paper or dataset title" },
    { key: "type", label: "Type", placeholder: "Conference Paper" },
    { key: "status", label: "Status", placeholder: "Accepted & Published" },
    {
      key: "tone",
      label: "Accent colour",
      type: "select",
      options: [
        { value: "emerald", label: "Emerald (published)" },
        { value: "primary", label: "Violet (in progress)" },
        { value: "amber", label: "Amber (under review)" },
      ],
    },
    {
      key: "icon",
      label: "Icon",
      type: "select",
      options: [
        { value: "check", label: "Check" },
        { value: "file", label: "Document" },
        { value: "database", label: "Database" },
      ],
    },
    { key: "year", label: "Year", placeholder: "2024–2025" },
    { key: "conference", label: "Conference / venue" },
    { key: "journal", label: "Journal" },
    { key: "publication", label: "Indexed in", placeholder: "IEEE Xplore (Scopus)" },
    { key: "description", label: "Abstract / summary", type: "textarea", full: true, rows: 4 },
    {
      key: "technologies",
      label: "Technologies & methods",
      type: "tags",
      full: true,
    },
    { key: "highlights", label: "Key highlights", type: "lines", full: true, rows: 4 },
    { key: "visible", label: "Show on portfolio", type: "checkbox" },
  ];

  return (
    <CollectionPanel
      title="Research & Publications"
      description="Papers, theses, and dataset publications shown in the research section."
      icon={FlaskConical}
      items={items}
      fields={fields}
      itemNoun="publication"
      createItem={() => ({
        id: uid("res"),
        title: "New publication",
        type: "Conference Paper",
        status: "In Progress",
        tone: "primary",
        icon: "file",
        description: "",
        conference: "",
        journal: "",
        publication: "",
        technologies: [],
        year: "",
        highlights: [],
        visible: true,
      })}
      renderSummary={(item) => ({
        title: item.title || "Untitled publication",
        subtitle: [item.type, item.year].filter(Boolean).join(" · "),
      })}
      onUpdate={(id, patch) =>
        setContent((previous) => ({
          ...previous,
          research: previous.research.map((item) =>
            item.id === id ? { ...item, ...patch } : item
          ),
        }))
      }
      onAdd={(item) =>
        setContent((previous) => ({ ...previous, research: [...previous.research, item] }))
      }
      onRemove={(id) =>
        setContent((previous) => ({
          ...previous,
          research: previous.research.filter((item) => item.id !== id),
        }))
      }
      onReorder={(index, direction) =>
        setContent((previous) => ({
          ...previous,
          research: move(previous.research, index, direction),
        }))
      }
    />
  );
};

const CertificatePanel = () => {
  const { content, setContent } = useContent();
  const items = content.certificates || [];

  const fields = [
    { key: "title", label: "Certificate title", full: true },
    { key: "issuer", label: "Issued by", placeholder: "IEEE" },
    { key: "date", label: "Date / year", placeholder: "2026" },
    { key: "image", label: "Certificate image", type: "image", full: true },
    { key: "link", label: "Verification link", full: true, placeholder: "https://" },
    { key: "visible", label: "Show on portfolio", type: "checkbox" },
  ];

  return (
    <CollectionPanel
      title="Certificates"
      description="Upload certificate images. They are optimised in the browser before publishing."
      icon={Award}
      items={items}
      fields={fields}
      itemNoun="certificate"
      createItem={() => ({
        id: uid("cert"),
        title: "New certificate",
        issuer: "",
        date: "",
        image: "",
        link: "",
        visible: true,
      })}
      renderSummary={(item) => ({
        title: item.title || "Untitled certificate",
        subtitle: [item.issuer, item.date].filter(Boolean).join(" · "),
      })}
      onUpdate={(id, patch) =>
        setContent((previous) => ({
          ...previous,
          certificates: previous.certificates.map((item) =>
            item.id === id ? { ...item, ...patch } : item
          ),
        }))
      }
      onAdd={(item) =>
        setContent((previous) => ({
          ...previous,
          certificates: [...previous.certificates, item],
        }))
      }
      onRemove={(id) =>
        setContent((previous) => ({
          ...previous,
          certificates: previous.certificates.filter((item) => item.id !== id),
        }))
      }
      onReorder={(index, direction) =>
        setContent((previous) => ({
          ...previous,
          certificates: move(previous.certificates, index, direction),
        }))
      }
    />
  );
};

const ActivityPanel = () => {
  const { content, setContent } = useContent();
  const items = content.activities || [];

  const fields = [
    { key: "title", label: "Activity title", full: true },
    { key: "role", label: "Your role", placeholder: "Vice President" },
    { key: "location", label: "Location", placeholder: "DIU Campus" },
    { key: "date", label: "Date / period", placeholder: "2024–2025" },
    {
      key: "position",
      label: "Image focus",
      type: "select",
      options: [
        { value: "object-center", label: "Center" },
        { value: "object-top", label: "Top" },
        { value: "object-bottom", label: "Bottom" },
      ],
    },
    { key: "images", label: "Photos", type: "images", full: true },
    { key: "story", label: "Story / description", type: "textarea", full: true, rows: 4 },
    { key: "visible", label: "Show on portfolio", type: "checkbox" },
  ];

  return (
    <CollectionPanel
      title="Life & Leadership"
      description="Conference moments, leadership roles, sports, and community work."
      icon={Camera}
      items={items}
      fields={fields}
      itemNoun="activity"
      createItem={() => ({
        id: uid("act"),
        title: "New activity",
        role: "",
        location: "",
        date: "",
        story: "",
        images: [],
        position: "object-center",
        visible: true,
      })}
      renderSummary={(item) => ({
        title: item.title || "Untitled activity",
        subtitle: [item.role, item.date].filter(Boolean).join(" · "),
      })}
      onUpdate={(id, patch) =>
        setContent((previous) => ({
          ...previous,
          activities: previous.activities.map((item) =>
            item.id === id ? { ...item, ...patch } : item
          ),
        }))
      }
      onAdd={(item) =>
        setContent((previous) => ({ ...previous, activities: [...previous.activities, item] }))
      }
      onRemove={(id) =>
        setContent((previous) => ({
          ...previous,
          activities: previous.activities.filter((item) => item.id !== id),
        }))
      }
      onReorder={(index, direction) =>
        setContent((previous) => ({
          ...previous,
          activities: move(previous.activities, index, direction),
        }))
      }
    />
  );
};

const ProfilePanel = () => {
  const { content, setContent, pendingCv, uploadCv, clearPendingCv } = useContent();
  const profile = content.profile || {};
  const cvInputRef = useRef(null);
  const [cvBusy, setCvBusy] = useState(false);

  const update = (patch) =>
    setContent((previous) => ({
      ...previous,
      profile: { ...previous.profile, ...patch },
    }));

  const profileFields = [
    { key: "name", label: "Full name" },
    { key: "role", label: "Professional title" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "location", label: "Present location" },
    { key: "hometown", label: "Hometown" },
    { key: "github", label: "GitHub URL", full: true },
    { key: "linkedin", label: "LinkedIn URL", full: true },
    { key: "availability", label: "Availability badge", full: true },
    { key: "cvUrl", label: "CV URL (advanced)", full: true },
    { key: "cvFileName", label: "CV file name", full: true },
  ];

  const handleCv = async (file) => {
    if (!file) return;
    setCvBusy(true);
    try {
      await uploadCv(file);
    } finally {
      setCvBusy(false);
      if (cvInputRef.current) cvInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <UserRound size={20} />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-light">Profile &amp; CV</h2>
          <p className="mt-1 text-xs text-muted">
            Contact details and the CV that every visitor downloads.
          </p>
        </div>
      </div>

      <div className={`${panelClass} p-5`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {profileFields.map((field) => (
            <div key={field.key} className={field.full ? "sm:col-span-2" : ""}>
              <label className={labelClass}>{field.label}</label>
              <input
                value={profile[field.key] ?? ""}
                onChange={(event) => update({ [field.key]: event.target.value })}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={`${panelClass} p-5`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-400/10 text-rose-300 ring-1 ring-rose-400/20">
              <FileText size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-light">Curriculum Vitae</p>
              <p className="text-[11px] text-muted">
                {profile.cvFileName || "No CV uploaded yet"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Download size={12} />
                Current CV
              </a>
            )}
            <button
              type="button"
              onClick={() => cvInputRef.current?.click()}
              disabled={cvBusy}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] disabled:opacity-60"
            >
              {cvBusy ? (
                <RefreshCw size={12} className="animate-spin" />
              ) : (
                <UploadCloud size={12} />
              )}
              {pendingCv ? "Replace file" : "Upload new CV"}
            </button>
          </div>
        </div>

        <input
          ref={cvInputRef}
          type="file"
          accept="application/pdf,.pdf,.doc,.docx"
          className="hidden"
          onChange={(event) => handleCv(event.target.files?.[0])}
        />

        {pendingCv && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3">
            <p className="text-[11px] font-semibold text-amber-200">
              {pendingCv.name} · {(pendingCv.size / 1024).toFixed(0)} KB — will upload when you
              publish.
            </p>
            <button
              type="button"
              onClick={clearPendingCv}
              className="text-[10px] font-bold uppercase tracking-wider text-amber-200/80 hover:text-amber-100"
            >
              Cancel
            </button>
          </div>
        )}

        <p className="mt-4 flex items-start gap-2 rounded-xl border border-line bg-dark/40 p-3 text-[11px] leading-relaxed text-muted">
          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-primary" />
          The new CV is committed to your repository on publish, so every visitor sees the updated
          file. Until then it stays in your local draft.
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Publish                                                             */
/* ------------------------------------------------------------------ */

const PublishPanel = ({ onToast }) => {
  const {
    content,
    publish,
    publishState,
    hasDraft,
    discardDraft,
    exportJson,
    importJson,
    pendingCv,
    loading,
  } = useContent();
  const fileInputRef = useRef(null);

  const [config, setConfig] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(GH_CONFIG_KEY) || "null");
      if (saved) return saved;
    } catch {
      // ignore
    }
    return {
      owner: "Shahriarshihab5",
      repo: "syed-shahriar-ahmed-portfolio",
      branch: "main",
      path: "public/content.json",
    };
  });

  const [token, setToken] = useState(
    () => sessionStorage.getItem(GH_TOKEN_KEY) || localStorage.getItem(GH_TOKEN_KEY) || ""
  );
  const [rememberToken, setRememberToken] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    try {
      const { token: _token, ...safe } = config;
      localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(safe));
    } catch {
      // ignore
    }
  }, [config]);

  const counts = useMemo(
    () => [
      { label: "Projects", value: content.projects?.length || 0 },
      { label: "Roles", value: content.experience?.length || 0 },
      { label: "Research", value: content.research?.length || 0 },
      { label: "Certificates", value: content.certificates?.length || 0 },
      { label: "Activities", value: content.activities?.length || 0 },
    ],
    [content]
  );

  const handlePublish = async () => {
    try {
      if (rememberToken) localStorage.setItem(GH_TOKEN_KEY, token.trim());
      else localStorage.removeItem(GH_TOKEN_KEY);
      sessionStorage.setItem(GH_TOKEN_KEY, token.trim());

      await publish({ ...config, token: token.trim() });
      onToast("success", "Published to GitHub.");
    } catch (error) {
      onToast("error", error.message || "Publish failed.");
    }
  };

  const handleImport = async (file) => {
    if (!file) return;
    setImporting(true);
    try {
      await importJson(file);
      onToast("success", "Content imported into your draft.");
    } catch {
      onToast("error", "That file is not valid portfolio content JSON.");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Github size={20} />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-light">Publish</h2>
          <p className="mt-1 text-xs text-muted">
            Commit your draft to GitHub. Your hosting provider redeploys automatically.
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {counts.map((count) => (
          <div key={count.label} className={`${panelClass} p-3 text-center`}>
            <p className="font-display text-xl font-bold text-gradient">{count.value}</p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              {count.label}
            </p>
          </div>
        ))}
      </div>

      {hasDraft && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3.5">
          <p className="flex items-center gap-2 text-[11px] font-semibold text-amber-200">
            <AlertCircle size={14} />
            You have local changes that are not published yet.
          </p>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Discard all local changes and load the last published content?")) {
                discardDraft();
                onToast("info", "Local draft discarded.");
              }
            }}
            className="text-[10px] font-bold uppercase tracking-wider text-amber-200/80 hover:text-amber-100"
          >
            Discard draft
          </button>
        </div>
      )}

      {/* GitHub form */}
      <div className={`${panelClass} p-5`}>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-light">
          GitHub repository
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Owner</label>
            <input
              value={config.owner}
              onChange={(event) => setConfig({ ...config, owner: event.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Repository</label>
            <input
              value={config.repo}
              onChange={(event) => setConfig({ ...config, repo: event.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Branch</label>
            <input
              value={config.branch}
              onChange={(event) => setConfig({ ...config, branch: event.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Content file path</label>
            <input
              value={config.path}
              onChange={(event) => setConfig({ ...config, path: event.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Fine-grained GitHub token</label>
          <div className="flex gap-2">
            <input
              type={showToken ? "text" : "password"}
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="github_pat_..."
              className={inputClass}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowToken((previous) => !previous)}
              className="shrink-0 rounded-xl border border-line px-3 text-muted transition-colors hover:text-light"
              aria-label="Toggle token visibility"
            >
              {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-[10px] text-muted">
            <input
              type="checkbox"
              checked={rememberToken}
              onChange={(event) => setRememberToken(event.target.checked)}
              className="accent-[var(--accent-1)]"
            />
            Remember this token on this device
          </label>
          <p className="mt-2 text-[10px] leading-relaxed text-muted">
            Needs <span className="text-light/80">Contents: Read and write</span> permission for
            this repository only. The token is never saved inside content.json.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishState.status === "publishing" || !token.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {publishState.status === "publishing" ? (
              <RefreshCw size={15} className="animate-spin" />
            ) : (
              <UploadCloud size={15} />
            )}
            {publishState.status === "publishing" ? "Publishing…" : "Publish changes"}
          </button>

          {pendingCv && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              + CV will be uploaded
            </span>
          )}
        </div>

        {publishState.message && (
          <div
            className={`mt-4 flex items-start gap-2 rounded-xl border p-3 text-[11px] leading-relaxed ${
              publishState.status === "error"
                ? "border-rose-400/30 bg-rose-400/10 text-rose-200"
                : publishState.status === "success"
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                  : "border-line bg-dark/40 text-muted"
            }`}
          >
            {publishState.status === "error" ? (
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
            ) : (
              <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
            )}
            <span>
              {publishState.message}
              {publishState.url && (
                <>
                  {" "}
                  <a
                    href={publishState.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline"
                  >
                    View commit
                  </a>
                </>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Backup */}
      <div className={`${panelClass} p-5`}>
        <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-light">
          Backup &amp; restore
        </h3>
        <p className="mb-4 text-[11px] text-muted">
          Export a JSON copy before large changes, or import a previous backup.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportJson}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-dark/40 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-light transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Download size={13} />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-dark/40 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-light transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-50"
          >
            <UploadCloud size={13} />
            {importing ? "Importing…" : "Import JSON"}
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(event) => handleImport(event.target.files?.[0])}
        />
      </div>

      <div className={`${panelClass} p-5`}>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-light">
          How publishing works
        </h3>
        <ol className="list-decimal space-y-1.5 pl-4 text-[11px] leading-relaxed text-muted">
          <li>Every edit is stored in this browser as a draft while you work.</li>
          <li>Publishing commits <code className="text-light/80">public/content.json</code> and any new CV/images to GitHub.</li>
          <li>Your host (Vercel, Netlify, GitHub Pages) rebuilds the site automatically.</li>
          <li>Visitors then see the updated portfolio and CV.</li>
        </ol>
        {loading && (
          <p className="mt-3 flex items-center gap-2 text-[10px] text-muted">
            <RefreshCw size={11} className="animate-spin" /> Loading published content…
          </p>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

const PinGate = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "granted");
      onUnlock();
      return;
    }
    setError("That PIN is not correct.");
    setPin("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark px-5 py-16 text-light">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-[1.5px] shadow-xl shadow-primary/30">
            <span className="flex h-full w-full items-center justify-center rounded-[14px] bg-surface text-primary">
              <Lock size={22} />
            </span>
          </span>
          <h1 className="font-display text-2xl font-bold">Admin Studio</h1>
          <p className="mt-2 text-xs text-muted">
            Enter your PIN to manage the portfolio content.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-line bg-surface/80 p-6 backdrop-blur-xl"
        >
          <label className={labelClass}>Admin PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(event) => {
              setPin(event.target.value);
              setError("");
            }}
            autoFocus
            placeholder="••••••••"
            className={inputClass}
          />
          {error && (
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-rose-300">
              <AlertCircle size={12} />
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]"
          >
            <ShieldCheck size={15} />
            Unlock dashboard
          </button>

          <Link
            to="/"
            className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft size={12} />
            Back to portfolio
          </Link>
        </form>

        <p className="mt-5 text-center text-[10px] leading-relaxed text-muted">
          The PIN is a convenience lock. Real protection comes from your GitHub token.
        </p>
      </div>
    </div>
  );
};

const TABS = [
  { id: "publish", label: "Publish", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "research", label: "Research", icon: FlaskConical },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "activities", label: "Life & Leadership", icon: Camera },
  { id: "profile", label: "Profile & CV", icon: UserRound },
];

const AdminDashboard = ({ onLock }) => {
  const { content, hasDraft, saveDraft, storageWarning } = useContent();
  const [tab, setTab] = useState("publish");
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  useEffect(() => () => toastTimer.current && clearTimeout(toastTimer.current), []);

  const counts = {
    projects: content.projects?.length || 0,
    experience: content.experience?.length || 0,
    research: content.research?.length || 0,
    certificates: content.certificates?.length || 0,
    activities: content.activities?.length || 0,
  };

  return (
    <div className="relative min-h-screen bg-dark text-light">
      <div className="pointer-events-none fixed left-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-[140px]" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-dark/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-[1.5px]">
              <span className="flex h-full w-full items-center justify-center rounded-[9px] bg-surface text-[10px] font-black text-light">
                SSA
              </span>
            </span>
            <div>
              <p className="font-display text-sm font-bold leading-tight">Admin Studio</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                Content Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasDraft && (
              <span className="hidden items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-200 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Draft
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                saveDraft();
                showToast("success", "Draft saved.");
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-light transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Save size={13} />
              <span className="hidden sm:inline">Save draft</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Eye size={13} />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(ADMIN_SESSION_KEY);
                onLock();
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted transition-colors hover:border-rose-400/40 hover:text-rose-300"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 lg:w-60">
          <nav className="flex flex-wrap gap-2 pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {TABS.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-[11px] font-bold transition-colors lg:w-full ${
                    active
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-line bg-surface/50 text-muted hover:border-primary/25 hover:text-light"
                  }`}
                >
                  <Icon size={15} />
                  {item.label}
                  <span
                    className={`ml-auto hidden rounded-full px-1.5 py-0.5 text-[9px] lg:inline ${
                      active ? "bg-primary/15 text-primary" : "bg-white/5 text-muted"
                    }`}
                  >
                    {item.id === "projects"
                      ? counts.projects
                      : item.id === "experience"
                        ? counts.experience
                        : item.id === "research"
                          ? counts.research
                          : item.id === "certificates"
                            ? counts.certificates
                            : item.id === "activities"
                              ? counts.activities
                              : ""}
                  </span>
                </button>
              );
            })}
          </nav>

          {storageWarning && (
            <p className="mt-3 flex items-start gap-1.5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-2.5 text-[10px] leading-relaxed text-rose-200">
              <AlertCircle size={12} className="mt-0.5 shrink-0" />
              {storageWarning}
            </p>
          )}

          <div className="mt-3 hidden rounded-xl border border-line bg-surface/50 p-3 lg:block">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted">
              Sync status
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
              {hasDraft
                ? "Local draft in progress. Publish from the Publish tab."
                : "Everything is in sync with the published content."}
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {tab === "publish" && <PublishPanel onToast={showToast} />}
          {tab === "projects" && <ProjectPanel />}
          {tab === "experience" && <ExperiencePanel />}
          {tab === "research" && <ResearchPanel />}
          {tab === "certificates" && <CertificatePanel />}
          {tab === "activities" && <ActivityPanel />}
          {tab === "profile" && <ProfilePanel />}
        </main>
      </div>

      {toast && (
        <div
          className={`fixed bottom-5 left-1/2 z-50 flex max-w-[92vw] -translate-x-1/2 items-start gap-2 rounded-xl border px-4 py-3 text-xs shadow-2xl backdrop-blur-xl ${
            toast.type === "error"
              ? "border-rose-400/30 bg-rose-500/15 text-rose-100"
              : toast.type === "info"
                ? "border-line bg-surface/90 text-light"
                : "border-emerald-400/30 bg-emerald-500/15 text-emerald-100"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
          ) : toast.type === "info" ? (
            <Sparkles size={15} className="mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
};

const Admin = () => {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(ADMIN_SESSION_KEY) === "granted"
  );

  useEffect(() => {
    document.title = "Admin Studio | Syed Shahriar Ahmed";
  }, []);

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;
  return <AdminDashboard onLock={() => setUnlocked(false)} />;
};

export default Admin;
