"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

export function RevenueTrendChart({ data }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4bc1d1" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#4bc1d1" stopOpacity={0.03} />
            </linearGradient>
            <linearGradient id="collectionFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2fa9ba" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2fa9ba" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.25} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4bc1d1"
            fill="url(#revenueFill)"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="collections"
            stroke="#2fa9ba"
            fill="url(#collectionFill)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
