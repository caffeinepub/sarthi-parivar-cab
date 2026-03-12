import { useCallback, useEffect, useRef, useState } from "react";

interface ClockPickerProps {
  value: string;
  onChange: (value: string) => void;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function parseTimeValue(v: string): {
  hour: number;
  minute: number;
  ampm: "AM" | "PM";
} {
  if (!v) return { hour: 12, minute: 0, ampm: "AM" };
  const parts = v.split(":");
  const h = Number.parseInt(parts[0] || "0", 10);
  const m = Number.parseInt(parts[1] || "0", 10);
  const ampm: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return { hour: hour12, minute: m, ampm };
}

export default function ClockPicker({ value, onChange }: ClockPickerProps) {
  const parsed = parseTimeValue(value);
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [ampm, setAmpm] = useState<"AM" | "PM">(parsed.ampm);
  const [mode, setMode] = useState<"hour" | "minute">("hour");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const emit = useCallback(
    (h: number, m: number, ap: "AM" | "PM") => {
      let h24 = h;
      if (ap === "AM" && h === 12) h24 = 0;
      else if (ap === "PM" && h !== 12) h24 = h + 12;
      onChange(`${pad(h24)}:${pad(m)}`);
    },
    [onChange],
  );

  useEffect(() => {
    const p = parseTimeValue(value);
    setHour(p.hour);
    setMinute(p.minute);
    setAmpm(p.ampm);
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    setTimeout(() => {
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
    }, 10);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  const displayTime = `${pad(hour)}:${pad(minute)} ${ampm}`;
  const radius = 90;
  const cx = 110;
  const cy = 110;
  const size = 220;

  const handleClockInteraction = (
    clientX: number,
    clientY: number,
    svgEl: SVGSVGElement,
  ) => {
    const rect = svgEl.getBoundingClientRect();
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (clientX - rect.left) * scaleX - cx;
    const y = (clientY - rect.top) * scaleY - cy;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const normalAngle = (angle + 360) % 360;
    if (mode === "hour") {
      const h = Math.round(normalAngle / 30) % 12 || 12;
      setHour(h);
      emit(h, minute, ampm);
      setTimeout(() => setMode("minute"), 200);
    } else {
      const m = Math.round(normalAngle / 6) % 60;
      setMinute(m);
      emit(hour, m, ampm);
    }
  };

  const angleRad =
    mode === "hour"
      ? (((hour % 12) / 12) * 360 - 90) * (Math.PI / 180)
      : ((minute / 60) * 360 - 90) * (Math.PI / 180);

  const handX = cx + radius * 0.75 * Math.cos(angleRad);
  const handY = cy + radius * 0.75 * Math.sin(angleRad);

  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minuteNumbers = Array.from({ length: 12 }, (_, i) => i * 5);
  const numbers = mode === "hour" ? hourNumbers : minuteNumbers;

  const ticks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        data-ocid="booking.select"
        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-left flex items-center justify-between hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Clock</title>
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <polyline
              points="12 6 12 12 16 14"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value ? displayTime : "Select time"}
          </span>
        </span>
        <svg
          aria-hidden="true"
          className="w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Open</title>
          <polyline
            points="6 9 12 15 18 9"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-[9999] left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-green-200 p-4 w-72"
          style={{ top: "100%" }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setMode("hour")}
              className={`text-2xl font-bold px-2 py-1 rounded-lg transition-colors ${
                mode === "hour"
                  ? "bg-green-800 text-white"
                  : "text-gray-700 hover:bg-green-50"
              }`}
            >
              {pad(hour)}
            </button>
            <span className="text-2xl font-bold text-gray-400">:</span>
            <button
              type="button"
              onClick={() => setMode("minute")}
              className={`text-2xl font-bold px-2 py-1 rounded-lg transition-colors ${
                mode === "minute"
                  ? "bg-green-800 text-white"
                  : "text-gray-700 hover:bg-green-50"
              }`}
            >
              {pad(minute)}
            </button>
            <div className="flex flex-col ml-2 gap-1">
              <button
                type="button"
                onClick={() => {
                  setAmpm("AM");
                  emit(hour, minute, "AM");
                }}
                className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                  ampm === "AM"
                    ? "bg-green-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-100"
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => {
                  setAmpm("PM");
                  emit(hour, minute, "PM");
                }}
                className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                  ampm === "PM"
                    ? "bg-green-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-100"
                }`}
              >
                PM
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mb-2">
            {mode === "hour" ? "Ghanta chunein" : "Minute chunein"}
          </p>

          {/* biome-ignore lint/a11y/useKeyWithClickEvents: touch clock face */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="w-full cursor-pointer touch-none select-none"
            onClick={(e) =>
              handleClockInteraction(e.clientX, e.clientY, e.currentTarget)
            }
            onTouchEnd={(e) => {
              e.preventDefault();
              const t = e.changedTouches[0];
              handleClockInteraction(t.clientX, t.clientY, e.currentTarget);
            }}
          >
            <title>Clock face</title>
            <circle
              cx={cx}
              cy={cy}
              r={radius + 15}
              fill="#f0fdf4"
              stroke="#bbf7d0"
              strokeWidth="2"
            />
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="white"
              stroke="#15803d"
              strokeWidth="1.5"
            />

            {ticks.map((i) => {
              const a = ((i / 60) * 360 - 90) * (Math.PI / 180);
              const isMajor = i % 5 === 0;
              const r1 = isMajor ? radius - 8 : radius - 4;
              return (
                <line
                  key={`tick-${i}`}
                  x1={cx + r1 * Math.cos(a)}
                  y1={cy + r1 * Math.sin(a)}
                  x2={cx + radius * Math.cos(a)}
                  y2={cy + radius * Math.sin(a)}
                  stroke={isMajor ? "#15803d" : "#86efac"}
                  strokeWidth={isMajor ? 2 : 1}
                />
              );
            })}

            {numbers.map((n, i) => {
              const a = ((i / 12) * 360 - 90) * (Math.PI / 180);
              const r = radius - 20;
              const nx = cx + r * Math.cos(a);
              const ny = cy + r * Math.sin(a);
              const isActive = mode === "hour" ? hour === n : minute === n;
              return (
                <text
                  key={`num-${n}`}
                  x={nx}
                  y={ny}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12"
                  fontWeight={isActive ? "700" : "500"}
                  fill={isActive ? "#15803d" : "#374151"}
                >
                  {mode === "minute" ? pad(n) : n}
                </text>
              );
            })}

            <line
              x1={cx}
              y1={cy}
              x2={handX}
              y2={handY}
              stroke="#15803d"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx={cx} cy={cy} r={5} fill="#15803d" />
            <circle cx={handX} cy={handY} r={8} fill="#15803d" opacity="0.9" />
          </svg>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setMode("hour");
            }}
            className="mt-3 w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-2 rounded-xl transition-colors"
          >
            OK — {displayTime}
          </button>
        </div>
      )}
    </div>
  );
}
