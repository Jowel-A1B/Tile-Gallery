"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }
    setLoading(true);
    try {
      const result = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.photoUrl || undefined,
      });
      if (result?.error) {
        toast.error(result.error.message || "Registration failed.");
      } else {
        toast.success("Account created! Please log in. 🎉");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch (err) {
      toast.error("Google login failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-sm shadow-xl border border-clay/20 overflow-hidden">
          <div className="hero-gradient h-2"></div>

          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-clay rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-display">
                    T
                  </span>
                </div>
                <span className="font-display text-xl font-bold text-slate">
                  Tile<span className="text-clay">Gallery</span>
                </span>
              </Link>
              <h1 className="font-display text-3xl font-bold text-slate">
                Create Account
              </h1>
              <p className="text-slate/50 text-sm mt-1">
                Join the gallery community
              </p>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="btn w-full bg-white border border-base-300 text-slate hover:border-clay rounded-sm mb-6 gap-3"
            >
              {googleLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </button>

            <div className="divider text-slate/30 text-xs">
              or register with email
            </div>

            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate/70 text-xs uppercase tracking-wide">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your Full Name"
                  className="input bg-base-100 border border-base-300 focus:border-clay rounded-sm focus:outline-none text-slate"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate/70 text-xs uppercase tracking-wide">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  className="input bg-base-100 border border-base-300 focus:border-clay rounded-sm focus:outline-none text-slate"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate/70 text-xs uppercase tracking-wide">
                    Photo URL (Optional)
                  </span>
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  autoComplete="photo"
                  placeholder="https://example.com/photo.jpg"
                  className="input bg-base-100 border border-base-300 focus:border-clay rounded-sm focus:outline-none text-slate"
                  value={form.photoUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate/70 text-xs uppercase tracking-wide">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Min 6 characters"
                  className="input bg-base-100 border border-base-300 focus:border-clay rounded-sm focus:outline-none text-slate"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-full bg-slate text-cream hover:bg-clay border-none rounded-sm mt-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-slate/50 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-clay hover:text-terra font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
