 "use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Bell,
  MapPin,
  CheckCircle,
  ArrowRightCircle,
  Users,
  Award,
  Clock as ClockIcon,
  Trash,
  UserPlus,
  Send,
  Settings,
  List,
  PieChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// ---- Types ----
type Status = "Pending" | "In Progress" | "Resolved" | "Forwarded";

type Issue = {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO
  lat?: number;
  lng?: number;
  locationLabel?: string;
  status: Status;
  department: string;
  priority: "Low" | "Medium" | "High";
  reporter?: { id: string; name: string };
  photos?: string[]; // urls
  history: { action: string; at: string }[];
  ecoAwarded?: boolean;
};

// ---- Helpers ----
const storageKey = "cc_officer_issues_v1";
const usersKey = "cc_officer_users_v1";
const notifKey = "cc_officer_notifs_v1";

const sampleIssues: Issue[] = [
  {
    id: "I-1001",
    title: "Overflowing garbage at Central Park",
    description:
      "Garbage bins overflowing for 3 days, attracting stray animals and blocking walkway.",
    date: new Date().toISOString(),
    lat: 40.7128,
    lng: -74.006,
    locationLabel: "Central Park, Sector 2",
    status: "Pending",
    department: "Sanitation",
    priority: "High",
    reporter: { id: "u101", name: "Ankit R." },
    photos: [],
    history: [{ action: "Reported", at: new Date().toISOString() }],
  },
  {
    id: "I-1002",
    title: "Streetlight not working",
    description: "One streetlight out on 5th avenue near the bus stop.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    lat: 40.7138,
    lng: -74.005,
    locationLabel: "5th Ave, Sector B",
    status: "In Progress",
    department: "Roads",
    priority: "Medium",
    reporter: { id: "u102", name: "Vaishnavi P." },
    photos: [],
    history: [
      { action: "Reported", at: new Date().toISOString() },
      { action: "Assigned to officer", at: new Date().toISOString() },
    ],
  },
];

const seedUsers = () => {
  const u = {
    u101: { id: "u101", name: "Ankit R.", coins: 12 },
    u102: { id: "u102", name: "Vaishnavi P.", coins: 8 },
    u103: { id: "u103", name: "Kumar S.", coins: 5 },
  };
  return u;
};

function formatDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString();
}

function uid(prefix = "I") {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// --- Component ---
export default function OfficerAdminDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Issue | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [users, setUsers] = useState<Record<string, any>>({});
  const [showMap, setShowMap] = useState(true);
  const [quickActionMsg, setQuickActionMsg] = useState("");

  // Load from localStorage (simulate backend)
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    const uRaw = localStorage.getItem(usersKey);
    const nRaw = localStorage.getItem(notifKey);
    if (uRaw) setUsers(JSON.parse(uRaw));
    else {
      const seeded = seedUsers();
      localStorage.setItem(usersKey, JSON.stringify(seeded));
      setUsers(seeded);
    }

    if (raw) setIssues(JSON.parse(raw));
    else {
      localStorage.setItem(storageKey, JSON.stringify(sampleIssues));
      setIssues(sampleIssues);
    }

    if (nRaw) setNotifications(JSON.parse(nRaw));
    else {
      const n = ["System initialized."];
      localStorage.setItem(notifKey, JSON.stringify(n));
      setNotifications(n);
    }
  }, []);

  // Save to storage whenever issues change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem(usersKey, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(notifKey, JSON.stringify(notifications));
  }, [notifications]);

  // Derived lists
  const departments = useMemo(() => {
    const set = new Set(issues.map((i) => i.department));
    return ["All", ...Array.from(set)];
  }, [issues]);

  const filtered = useMemo(() => {
    return issues
      .filter((it) =>
        departmentFilter === "All" ? true : it.department === departmentFilter
      )
      .filter((it) => (statusFilter === "All" ? true : it.status === statusFilter))
      .filter((it) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          it.title.toLowerCase().includes(q) ||
          (it.description || "").toLowerCase().includes(q) ||
          it.id.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  }, [issues, departmentFilter, statusFilter, query]);

  // Stats
  const stats = useMemo(() => {
    const month = new Date().getMonth();
    const totalThisMonth = issues.filter((i) => new Date(i.date).getMonth() === month).length;
    const resolvedThisMonth = issues.filter(
      (i) => i.status === "Resolved" && new Date(i.date).getMonth() === month
    ).length;

    // average resolution time simple mock: count Resolved items and assume 4 hours avg
    const avgResolution = issues.filter((i) => i.status === "Resolved").length
      ? (4.7).toFixed(1)
      : "-";

    const coinsThisMonth = Object.values(users).reduce((acc: any, u: any) => acc + (u.coins || 0), 0);

    return {
      totalThisMonth,
      resolvedThisMonth,
      avgResolution,
      coinsThisMonth,
    };
  }, [issues, users]);

  const leaderboard = useMemo(() => {
    return Object.values(users).sort((a: any, b: any) => (b.coins || 0) - (a.coins || 0)).slice(0, 8);
  }, [users]);

  // Actions
  function openIssue(issue: Issue) {
    setSelected(issue);
  }

  function closeIssuePanel() {
    setSelected(null);
  }

  function resolveIssue(id: string) {
    setIssues((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              status: "Resolved",
              history: [...it.history, { action: "Resolved by Officer", at: new Date().toISOString() }],
              ecoAwarded: true,
            }
          : it
      )
    );
    // award eco coins
    const issue = issues.find((i) => i.id === id);
    if (issue?.reporter) {
      setUsers((prev) => {
        const copy = { ...prev } as any;
        const uid = issue.reporter!.id;
        if (!copy[uid]) copy[uid] = { id: uid, name: issue.reporter!.name, coins: 0 };
        copy[uid].coins = (copy[uid].coins || 0) + 5; // award 5 coins
        return copy;
      });
    }

    setNotifications((n) => [
      `Issue ${id} resolved — EcoCoins awarded to ${issue?.reporter?.name || "Reporter"}`,
      ...n,
    ]);
  }

  function forwardIssue(id: string) {
    setIssues((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              status: "Forwarded",
              history: [...it.history, { action: "Forwarded to Dept Admin", at: new Date().toISOString() }],
            }
          : it
      )
    );
    setNotifications((n) => [`Issue ${id} forwarded to department admin.`, ...n]);
  }

  function assignToOfficer(id: string, officerName: string) {
    setIssues((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              history: [...it.history, { action: `Assigned to ${officerName}`, at: new Date().toISOString() }],
              status: "In Progress",
            }
          : it
      )
    );
    setNotifications((n) => [`Assigned ${id} to ${officerName}`, ...n]);
  }

  function createMockIssue() {
    const newIssue: Issue = {
      id: uid("I"),
      title: "New reported pothole",
      description: "Pothole causing vehicle damage",
      date: new Date().toISOString(),
      lat: 40.71 + Math.random() * 0.02,
      lng: -74.00 + Math.random() * 0.02,
      locationLabel: "Random street",
      status: "Pending",
      department: ["Sanitation", "Water", "Roads"][Math.floor(Math.random() * 3)],
      priority: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as any,
      reporter: { id: `u${Math.floor(100 + Math.random() * 900)}`, name: "Guest Reporter" },
      photos: [],
      history: [{ action: "Reported", at: new Date().toISOString() }],
    };
    setIssues((p) => [newIssue, ...p]);
    setNotifications((n) => [`New issue ${newIssue.id} reported`, ...n]);
  }

  // Quick action send
  function doQuickAction(action: string) {
    if (!selected) return;
    if (action === "inspect") {
      setIssues((prev) =>
        prev.map((it) =>
          it.id === selected.id
            ? { ...it, history: [...it.history, { action: "Inspection scheduled", at: new Date().toISOString() }] }
            : it
        )
      );
      setNotifications((n) => [`Inspection scheduled for ${selected.id}`, ...n]);
    }
    if (action === "message") {
      setNotifications((n) => [`Appreciation sent to ${selected.reporter?.name || "reporter"}`, ...n]);
    }
    if (action === "assign") {
      assignToOfficer(selected.id, "Officer Rao");
    }
  }

  // Map pin rendering (simple projection)
  function renderMapPins() {
    // we will map lat/lng to percents inside a fixed box using a simple normalization
    const lats = issues.map((i) => i.lat || 0);
    const lngs = issues.map((i) => i.lng || 0);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return issues
      .filter((i) => typeof i.lat === "number")
      .map((it) => {
        const top = maxLat === minLat ? 50 : ((maxLat - (it.lat || 0)) / (maxLat - minLat)) * 90 + 5;
        const left = maxLng === minLng ? 50 : (((it.lng || 0) - minLng) / (maxLng - minLng)) * 90 + 5;
        return (
          <div
            key={it.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer p-1 rounded-full border-2 shadow-md `}
            style={{ top: `${top}%`, left: `${left}%`, zIndex: 50 }}
            onClick={() => openIssue(it)}
            title={`${it.title} — ${it.department} — ${it.status}`}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                it.status === "Resolved" ? "bg-green-500 border-white" : it.status === "Pending" ? "bg-orange-400 border-white" : "bg-red-500 border-white"
              }`}
            />
          </div>
        );
      });
  }

  // Animated class helper
  const anim = "transition-all duration-300 ease-in-out";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 p-4 bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-green-700">Officer Admin — CityConnect</h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-800 text-sm">Eco Theme</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-2 rounded-lg border w-64 outline-none"
              placeholder="Search issues, id, description..."
            />
            <Search className="absolute right-3 top-2 text-gray-400" />
          </div>
          <button
            onClick={() => createMockIssue()}
            className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            title="Simulate new issue"
          >
            + New Issue
          </button>
          <div className="relative">
            <button className="p-2 rounded-lg bg-white border">
              <Bell />
            </button>
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{notifications.length}</span>
            )}
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Left: controls + stats */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold text-gray-700">Quick Actions</h3>
            <p className="text-sm text-gray-500">Assign, message or schedule follow-ups quickly.</p>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  if (!selected) return alert("Select an issue first");
                  assignToOfficer(selected.id, "Officer Rao");
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border hover:shadow"
              >
                <UserPlus /> Assign to Officer
              </button>
              <button
                onClick={() => {
                  if (!selected) return alert("Select an issue first");
                  setNotifications((n) => [`Sent appreciation to ${selected.reporter?.name || "reporter"}`, ...n]);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border hover:shadow"
              >
                <Send /> Send Appreciation
              </button>
              <button
                onClick={() => doQuickAction("inspect")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border hover:shadow"
              >
                <ClockIcon /> Schedule Inspection
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold text-gray-700">Statistics</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="p-3 rounded-lg bg-green-50">
                <div className="text-xs text-gray-500">Reported (this mo.)</div>
                <div className="text-lg font-bold">{stats.totalThisMonth}</div>
              </div>
              <div className="p-3 rounded-lg bg-white border">
                <div className="text-xs text-gray-500">Resolved (this mo.)</div>
                <div className="text-lg font-bold">{stats.resolvedThisMonth}</div>
              </div>
              <div className="p-3 rounded-lg bg-white border">
                <div className="text-xs text-gray-500">Avg resolution</div>
                <div className="text-lg font-bold">{stats.avgResolution} hrs</div>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <div className="text-xs text-gray-500">Coins this mo.</div>
                <div className="text-lg font-bold">{stats.coinsThisMonth}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold text-gray-700 mb-2">EcoCoin Leaderboard</h3>
            <ol className="space-y-2">
              {leaderboard.map((u: any, i) => (
                <li key={u.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-700">{i + 1}</div>
                    <div>
                      <div className="text-sm font-medium">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.coins || 0} coins</div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold text-gray-700">Real-time Notifications</h3>
            <div className="mt-2 space-y-2 max-h-40 overflow-auto text-sm text-gray-600">
              {notifications.map((n, i) => (
                <div key={i} className="p-2 bg-gray-50 rounded">
                  {n}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center: main content */}
        <section className="col-span-12 lg:col-span-6 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex gap-3 items-center">
              <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="px-3 py-2 border rounded">
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded">
                {['All','Pending','In Progress','Forwarded','Resolved'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="text-sm text-gray-500">Showing <strong>{filtered.length}</strong> results</div>
            </div>
            <div className="flex gap-2 items-center">
              <button onClick={() => setShowMap((s) => !s)} className="px-3 py-2 bg-white border rounded hover:shadow">{showMap ? 'Hide' : 'Show'} Map</button>
              <button onClick={() => { setIssues([]); localStorage.removeItem(storageKey); }} className="px-3 py-2 bg-red-50 text-red-600 rounded">Clear All</button>
            </div>
          </div>

          {/* Issue list */}
          <div className="bg-white rounded-2xl p-4 shadow space-y-4">
            <h3 className="font-semibold text-gray-700">Issue Reports</h3>
            <div className="grid grid-cols-1 gap-3">
              {filtered.map((it) => (
                <article key={it.id} className={`flex flex-col md:flex-row p-4 rounded-lg border ${anim} hover:shadow-md`}>
                  <div className="w-full md:w-2/3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{it.title}</h4>
                          <span className="text-xs px-2 py-1 rounded-full text-white" style={{ background: it.priority === 'High' ? '#ef4444' : it.priority === 'Medium' ? '#f59e0b' : '#10b981' }}>{it.priority}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{it.locationLabel} • {formatDate(it.date)}</div>
                        <p className="mt-2 text-sm text-gray-700">{it.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{it.department}</div>
                        <div className="mt-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${it.status === 'Resolved' ? 'bg-green-100 text-green-700' : it.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>{it.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => openIssue(it)} className="px-3 py-2 rounded bg-white border">View</button>
                      <button onClick={() => resolveIssue(it.id)} className="px-3 py-2 rounded bg-green-600 text-white">Resolve</button>
                      <button onClick={() => forwardIssue(it.id)} className="px-3 py-2 rounded bg-yellow-200">Forward</button>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-0 md:w-1/3 flex flex-col items-end">
                    <div className="text-sm text-gray-500">Reported by</div>
                    <div className="font-medium">{it.reporter?.name || 'Anonymous'}</div>

                    <div className="mt-6 flex gap-2">
                      <button onClick={() => assignToOfficer(it.id, 'Officer Rao')} className="px-3 py-2 rounded bg-white border">Assign</button>
                      <button onClick={() => { setSelected(it); doQuickAction('message'); }} className="px-3 py-2 rounded bg-white border">Message</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Right: map + details */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          {/* Map */}
          {showMap && (
            <div className="bg-white rounded-2xl p-3 shadow relative overflow-hidden h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-60" />
              <div className="relative w-full h-full rounded overflow-hidden border">
                {/* Simple mock map - background image or gradient */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=60')] bg-cover bg-center filter blur-sm opacity-30" />
                <div className="relative w-full h-full">
                  {renderMapPins()}
                </div>
              </div>
            </div>
          )}

          {/* Mini stats chart */}
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold">Complaints trend (7d)</h3>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={Array.from({ length: 7 }).map((_, i) => ({ d: i, v: Math.round(Math.random() * 60) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="d" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Selected issue details panel */}
          <div className={`bg-white rounded-2xl p-4 shadow ${anim}`}>
            <h3 className="font-semibold">Issue Details</h3>
            {selected ? (
              <div className="mt-3 text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">ID</div>
                    <div className="font-medium">{selected.id}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Status</div>
                    <div className={`font-medium ${selected.status === 'Resolved' ? 'text-green-600' : 'text-orange-600'}`}>{selected.status}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Title</div>
                  <div className="font-medium">{selected.title}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Reporter</div>
                  <div>{selected.reporter?.name || 'Anonymous'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div>{selected.locationLabel || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">History</div>
                  <ul className="list-disc ml-5 text-sm">
                    {selected.history.map((h, i) => (
                      <li key={i}>{h.action} — {formatDate(h.at)}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-2">
                  <button onClick={() => resolveIssue(selected.id)} className="px-3 py-2 rounded bg-green-600 text-white">Resolve</button>
                  <button onClick={() => forwardIssue(selected.id)} className="px-3 py-2 rounded bg-yellow-200">Forward</button>
                  <button onClick={() => assignToOfficer(selected.id, 'Officer Rao')} className="px-3 py-2 rounded bg-white border">Assign</button>
                </div>

                <div className="mt-3 text-xs text-gray-400">Tip: Use Quick Actions to send messages or schedule inspections.</div>
                <div className="mt-3 flex justify-end">
                  <button onClick={() => closeIssuePanel()} className="text-sm text-gray-500">Close</button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 mt-2">Select an issue to view details. Click map pins or list items.</div>
            )}
          </div>
        </aside>
      </div>

      {/* animated notification bottom-right */}
      <div className="fixed bottom-6 right-6 space-y-2 z-50">
        {notifications.slice(0, 3).map((n, i) => (
          <div key={i} className="bg-white px-4 py-2 rounded-lg shadow-md animate-slide-up">{n}</div>
        ))}
      </div>

      <style jsx>{`
        .animate-slide-up{animation: slideUp .45s ease forwards}
        @keyframes slideUp{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>
    </div>
  );
}