// app/login/page.tsx
"use client";
import { useState } from "react";
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck, Sparkles, Code2, Eye, EyeOff, CheckCircle2, Globe,Terminal,KeyRound
} from "lucide-react";
import { useRouter } from "next/navigation";
const USER_URL = "https://resume-portfolio-backend-d7qr.onrender.com/api/users/login";
export default function LoginPage() {
  const[showPassword,setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(
    { 
      Email: "",
      Password: "" 
    });

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsLoading(true);

  const payload = {
    Email: formData.Email,
    Password: formData.Password,
  };

  try {
    const response = await fetch(USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let result: any = null;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      const errorMessage =
        result?.message ||
        result?.Message ||
        result?.error ||
        "Login failed. Please try again.";

      throw new Error(errorMessage);
    }
    console.log("Login response:", result);
    const user = result?.user;

    if (!user) {
      throw new Error("User information was not returned from the server.");
    }

    console.log("Logged in user:", user);
    console.log("Role ID:", user.roleId);
    console.log("Role Name:", user.roleName);

    localStorage.setItem("token", result.token || "");
    localStorage.setItem("userId", String(user.userId));
    localStorage.setItem("roleId", String(user.roleId));
    localStorage.setItem("roleName", user.roleName || "");
    localStorage.setItem("email", user.email || "");

    setFormData({
      Email: "",
      Password: "",
    });

    if (Number(user.roleId) === 1) {
      router.push("/action");
    } else {
      router.push("/");
    }

  } catch (error) {
    console.error("Login error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong while logging in."
    );
  } finally {
    setIsLoading(false);
  }
};
  


  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 font-sans selection:bg-cyan-400 selection:text-slate-950 relative flex flex-col justify-between p-4 sm:p-8 overflow-hidden">
    <div className="absolute -top-24 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-cyan-500/25 via-teal-500/15 to-transparent rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute -bottom-24 right-1/4 w-[750px] h-[750px] bg-gradient-to-tr from-blue-600/20 via-cyan-600/15 to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-teal-500/10 rounded-full blur-[190px] pointer-events-none -z-10" />
      <main className="relative z-10 my-auto w-full max-w-5xl mx-auto py-8">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-6 pr-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-medium w-fit backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Sparkles size={14} className="text-cyan-400 animate-spin" /> Next Gen Workspace
            </div>

            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Control Center for<br />
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent">
                Digital   Architecture
              </span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Sign in to manage active build deployments, inspect performance metrics, and configure environment endpoints.
            </p>

            {/* Feature List */}
            <div className="space-y-3 pt-2">
              {[
                { label: "End-to-End Encrypted Authentication", icon: KeyRound },
                { label: "Real-time Node Status Monitoring", icon: Terminal },
                { label: "Automated Deployment Pipeline Access", icon: CheckCircle2 }
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 text-xs text-slate-200">
                    <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <IconComp size={14} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Tech Card */}
            <div className="p-4 rounded-2xl bg-[#0a1628]/40 border border-cyan-500/20 backdrop-blur-md flex items-center gap-3 shadow-lg">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30">
                <Code2 size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Modern Stack Standard</p>
                <p className="text-[11px] text-slate-400">Next.js 14, Tailwind CSS & Framer Principles</p>
              </div>
            </div>
          </div>

          {/* Right Login Card */}
          <div className="lg:col-span-7 w-full max-w-md mx-auto">
            <div className="bg-[#0a1628]/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-cyan-500/25 shadow-[0_0_60px_rgba(6,182,212,0.18)] space-y-7 relative overflow-hidden group">
              
              {/* Animated Top Glow Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

              {/* Card Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-200 via-teal-100 to-white bg-clip-text text-transparent tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-xs text-cyan-300/70">
                  Provide your admin credentials to enter the platform
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400/60 group-focus-within/input:text-cyan-300 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.Email}
                      onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                      placeholder="dhruvi@example.com"
                      className="w-full bg-[#040a14]/90 border border-cyan-500/20 rounded-2xl pl-11 pr-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition duration-200 text-sm"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
                      Password
                    </label>
                    <a href="#forgot" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400/60 group-focus-within/input:text-cyan-300 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.Password}
                      onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-[#040a14]/90 border border-cyan-500/20 rounded-2xl pl-11 pr-11 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition duration-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded bg-[#040a14] border-cyan-500/30 text-cyan-500 focus:ring-0 cursor-pointer accent-cyan-500"
                    />
                    <span className="text-xs text-slate-300">Remember this session</span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Verifying Credentials...
                    </>
                  ) : (
                    <>
                      Authenticate <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
              <p className="text-center text-xs text-slate-400 pt-1">
                Need administrative access?{" "}
                <a href="#contact" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                  Contact System Admin
                </a>
              </p>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 text-center text-[11px] text-cyan-400/50 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full pt-4 gap-2 border-t border-cyan-500/10">
        <p>© {new Date().getFullYear()} Dhruvi. Integrated Watercolor Design System.</p>
        <p className="font-mono text-[10px] text-cyan-400/40">ENV: PRODUCTION • REGION: ASIA-SOUTH1</p>
      </footer>

    </div>
  );
}
