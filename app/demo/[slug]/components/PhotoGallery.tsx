// Stock photography — swap these for the client's real photos when available.
const PHOTOS = [
  { caption: "Freshly Split Oak", image: "https://images.unsplash.com/photo-1571040195944-85a412548a43?w=800&q=80&auto=format&fit=crop" },
  { caption: "On the Road", image: "https://images.unsplash.com/photo-1543784297-b08dbcef46c4?w=800&q=80&auto=format&fit=crop" },
  { caption: "Stacked & Ready", image: "https://images.unsplash.com/photo-1629570584961-6d1ac3ded3d8?w=800&q=80&auto=format&fit=crop" },
];

export default function PhotoGallery() {
  return (
    <section className="relative px-6 py-16" style={{ background: "rgba(255,255,255,0.015)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">See the work</p>
          <h2 className="display-font text-2xl sm:text-3xl font-bold text-white">From Our Yard to Yours</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {PHOTOS.map((p) => (
            <div
              key={p.caption}
              className="relative h-56 rounded-2xl overflow-hidden border border-white/8 bg-cover bg-center"
              style={{ backgroundImage: `url(${p.image})` }}
            >
              <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(10,7,5,0.9), transparent)" }} />
              <p className="absolute bottom-3 left-4 text-white text-sm font-medium">{p.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
