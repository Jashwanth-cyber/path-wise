'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const callbackUrl = "/";

    // 🔐 Email/Password Login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");


        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl,
        });

        if (result?.error) {
            setError("Invalid email or password");
            toast.error("Invalid email or password");
        } else if (result?.ok) {
            toast.success(`Welcome back, ${email.split("@")[0]}!`, { duration: 2000 });
            router.push(callbackUrl);
            router.refresh();
        }

        setLoading(false);


    };

    // 🔗 Google Login
    const handleGoogleLogin = () => {
        setGoogleLoading(true);


        signIn("google", {
            callbackUrl: "/",
            redirect: true,
        }).catch(() => {
            toast.error("Failed to sign in with Google");
            setGoogleLoading(false);
        });


    };

    return (<div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex items-center justify-center px-6 py-12"> <Toaster position="top-center" />

        <div className="w-full max-w-md">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 border border-slate-100 dark:border-slate-800">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-amber-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">P</span>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-semibold text-center text-slate-900 dark:text-white mb-2">
                    Welcome Back
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
                    Sign in to continue your career journey
                </p>

                {/* 🔗 Google Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 font-medium py-4 rounded-2xl mb-6 transition-all active:scale-[0.985] disabled:opacity-70"
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
                            Sign in with Google
                        </>
                    )}
                </button>

                {/* OR Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white dark:bg-slate-900 px-4 text-slate-500 dark:text-slate-400">
                            OR
                        </span>
                    </div>
                </div>

                {/* 🔐 Email Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-800 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-amber-500/30 transition-all active:scale-[0.985] disabled:opacity-70"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
                    New to PathWise?{" "}
                    <a
                        href="/signup"
                        className="text-amber-600 hover:text-amber-700 dark:text-amber-500 font-medium"
                    >
                        Create an account
                    </a>
                </p>
            </div>
        </div>
    </div>


    );
}
