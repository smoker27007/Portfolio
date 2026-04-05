const ProjectSection = ({
  number,
  total,
  title,
  category,
  role,
  image,
  accentColor,
}) => {
  return (
    <div
      className="relative flex-shrink-0 w-screen h-screen flex items-center justify-between px-16 py-20"
      style={{
        minWidth: "100vw",
        background: `linear-gradient(135deg, rgba(12, 24, 33, 0.9), rgba(19, 35, 48, 0.9))`,
      }}
    >
      <div className="absolute top-8 left-16 text-sm font-mono tracking-widest">
        <span style={{ color: accentColor }}>
          {number}
          <span style={{ color: "var(--text-secondary)" }}> / {total}</span>
        </span>
      </div>

      <div className="relative z-10 max-w-md">
        <h3 className="text-5xl font-display font-bold leading-tight mb-6 whitespace-pre-wrap">
          {title}
        </h3>
        <div className="space-y-4 mb-8">
          <div>
            <p style={{ color: "var(--text-secondary)", fontSize: "12px" }}>
              CATEGORY
            </p>
            <p style={{ color: "var(--text-primary)" }}>{category}</p>
          </div>
          <div>
            <p style={{ color: "var(--text-secondary)", fontSize: "12px" }}>
              MY ROLE
            </p>
            <p style={{ color: "var(--text-primary)" }}>{role}</p>
          </div>
        </div>
        <button className="cta-button text-sm">
          EXPLORE PROJECT
          <span>→</span>
        </button>
      </div>

      <div
        className="relative flex-1 h-full flex items-center justify-center"
        style={{
          borderLeft: `1px solid ${accentColor}40`,
        }}
      >
        <div
          className="w-96 h-96 rounded-lg overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${accentColor}20, transparent)`,
            border: `1px solid ${accentColor}40`,
          }}
        >
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <div
        className="absolute bottom-8 right-16 w-3 h-3 rounded-full"
        style={{ background: accentColor }}
      />
    </div>
  );
};

export default ProjectSection;