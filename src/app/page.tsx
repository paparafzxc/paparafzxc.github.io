"use client";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

// ✅ Generator function for run time scores
const generateRunScoreEntries = (
  start: number,
  scoreStart: number,
  rangeSize: number,
  scoreCount: number
) => {
  return Array.from({ length: scoreCount }, (_, i) => ({
    min: start + i * rangeSize,
    max: start + (i + 1) * rangeSize - 1,
    score: scoreStart - i,
  }));
};

// ✅ Generator function for push-up scores (21 and below)
const generatePushupScoreEntries = (
  topRep: number,
  topScore: number,
  middleRep: number,
  middleScore: number,
  bottomRep: number,
  bottomScore: number
): { min: number; max: number; score: number }[] => {
  const entries: { min: number; max: number; score: number }[] = [];

  // Top score (e.g. 79 = 100)
  entries.push({ min: topRep, max: topRep, score: topScore });

  // Middle range (e.g. 78 to middleRep+1 = 99 to middleScore+1)
  let score = topScore - 1;
  for (let rep = topRep - 1; rep > middleRep; rep--, score--) {
    entries.push({ min: rep, max: rep, score });
  }

  // Exact middle rep (e.g. 58 = 79)
  entries.push({ min: middleRep, max: middleRep, score: middleScore });

  // Bottom tapering from middleRep-1 down to bottomRep
  score = middleScore - 1;
  let rep = middleRep - 1;

  while (rep >= bottomRep && score >= bottomScore) {
    if (rep - 1 >= bottomRep) {
      entries.push({ min: rep - 1, max: rep, score });
      rep -= 2;
    } else {
      entries.push({ min: rep, max: rep, score });
      rep--;
    }
    score--;
  }

  return entries;
};

// ✅ Full run matrix
const runScoreMatrix: {
  [gender: string]: {
    [ageBracket: string]: { min: number; max: number; score: number }[];
  };
} = {
  Male: {
    "21-25": generateRunScoreEntries(548, 100, 16, 51),
    "26-30": generateRunScoreEntries(628, 100, 16, 51),
    "31-35": generateRunScoreEntries(708, 100, 16, 51),
    "36-40": generateRunScoreEntries(788, 100, 16, 51),
    "41-45": generateRunScoreEntries(868, 100, 16, 51),
    "46-50": generateRunScoreEntries(1012, 100, 16, 51),
    "51-55": generateRunScoreEntries(1092, 100, 16, 51),
    "56-60": generateRunScoreEntries(1172, 100, 16, 48),
  },
  Female: {
    "21-25": generateRunScoreEntries(644, 100, 16, 51),
    "26-30": generateRunScoreEntries(724, 100, 16, 51),
    "31-35": generateRunScoreEntries(804, 100, 16, 51),
    "36-40": generateRunScoreEntries(884, 100, 16, 51),
    "41-45": generateRunScoreEntries(964, 100, 16, 51),
    "46-50": generateRunScoreEntries(1108, 100, 16, 51),
    "51-55": generateRunScoreEntries(1188, 100, 16, 51),
    "56-60": generateRunScoreEntries(1268, 100, 16, 48),
  },
};

// ✅ Push-up matrix
const pushupScoreMatrix: {
  [gender: string]: {
    [ageBracket: string]: { min: number; max: number; score: number }[];
  };
} = {
  Male: {
    "21": generatePushupScoreEntries(80, 100, 59, 79, 41, 70),
    "22-26": generatePushupScoreEntries(79, 100, 58, 79, 40, 70),
    "27-31": generatePushupScoreEntries(77, 100, 56, 79, 38, 70),
    "32-36": generatePushupScoreEntries(74, 100, 54, 80, 34, 70),
    "37-41": generatePushupScoreEntries(71, 100, 54, 83, 28, 70),
    "42-46": generatePushupScoreEntries(67, 100, 51, 84, 23, 70),
    "47-51": generatePushupScoreEntries(63, 100, 47, 84, 19, 70),
    "52-56": generatePushupScoreEntries(59, 100, 43, 84, 15, 70),
    "57-61": generatePushupScoreEntries(55, 100, 38, 83, 12, 70),
  },
  Female: {
    "21": generatePushupScoreEntries(64, 100, 45, 81, 23, 70),
    "22-26": generatePushupScoreEntries(62, 100, 43, 81, 21, 70),
    "27-31": generatePushupScoreEntries(59, 100, 39, 80, 19, 70),
    "32-36": generatePushupScoreEntries(55, 100, 33, 78, 17, 70),
    "37-41": generatePushupScoreEntries(49, 100, 23, 74, 15, 70),
    "42-46": generatePushupScoreEntries(44, 100, 15, 71, 13, 70),
    "47-51": generatePushupScoreEntries(39, 100, 12, 70, 11, 69),
    "52-56": generatePushupScoreEntries(34, 100, 11, 70, 10, 69),
    "57-61": generatePushupScoreEntries(26, 100, 9, 70, 8, 69),
  },
};

// ✅ Sit-up matrix
const situpScoreMatrix: {
  [gender: string]: {
    [ageBracket: string]: { min: number; max: number; score: number }[];
  };
} = {
  Male: {
    "21": generatePushupScoreEntries(81, 100, 57, 76, 45, 70),
    "22-26": generatePushupScoreEntries(83, 100, 60, 77, 46, 70),
    "27-31": generatePushupScoreEntries(85, 100, 63, 78, 47, 70),
    "32-36": generatePushupScoreEntries(82, 100, 61, 79, 43, 70),
    "37-41": generatePushupScoreEntries(79, 100, 61, 82, 37, 70),
    "42-46": generatePushupScoreEntries(76, 100, 62, 86, 30, 70),
    "47-51": generatePushupScoreEntries(73, 100, 62, 89, 24, 70),
    "52-56": generatePushupScoreEntries(71, 100, 63, 92, 19, 70),
    "57-61": generatePushupScoreEntries(69, 100, 64, 95, 14, 70),
  },
  Female: {
    "21": generatePushupScoreEntries(78, 100, 64, 86, 32, 70),
    "22-26": generatePushupScoreEntries(80, 100, 62, 87, 33, 70),
    "27-31": generatePushupScoreEntries(82, 100, 70, 88, 34, 70),
    "32-36": generatePushupScoreEntries(76, 100, 61, 85, 31, 70),
    "37-41": generatePushupScoreEntries(70, 100, 54, 84, 26, 70),
    "42-46": generatePushupScoreEntries(64, 100, 48, 84, 20, 70),
    "47-51": generatePushupScoreEntries(58, 100, 41, 83, 15, 70),
    "52-56": generatePushupScoreEntries(52, 100, 33, 81, 11, 70),
    "57-61": generatePushupScoreEntries(46, 100, 25, 79, 8, 70),
  },
};



export default function Home() {
  const [age, setAge] = useState(21);
  const [gender, setGender] = useState("Male");
  const [runSecondsTotal, setRunSecondsTotal] = useState(0);
  const [pushups, setPushups] = useState(0);
  const [scores, setScores] = useState({ run: 0, pushups: 0, situps: 0 });
  const [situps, setSitups] = useState(0);

  const getAgeBracket = (age: number): string => {
    if (age >= 21 && age <= 25) return "21-25";
    if (age >= 26 && age <= 30) return "26-30";
    if (age >= 31 && age <= 35) return "31-35";
    if (age >= 36 && age <= 40) return "36-40";
    if (age >= 41 && age <= 45) return "41-45";
    if (age >= 46 && age <= 50) return "46-50";
    if (age >= 51 && age <= 55) return "51-55";
    if (age >= 56 && age <= 60) return "56-60";
    return "21-25";
  };

  const getPushupAgeBracket = (age: number): string => {
    if (age === 21) return "21";
    if (age >= 22 && age <= 26) return "22-26";
    if (age >= 27 && age <= 31) return "27-31";
    if (age >= 32 && age <= 36) return "32-36";
    if (age >= 37 && age <= 41) return "37-41";
    if (age >= 42 && age <= 46) return "42-46";
    if (age >= 47 && age <= 51) return "47-51";
    if (age >= 52 && age <= 56) return "52-56";
    if (age >= 57 && age <= 61) return "57-61";
    // Add more if needed
    return "21"; // fallback
  };

  const getSitupAgeBracket = (age: number): string => {
    return getPushupAgeBracket(age);
  };

  const ageBracket = getAgeBracket(age);
  const runScoreList = runScoreMatrix[gender]?.[ageBracket] ?? [];
  const pushupScoreList = pushupScoreMatrix[gender]?.[ageBracket] ?? [];

  const minRunTime = runScoreList.length > 0 ? runScoreList[0].min : 0;
  const maxRunTime = runScoreList.length > 0 ? runScoreList[runScoreList.length - 1].max : 2000;

  const minPushup = pushupScoreList.length > 0 ? pushupScoreList[pushupScoreList.length - 1].min : 0;
  const maxPushup = pushupScoreList.length > 0 ? pushupScoreList[0].max : 100;

  const situpAgeBracket = getSitupAgeBracket(age);
  const situpScoreList = situpScoreMatrix[gender]?.[situpAgeBracket] ?? [];
  const minSitup = situpScoreList.length > 0 ? situpScoreList[situpScoreList.length - 1].min : 0;
  const maxSitup = situpScoreList.length > 0 ? situpScoreList[0].max : 100;

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const runAgeBracket = getAgeBracket(age);
    const pushupAgeBracket = getPushupAgeBracket(age);
    const situpAgeBracket = getSitupAgeBracket(age);

    const runScoreList = runScoreMatrix[gender]?.[runAgeBracket] ?? [];
    const pushupScoreList = pushupScoreMatrix[gender]?.[pushupAgeBracket] ?? [];
    const situpScoreList = situpScoreMatrix[gender]?.[situpAgeBracket] ?? [];

    const runMatch = runScoreList.find(
      (r) => runSecondsTotal >= r.min && runSecondsTotal <= r.max
    );
    const pushupMatch = pushupScoreList.find(
      (r) => pushups >= r.min && pushups <= r.max
    );
    const situpMatch = situpScoreList.find(
      (r) => situps >= r.min && situps <= r.max
    );

    setScores({
      run: runMatch?.score ?? 0,
      pushups: pushupMatch?.score ?? 0,
      situps: situpMatch?.score ?? 0,
    });

    const runMax = runScoreList.length > 0 ? runScoreList[runScoreList.length - 1].max : 2000;
    if (runSecondsTotal > runMax) setRunSecondsTotal(runMax);

    const maxPushup = pushupScoreList.length > 0 ? pushupScoreList[0].max : 100;
    if (pushups > maxPushup) setPushups(maxPushup);

    const maxSitup = situpScoreList.length > 0 ? situpScoreList[0].max : 100;
    if (situps > maxSitup) setSitups(maxSitup);
  }, [runSecondsTotal, age, gender, pushups, situps]);

  return (
    <main
      className="min-h-screen text-white p-4 flex flex-col items-center justify-center gap-6 bg-cover bg-center font-sans"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <img
          src="/logo.png" // Replace with your actual logo path
          alt="Logo"
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-3xl font-bold text-white">PFT Score Calculator</h1>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-6 bg-white/12 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        {/* Sliders section */}
        <div className="flex-1 grid gap-4">
          {/* Gender Switch */}
          <div className="p-5 border-b border-white/30 flex items-center justify-between animate-fade-in">
            <span className="text-lg font-semibold text-white">Gender: {gender}</span>
            <Switch
              checked={gender === "Male"}
              onChange={(val) => setGender(val ? "Male" : "Female")}
              className={`relative inline-flex h-10 w-28 items-center rounded-full transition-colors
      ${gender === "Male"
                  ? "bg-gradient-to-r from-blue-500 to-green-500"
                  : "bg-gradient-to-r from-pink-500 to-purple-500"
                }`}
            >
              <span className="sr-only">Toggle Gender</span>
              <span
                className={`inline-block h-8 w-8 transform bg-white rounded-full transition-transform
        ${gender === "Male" ? "translate-x-19" : "translate-x-1"}`}
              />
            </Switch>
          </div>

          {/* Age Slider */}
          <div className="p-5 border-b border-white/30 animate-fade-in">
            <div className="flex items-center gap-4">
              <img
                src="/age.png" // Replace with your actual image path
                alt="Running"
                className="w-12 h-12 object-contain"
              />
              <div className="w-full">
                <SliderInput
                  label={`Age (${age})`}
                  value={age}
                  onChange={setAge}
                  min={21}
                  max={60}
                />
              </div>
            </div>
          </div>

          {/* Pushups Slider */}
          <div className="p-5 border-b border-white/30 animate-fade-in">
            <div className="flex items-center gap-4">
              <img
                src="/pushup.png" // Replace with your actual image path
                alt="Running"
                className="w-12 h-12 object-contain"
              />
              <div className="w-full">
                <SliderInput
                  label={`Push-Ups (${pushups} reps)`}
                  value={pushups}
                  onChange={setPushups}
                  min={minPushup}
                  max={maxPushup}
                />
              </div>
            </div>
          </div>

          {/* Situps Slider */}
          <div className="p-5 border-b border-white/30 animate-fade-in">
            <div className="flex items-center gap-4">
              <img
                src="/situp.png" // Replace with your actual image path
                alt="Running"
                className="w-12 h-12 object-contain"
              />
              <div className="w-full">
                <SliderInput
                  label={`Sit-Ups (${situps} reps)`}
                  value={situps}
                  onChange={setSitups}
                  min={minSitup}
                  max={maxSitup}
                />
              </div>
            </div>
          </div>

          <div className="p-5 border-b border-white/30 animate-fade-in">
            <div className="flex items-center gap-4">
              <img
                src="/running.png" // Replace with your actual image path
                alt="Running"
                className="w-12 h-12 object-contain"
              />
              <div className="w-full">
                <SliderInput
                  label={`3.2 km Run Time (${formatTime(runSecondsTotal)})`}
                  value={runSecondsTotal}
                  onChange={setRunSecondsTotal}
                  min={minRunTime}
                  max={maxRunTime}
                  size="lg"
                  hideRangeLabels={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Score Card + Downloads Container */}
        <div className="flex flex-col items-center space-y-4 w-full md:w-[300px]">
          {/* Score Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-full animate-fade-in text-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Scores</h2>
            <div className="space-y-2 divide-y divide-gray-300 text-lg font-medium">
              <p className="pt-2 flex justify-between">
                <span className="font-semibold">Push-Ups:</span>
                <span className={scores.pushups < 70 ? "text-red-500 font-bold" : ""}>
                  {scores.pushups}%
                </span>
              </p>
              <p className="pt-2 flex justify-between">
                <span className="font-semibold">Sit-Ups:</span>
                <span className={scores.situps < 70 ? "text-red-500 font-bold" : ""}>
                  {scores.situps}%
                </span>
              </p>
              <p className="pt-2 flex justify-between">
                <span className="font-semibold">Run:</span>
                 <span className={scores.situps < 70 ? "text-red-500 font-bold" : ""}>
                  {scores.run}%
                </span>
              </p>
              <p className="pt-2 font-bold text-xl text-center">
                Average:
                <span className={`ml-2 ${((scores.run + scores.pushups + scores.situps) / 3) < 70 ? "text-red-500" : ""}`}>
                  {((scores.run + scores.pushups + scores.situps) / 3).toFixed(2)}%
                </span>
              </p>
            </div>
          </div>

          {/* Downloadable References */}
          <div className="text-center space-y-1 text-sm font-normal w-full animate-fade-in">
            <p className="text-white font-medium">Download Reference Files:</p>
            <a
              href="/runmatrix.pdf"
              className="text-yellow-300 hover:underline block"
              download
            >
              📄 3.2km Run Scoring Matrix (PDF)
            </a>
            <a
              href="/situpmatrix.jpg"
              className="text-yellow-300 hover:underline block"
              download
            >
              📄 Sit-Up Scoring Matrix (JPG)
            </a>
            <a
              href="/pushupmatrix.jpg"
              className="text-yellow-300 hover:underline block"
              download
            >
              📄 Push-Up Scoring Matrix (JPG)
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}

// 🔧 Reusable slider input
function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  size = "md",
  hideRangeLabels = false,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  size?: "sm" | "md" | "lg";
  hideRangeLabels?: boolean;
}) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div>
      <label className={`font-semibold text-white ${sizeClasses[size]}`}>
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-4 rounded-lg appearance-none"
        style={{
          background: `linear-gradient(to right, rgb(236, 182, 4) 0%, rgb(122, 201, 20) ${(100 * (value - min)) / (max - min)}%, #d1d5db ${(100 * (value - min)) / (max - min)}%, #d1d5db 100%)`,
        }}
      />

      <style jsx>{`
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 20px;
      width: 40px;
      border-radius: 9999px;
      background-color:rgb(8, 53, 39);
      cursor: pointer;
      margin-top: -6px; /* 👈 perfectly centers on 8px track */
      border: 2px solid white;
    }

    input[type="range"]::-moz-range-thumb {
      height: 20px;
      width: 40px;
      border-radius: 9999px;
      background-color: rgb(8, 53, 39);
      cursor: pointer;
      border: 2px solid white;
    }

    input[type="range"]::-webkit-slider-runnable-track {
      height: 8px;
      border-radius: 9999px;
      background: transparent;
    }

    input[type="range"]::-moz-range-track {
      height: 8px;
      border-radius: 9999px;
      background: transparent;
    }
  `}</style>

      {!hideRangeLabels && (
        <div className="text-xs text-white flex justify-between">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
