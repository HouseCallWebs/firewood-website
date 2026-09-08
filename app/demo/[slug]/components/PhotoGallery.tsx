// Stock photography stored locally in /public/images/demo (downloaded from
// Pixabay, royalty-free) — swap these for the client's real photos when
// available. A dark fallback color sits behind every image so a slow load
// never shows a bare gray box.
const PHOTOS = [
  { caption: "Freshly Split Oak", image: "/images/demo/split-firewood.jpg" },
  { caption: "Fresh Delivery", image: "/images/demo/log-truck.jpg" },
  { caption: "Stacked & Ready", image: "/images/demo/stacked-firewood.jpg" },
];

export default function PhotoGallery() {
  return (
    <section className="relative px-6 py-16" style={{ background: "rgba(255,255,255,0.015)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-2">See the work</p>
          <h2 className="display-font text-2xl sm:text-3xl font-bold text-white mb-3">From Our Yard to Yours</h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Every load comes straight from our yard — split, seasoned, and ready before
            it ever reaches your driveway.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {PHOTOS.map((p) => (
            <div
              key={p.caption}
              className="relative h-56 rounded-2xl overflow-hidden border border-white/8 bg-cover bg-center"
              style={{ backgroundColor: "#211710", backgroundImage: `url(${p.image})` }}
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
