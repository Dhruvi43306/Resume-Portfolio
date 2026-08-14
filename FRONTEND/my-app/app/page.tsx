"use client";
import { useEffect, useState } from "react";
import {Code2,User,Briefcase,FileText,Mail,Send,CheckCircle2,Loader2,Menu,X,ExternalLink,Sparkles,GraduationCap,Laptop,ArrowRight,Terminal,Cpu,Layers,Globe,
} from "lucide-react";

export default function Portfolio() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Subject: "",
    Message: "",
  });

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setStatus("loading");
  setErrorMessage("");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("error");
      setErrorMessage("Please login before sending a message.");
      return;
    }

    const response = await fetch(
      "https://resume-portfolio-backend-d7qr.onrender.com/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            FullName: formData.FullName,
            Email: formData.Email,
            Subject: formData.Subject,
            Message: formData.Message,
        }),
      }
    );

    let result: any = null;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      throw new Error(
        result?.message ||
          result?.Message ||
          `Message could not be sent. Status: ${response.status}`
      );
    }

    console.log("Message sent successfully:", result);

    setStatus("success");

    setFormData({
      FullName: "",
      Email: "",
      Subject: "",
      Message: "",
    });
  } catch (error) {
    console.error("Message error:", error);

    setStatus("error");

    setErrorMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  }
};
  return (
    <div className="min-h-screen bg-[#03070f] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-tr from-cyan-600/20 via-teal-500/15 to-blue-600/20 blur-[150px] pointer-events-none -z-10 rounded-full"></div>
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-teal-500/10 blur-[140px] pointer-events-none -z-10 rounded-full"></div>
      <div className="absolute bottom-1/3 -right-40 w-[600px] h-[600px] bg-cyan-600/10 blur-[140px] pointer-events-none -z-10 rounded-full"></div>
      <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4">
        <div className="backdrop-blur-xl bg-[#0a1628]/70 border border-cyan-500/20 rounded-2xl px-6 h-16 flex items-center justify-between shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <a
            href="#home"
            className="text-base font-bold tracking-tight text-white flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-teal-500 flex items-center justify-center text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition">
              R
            </div>

            <span className="bg-gradient-to-r from-cyan-200 via-teal-100 to-white bg-clip-text text-transparent">
              Resume/Portfolio.web
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-300 bg-[#050b14]/60 border border-cyan-500/20 p-1.5 rounded-xl backdrop-blur-md">
            {["Home", "About", "Skills", "Resume", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 rounded-lg hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-cyan-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 backdrop-blur-xl bg-[#0a1628]/95 border border-cyan-500/20 rounded-2xl p-4 flex flex-col gap-2 text-slate-300 shadow-2xl">
            {["Home", "About", "Skills", "Resume", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-300 font-medium text-sm transition"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>
      <main className="max-w-5xl mx-auto px-4 space-y-36 pb-32 pt-12">
        <section
          id="home"
          className="min-h-[75vh] flex flex-col justify-center items-center text-center relative pt-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
            <span className="text-cyan-200/60">Status:</span>
            Open for opportunities
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white">
            Hello, I am <br />
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent">
              Full Stack Devloper
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-xl font-normal leading-relaxed">
            Frontend & Web Developer crafting clean, modern, and user-focused
            digital experiences with high precision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#resume"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm flex items-center gap-2"
            >
              Resume Portal
              <ArrowRight size={16} />
            </a>

            <a
              href="#contact"
              className="px-7 py-3.5 rounded-2xl bg-[#0a1628]/80 border border-cyan-500/30 text-cyan-200 font-semibold hover:bg-cyan-500/10 hover:text-white transition-all duration-200 text-sm backdrop-blur-md"
            >
              Contact Me
            </a>
          </div>
        </section>

        <section id="about" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <User size={20} />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                About Me
              </h2>

              <p className="text-xs text-cyan-300/60">
                Background & perspective
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 bg-[#0a1628]/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-cyan-500/30 transition">
            <div className="md:col-span-2 space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base flex flex-col justify-center">
              <p>
                I am a dedicated developer focused on building interactive,
                functional, and efficient web platforms. My approach blends
                technical structure with clean visual aesthetics to deliver
                seamless user experiences.
              </p>

              <p>
                Continuously exploring modern UI frameworks and optimization
                patterns, I aim to create codebases that are both scalable and
                maintainable.
              </p>
            </div>

            <div className="bg-[#050b14]/70 border border-cyan-500/20 rounded-2xl p-5 flex flex-col justify-center gap-4 text-sm backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-cyan-500/15 pb-3">
                <span className="text-slate-400">Based in</span>

                <span className="text-slate-200 font-medium">Gujarat, India</span>
              </div>

              <div className="flex items-center justify-between border-b border-cyan-500/15 pb-3">
                <span className="text-slate-400">Specialty</span>

                <span className="text-cyan-300 font-medium">
                  React / Next.js
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Profile</span>

                <span className="text-teal-300 font-medium">Full Stack Developer</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Code2 size={20} />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Skills & Stack
              </h2>

              <p className="text-xs text-cyan-300/60">
                Technologies I use daily
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[{  name: "HTML5",  icon: Globe,  desc: "Semantic layout",},{  name: "CSS3 / Tailwind",  icon: Layers,  desc: "Utility styling",},{  name: "JavaScript",  icon: Terminal,  desc: "ES6+ logic",},{  name: "React.js",  icon: Cpu,  desc: "Component library",},{  name: "Next.js",  icon: Code2,  desc: "Fullstack framework",},{  name: "Git & GitHub",  icon: ExternalLink,  desc: "Source control",},{  name: "Responsive Design",  icon: Laptop,  desc: "Cross-device UI",},{  name: "REST APIs",  icon: Sparkles,  desc: "Data handling",},
            ].map((skill, index) => {
              const IconComponent = skill.icon;

              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-[#0a1628]/50 border border-cyan-500/15 hover:border-cyan-400/40 hover:bg-[#0a1628]/80 transition-all duration-200 group flex flex-col justify-between shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-200 mb-3">
                    <IconComponent size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-200 text-sm mb-0.5 group-hover:text-cyan-200 transition-colors">
                      {skill.name}
                    </h3>

                    <p className="text-xs text-slate-400">{skill.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
<section id="resume" className="scroll-mt-24 max-w-6xl mx-auto px-4">
  <div className="flex items-center gap-3 mb-5">
    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
      <FileText size={18} />
    </div>
    <div>
      <h2 className="text-xl font-bold tracking-tight text-white leading-none mb-1">
        Resume Overview
      </h2>
      <p className="text-[11px] text-cyan-300/60">
        Education, projects & career objective
      </p>
    </div>
  </div>

  <div className="grid md:grid-cols-2 gap-4">

    <div className="space-y-4 flex flex-col">
    <div className="bg-[#0a1628]/60 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-lg hover:border-cyan-500/40 transition">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-3 pb-2 border-b border-cyan-500/15">
          <GraduationCap size={16} />
          Education
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="relative pl-3 border-l-2 border-cyan-400/60 space-y-1">
            <h3 className="font-semibold text-slate-200 text-xs leading-snug">
              B.Tech - Computer Science & Engineering
            </h3>
            <p className="text-[11px] font-medium text-cyan-300">
              Darshan University
            </p>
            <span className="inline-block px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px]">
              2nd Year · Pursuing
            </span>
            <p className="text-[11px] text-slate-400 leading-normal pt-1">
              Studying full-stack development, backend technologies, databases, software engineering, and system design.
            </p>
          </div>

          <div className="relative pl-3 border-l-2 border-cyan-400/60 space-y-1">
            <h3 className="font-semibold text-slate-200 text-xs">
              10th & 12th
            </h3>
            <p className="text-[11px] font-medium text-cyan-300">
              Secondary & Higher Secondary Education
            </p>
            <p className="text-[11px] text-slate-400">
              S.K.V School - Rajkot
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0a1628]/60 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-lg hover:border-cyan-500/40 transition flex-1">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-3 pb-2 border-b border-cyan-500/15">
          <Laptop size={16} />
          Career Objective & Profile
        </div>

        <div className="space-y-2.5">
          <div className="relative pl-3 border-l-2 border-cyan-400/60">
            <h3 className="font-semibold text-slate-200 text-xs mb-0.5">
              Full Stack Developer
            </h3>
            <p className="text-[11px] text-slate-400 leading-normal">
              Hardworking and responsible B.Tech CSE student at Darshan University, currently pursuing 2nd year and continuously learning new technologies.
            </p>
          </div>

          <div className="relative pl-3 border-l-2 border-cyan-400/60">
            <h3 className="font-semibold text-slate-200 text-xs mb-0.5">
              Strengths
            </h3>
            <p className="text-[11px] text-slate-400 leading-normal">
              Enjoy working with others, managing time effectively, solving problems, and taking on new challenges with a positive attitude.
            </p>
          </div>

          <div className="relative pl-3 border-l-2 border-cyan-400/60">
            <h3 className="font-semibold text-slate-200 text-xs mb-0.5">
              Career Goal
            </h3>
            <p className="text-[11px] text-slate-400 leading-normal">
              Looking to apply full-stack and backend development knowledge to real-world projects while gaining practical experience and improving technical skills.
            </p>
          </div>
        </div>
      </div>

    </div>

    <div className="bg-[#0a1628]/60 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-lg hover:border-cyan-500/40 transition flex flex-col justify-between">
      
      <div>
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-3 pb-2 border-b border-cyan-500/15">
          <Briefcase size={16} />
          Project Experience
        </div>

        <div className="space-y-3.5">
          <div className="relative pl-3 border-l-2 border-cyan-400/60 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-slate-200 text-xs">
                Student Project Management System
              </h3>
              <ExternalLink size={12} className="text-cyan-400/60 shrink-0" />
            </div>
            <p className="text-[10px] font-semibold text-cyan-300 tracking-wide uppercase">
              Full Stack · .NET · React / Next.js
            </p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Developed a system to manage students, projects, tasks, weekly progress, evaluations, and project performance.
            </p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Implemented role-based access, JWT authentication, CRUD operations, task tracking, evaluations, database integration, validation, and REST APIs.
            </p>
          </div>

          <div className="relative pl-3 border-l-2 border-cyan-400/60 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-slate-200 text-xs">
                Service Request Management System
              </h3>
              <ExternalLink size={12} className="text-cyan-400/60 shrink-0" />
            </div>
            <p className="text-[10px] font-semibold text-cyan-300 tracking-wide uppercase">
              Full Stack · Express · React
            </p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Built a platform for ticket creation, tracking, department management, approval workflows, and request resolution.
            </p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Used CRUD operations, role-based authentication, authorization, validation, database design, exception handling, and API integration.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-cyan-500/15">
        <h3 className="font-semibold text-slate-200 text-xs mb-2">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {["C#", ".NET", "ASP.NET Core", "EF Core", "SQL Server", "PostgreSQL", "React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "Express", "REST APIs", "JWT", "Git & GitHub"].map((tech, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-300 text-[10px]">
              {tech}
            </span>
          ))}
        </div>
      </div>

    </div>

  </div>
</section>

        <section id="contact" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Mail size={20} />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Contact Me
              </h2>

              <p className="text-xs text-cyan-300/60">
                Let's connect and discuss
              </p>
            </div>
          </div>

          <div className="max-w-xl mx-auto bg-[#0a1628]/70 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.1)]">
            {status === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(20,184,166,0.2)] animate-pulse">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="text-xl font-bold text-slate-100">
                  Message Delivered!
                </h3>

                <p className="text-slate-400 text-xs max-w-xs mx-auto">
                  Thank you for your message. Dhruvi will review your response
                  shortly.
                </p>

                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-xs font-medium hover:bg-cyan-500/20 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === "error" && (
                  <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300/70 mb-2">
                    Your Name
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.FullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        FullName: e.target.value,
                      })
                    }
                    placeholder="Enter your name"
                    className="w-full bg-[#050b14]/70 border border-cyan-500/20 rounded-2xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300/70 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={formData.Email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Email: e.target.value,
                      })
                    }
                    placeholder="name@example.com"
                    className="w-full bg-[#050b14]/70 border border-cyan-500/20 rounded-2xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300/70 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.Subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Subject: e.target.value,
                      })
                    }
                    placeholder="Enter your subject"
                    className="w-full bg-[#050b14]/70 border border-cyan-500/20 rounded-2xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300/70 mb-2">
                    Your Message
                  </label>

                  <textarea
                    rows={4}
                    required
                    value={formData.Message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Message: e.target.value,
                      })
                    }
                    placeholder="Write your message here..."
                    className="w-full bg-[#050b14]/70 border border-cyan-500/20 rounded-2xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition resize-none text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-500/15 bg-[#03070f] py-8 text-center text-cyan-400/50 text-xs">
        <p>
          © {new Date().getFullYear()} Dhruvi. Built with Next.js & Tailwind
          CSS.
        </p>
      </footer>
    </div>
  );
}
