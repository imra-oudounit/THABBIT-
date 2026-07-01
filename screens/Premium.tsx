import { Icon } from "../components/Icon";
import { Owl } from "../components/Owl";
import { StatusBar } from "../components/Phone";

const features = [
  { icon: "auto_awesome", title: "Unlimited AI", desc: "No limits on recitation feedback" },
  { icon: "offline_pin", title: "Offline Mode", desc: "Download entire Quran" },
  { icon: "menu_book", title: "Full Tafsir", desc: "All tafsir collections" },
  { icon: "psychology", title: "Advanced AI", desc: "Pronunciation + Tajweed" },
  { icon: "diamond", title: "Premium Themes", desc: "Exclusive night modes" },
  { icon: "cloud_sync", title: "Cloud Sync", desc: "All devices synced" },
];

export function PremiumScreen() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 relative overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto phone-scroll pb-24 relative z-10">
        <StatusBar dark />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl -z-10" />

      <div className="relative px-6 pt-12 flex flex-col items-center text-center text-white">
        <Owl size={100} className="floaty" />
        <h1 className="mt-4 text-4xl font-bold">Go Premium</h1>
        <p className="mt-1.5 text-sm text-white/90 max-w-[260px]">
          Unlock the full power of Thabbit — unlimited AI, offline mode, and advanced features.
        </p>

        <div className="mt-6 flex gap-2">
          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur text-xs font-semibold">$4.99/mo</span>
          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur text-xs font-semibold">$29.99/year</span>
        </div>
      </div>

      <div className="relative mt-6 px-5 grid grid-cols-2 gap-3">
        {features.map((f, i) => (
          <div key={i} className="rounded-2xl bg-white/15 backdrop-blur p-3 text-center">
            <div className="w-10 h-10 rounded-xl bg-white/25 mx-auto flex items-center justify-center">
              <Icon name={f.icon} className="text-white" size={20} filled />
            </div>
            <div className="mt-2 text-xs font-semibold text-white">{f.title}</div>
            <div className="text-[9px] text-white/80 mt-0.5">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-6 px-5">
        <button className="w-full h-14 rounded-2xl bg-white text-amber-900 font-bold text-sm shadow-lg shadow-amber-500/40 flex items-center justify-center gap-2">
          <Icon name="workspace_premium" size={20} filled />
          Subscribe Now
        </button>
      </div>
      </div>
    </div>
  );
}
