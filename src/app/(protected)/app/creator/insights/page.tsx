"use client";
import { Toast } from "@/components/UIComponents";
import { TrendingUp, Download } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SocialMediaToolkit } from "@/components/social-analytics/SocialMediaToolkit";

const followersData = [
  { month: "Aug", followers: 245000 }, { month: "Sep", followers: 258000 }, { month: "Oct", followers: 264000 }, { month: "Nov", followers: 271000 }, { month: "Dec", followers: 278000 }, { month: "Jan", followers: 284000 },
];
const engagementData = [
  { month: "Aug", rate: 4.2 }, { month: "Sep", rate: 4.5 }, { month: "Oct", rate: 4.1 }, { month: "Nov", rate: 5.0 }, { month: "Dec", rate: 4.6 }, { month: "Jan", rate: 4.8 },
];
const countryData = [
  { name: "India", value: 42 }, { name: "US", value: 28 }, { name: "UK", value: 15 }, { name: "Canada", value: 8 }, { name: "Other", value: 7 },
];
const COLORS = ["#6C3CE1", "#D4E157", "#10B981", "#F59E0B", "#94A3B8"];
const topContent = [
  { title: "Morning Routine That Changed My Life", views: "1.2M", engagement: "6.2%", platform: "Instagram" },
  { title: "5 Min Ab Workout", views: "890K", engagement: "5.1%", platform: "TikTok" },
  { title: "Healthy Meal Prep Sunday", views: "650K", engagement: "4.9%", platform: "Instagram" },
  { title: "My Supplement Stack Explained", views: "420K", engagement: "5.5%", platform: "YouTube" },
];

export default function CreatorInsights() {
  const [toast, setToast] = useState("");
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold">Insights &amp; Analytics</h1><p className="text-gray-500 mt-1">Track your growth and content performance across platforms.</p></div>
        <button onClick={() => setToast("Export feature coming soon!")} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50"><Download className="w-4 h-4" /> Export</button>
      </div>

      <SocialMediaToolkit />

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold mb-4">Followers Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={followersData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="followers" stroke="#6C3CE1" strokeWidth={2.5} dot={{ r: 4 }} /></LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold mb-4">Engagement Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={engagementData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="rate" fill="#D4E157" radius={[6, 6, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold mb-4">Audience by Country</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart><Pie data={countryData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>{countryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">{countryData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} /><span className="text-gray-600">{c.name}</span><span className="font-bold ml-auto">{c.value}%</span></div>
            ))}</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold mb-4">Best Performing Content</h3>
          <div className="space-y-3">{topContent.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">{i + 1}</div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{c.title}</p><p className="text-xs text-gray-400">{c.platform}</p></div>
              <div className="text-right"><p className="text-sm font-bold">{c.views}</p><p className="text-xs text-green-600">{c.engagement}</p></div>
            </div>
          ))}</div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
