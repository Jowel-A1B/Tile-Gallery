import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function MyProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  const user = session.user;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-clay text-sm uppercase tracking-[0.3em] mb-2 font-medium">Account</p>
        <h1 className="font-display text-4xl font-bold text-slate">My Profile</h1>
        <div className="w-16 h-0.5 bg-clay mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white border border-clay/20 rounded-sm p-8 text-center shadow-sm">
            <div className="relative inline-block mb-4">
              <div className="w-28 h-28 rounded-full border-4 border-clay overflow-hidden mx-auto">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-clay flex items-center justify-center text-white font-bold text-3xl font-display">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-slate mb-1">{user.name}</h2>
            <p className="text-slate/50 text-sm mb-6">{user.email}</p>
            <Link
              href="/update-profile"
              className="btn btn-sm bg-clay text-white hover:bg-terra border-none rounded-sm w-full"
            >
              ✏️ Update Profile
            </Link>
          </div>
        </div>

        {/* Info Details */}
        <div className="md:col-span-2">
          <div className="bg-white border border-clay/20 rounded-sm shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-base-200 border-b border-clay/20">
              <h3 className="font-display text-lg font-semibold text-slate">Account Details</h3>
            </div>
            <div className="divide-y divide-base-200">
              {[
                { label: 'Full Name', value: user.name || '—' },
                { label: 'Email Address', value: user.email },
                { label: 'User ID', value: user.id },
                { label: 'Account Status', value: user.emailVerified ? 'Verified ✓' : 'Active' },
              ].map((item) => (
                <div key={item.label} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <span className="text-slate/50 text-xs uppercase tracking-wide sm:w-1/3">{item.label}</span>
                  <span className="text-slate font-medium text-sm sm:w-2/3 break-all">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo URL display */}
          {user.image && (
            <div className="bg-white border border-clay/20 rounded-sm shadow-sm mt-6 overflow-hidden">
              <div className="px-6 py-4 bg-base-200 border-b border-clay/20">
                <h3 className="font-display text-lg font-semibold text-slate">Profile Photo</h3>
              </div>
              <div className="px-6 py-4">
                <p className="text-slate/50 text-xs uppercase tracking-wide mb-2">Photo URL</p>
                <p className="text-slate text-sm break-all bg-base-100 p-3 rounded-sm border border-base-300">
                  {user.image}
                </p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white border border-clay/20 rounded-sm shadow-sm mt-6 p-6">
            <h3 className="font-display text-lg font-semibold text-slate mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/all-tiles" className="btn btn-sm btn-outline border-slate text-slate hover:bg-slate hover:text-cream rounded-sm">
                Browse Tiles
              </Link>
              <Link href="/update-profile" className="btn btn-sm bg-clay text-white hover:bg-terra border-none rounded-sm">
                Update Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
