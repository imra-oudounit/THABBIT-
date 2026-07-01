import { Owl } from "../components/Owl";
import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";

export function SignInScreen() {
  return (
    <div className="h-full w-full bg-mesh relative">
      <StatusBar />
      <div className="px-7 pt-10">
        <button className="w-11 h-11 rounded-2xl glass flex items-center justify-center">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
      </div>

      <div className="px-7 mt-6 flex items-center gap-3">
        <Owl size={48} />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-xs text-slate-500">Sign in to continue your journey</p>
        </div>
      </div>

      <div className="px-7 mt-8 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 ml-1">Email</label>
          <div className="mt-1.5 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
            <Icon name="mail" className="text-slate-400" size={20} />
            <span className="text-sm text-slate-800">yusuf@thabbit.app</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
          <div className="mt-1.5 h-14 rounded-2xl bg-white shadow-sm border border-emerald-200 ring-2 ring-emerald-100 flex items-center px-4 gap-3">
            <Icon name="lock" className="text-emerald-600" size={20} />
            <span className="text-sm text-slate-800 flex-1">••••••••••</span>
            <Icon name="visibility" className="text-slate-400" size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-5 h-5 rounded-md bg-brand-gradient flex items-center justify-center">
              <Icon name="check" className="text-white" size={14} />
            </span>
            Remember me
          </label>
          <button className="text-xs font-semibold text-emerald-700">Forgot?</button>
        </div>

        <button className="w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">
          Sign In
          <Icon name="arrow_forward" size={20} />
        </button>

        {/* Biometric */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] uppercase tracking-widest text-slate-400">or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="h-14 rounded-2xl neu flex items-center justify-center">
            <Icon name="fingerprint" className="text-emerald-700" size={26} />
          </button>
          <button className="h-14 rounded-2xl neu flex items-center justify-center">
            <span className="text-lg font-bold">G</span>
          </button>
          <button className="h-14 rounded-2xl neu flex items-center justify-center">
            <span className="msr" style={{ fontSize: 22 }}>apple</span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 pt-3">
          New to Thabbit? <span className="font-semibold text-emerald-700">Create account</span>
        </p>
      </div>
    </div>
  );
}
