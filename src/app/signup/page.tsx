// app/signup/page.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Signup failed");
        return;
      }

      toast.success("Account created successfully! ");
      setTimeout(() => {
        router.push("/login?message=Account created successfully");
      }, 1500);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" />

      <div className="w-full max-w-md">
        {/* Back Button */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-amber-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-4xl font-bold">P</span>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-center text-slate-900 dark:text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10">
            Start building your career path today
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jashwanth Sheri"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jashwanth@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-amber-500/30 transition-all active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            Already have an account?{" "}
            <a href="/login" className="text-amber-600 hover:text-amber-700 dark:text-amber-500 font-medium">
              Sign in
            </a>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          © 2026 PathWise • Made for ambitious Indian students
        </p>
      </div>
    </div>
  );
}