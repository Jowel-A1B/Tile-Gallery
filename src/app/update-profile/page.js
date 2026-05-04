"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", image: "" });

  // ✅ useEffect দিয়ে form pre-fill — infinite re-render হবে না
  useEffect(() => {
    if (session?.user) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  // ✅ Session load না হওয়া পর্যন্ত loader দেখাও
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-clay"></span>
      </div>
    );
  }

  // ✅ Login না থাকলে redirect
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      return toast.error("Name cannot be empty.");
    }
    setLoading(true);
    try {
      const result = await authClient.updateUser({
        name: form.name,
        image: form.image || undefined,
      });
      if (result.error) {
        toast.error(result.error.message || "Update failed.");
      } else {
        toast.success("Profile updated successfully! ✅");
        router.push("/my-profile");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-slate/50 mb-8 flex items-center gap-2">
        <Link href="/my-profile" className="hover:text-clay transition-colors">
          My Profile
        </Link>
        <span>/</span>
        <span className="text-slate">Update Information</span>
      </div>

      <div className="mb-8">
        <p className="text-clay text-sm uppercase tracking-[0.3em] mb-2 font-medium">
          Account
        </p>
        <h1 className="font-display text-4xl font-bold text-slate">
          Update Info
        </h1>
        <div className="w-16 h-0.5 bg-clay mt-4"></div>
      </div>

      <div className="bg-white border border-clay/20 rounded-sm shadow-sm overflow-hidden">
        <div className="hero-gradient h-1.5"></div>
        <div className="p-8">
          {/* Live Preview */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-base-100 rounded-sm border border-base-300">
            <div className="w-16 h-16 rounded-full border-2 border-clay overflow-hidden flex-shrink-0">
              {form.image ? (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <div className="w-full h-full bg-clay flex items-center justify-center text-white font-bold text-xl font-display">
                  {form.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div>
              <p className="font-display font-semibold text-slate">
                {form.name || "Your Name"}
              </p>
              <p className="text-slate/50 text-xs">{session.user.email}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate/70 text-xs uppercase tracking-wide">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="input bg-base-100 border border-base-300 focus:border-clay rounded-sm focus:outline-none text-slate"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Image URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate/70 text-xs uppercase tracking-wide">
                  Photo URL
                </span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input bg-base-100 border border-base-300 focus:border-clay rounded-sm focus:outline-none text-slate"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              <label className="label">
                <span className="label-text-alt text-slate/40">
                  Paste a public image URL
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn flex-1 bg-clay text-white hover:bg-terra border-none rounded-sm"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "✅ Update Information"
                )}
              </button>
              <Link
                href="/my-profile"
                className="btn btn-outline border-slate text-slate rounded-sm hover:bg-slate hover:text-cream"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
