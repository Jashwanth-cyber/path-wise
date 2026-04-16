'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";   

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

      toast.success("Account created successfully!");
      setTimeout(() => {
        router.push("/login?message=Account created successfully");
      }, 1500);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignup = () => {
    setGoogleLoading(true);
    signIn("google", { 
      callbackUrl: "/",     
      redirect: true 
    }).catch((error) => {
      console.error("Google sign in error:", error);
      toast.error("Failed to sign up with Google. Please try again.");
      setGoogleLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#1c0f14] flex items-center justify-center px-6 py-12 transition-colors duration-300">
      <Toaster position="top-center" />

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#2b131c] rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none p-10 border border-zinc-200 dark:border-rose-900/30">
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20">
              <span className="text-white text-4xl font-bold">P</span>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-center text-zinc-900 dark:text-rose-50 mb-2">
            Create Your Account
          </h1>
          <p className="text-zinc-500 dark:text-rose-200/60 text-center mb-10">
            Start building your career path today
          </p>

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1c0f14] border border-zinc-300 dark:border-rose-800/50 hover:bg-zinc-50 dark:hover:bg-[#240f17] hover:border-zinc-400 dark:hover:border-rose-700 text-zinc-700 dark:text-rose-100 font-medium py-4 rounded-2xl mb-8 transition-all active:scale-[0.985] disabled:opacity-70"
          >
            {googleLoading ? (
              "Connecting to Google..."
            ) : (
              <>
                <img 
                  src="https://authjs.dev/img/providers/google.svg" 
                  alt="Google" 
                  className="w-5 h-5"
                />
                Sign up with Google
              </>
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-rose-900/40"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-[#2b131c] px-4 text-zinc-500 dark:text-rose-200/50">
                OR
              </span>
            </div>
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-rose-100/90 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jashwanth Sheri"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-rose-900/50 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-zinc-50 dark:bg-[#1c0f14] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-rose-200/30 transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-rose-100/90 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jashwanth@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-rose-900/50 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-zinc-50 dark:bg-[#1c0f14] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-rose-200/30 transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-rose-100/90 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-rose-900/50 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-zinc-50 dark:bg-[#1c0f14] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-rose-200/30 transition-shadow pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-rose-200/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-rose-500/30 transition-all active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 dark:text-rose-200/60 mt-8">
            Already have an account?{" "}
            <a href="/login" className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>

        <p className="text-center text-xs text-zinc-400 dark:text-rose-200/40 mt-8">
          © 2026 PathWise • Made for ambitious Indian students
        </p>
      </div>
    </div>
  );
}