// Edit this file to change a project's card and chip stacks.
// chipCounts follows the same order as languages. Each value can be 1–6.
// chipPositions uses table coordinates: x = left/right, z = back/front.
export const projects = [
  {
    name: "Stalkr",
    rarity: "SSR",
    suit: "♠",
    repo: "Stalkr",
    languages: ["TypeScript", "Go", "JavaScript"],
    chipCounts: [5, 3, 2],
    chipPositions: [
      { x: -1.6, z: -1.1 },
      { x: -0.75, z: 0 },
      { x: -1.45, z: 1.15 },
    ],
  },
  {
    name: "SysPerf",
    rarity: "SR",
    suit: "♣",
    repo: "SysPerf",
    languages: ["Rust", "Go", "Shell"],
    chipCounts: [4, 4, 1],
    chipPositions: [
      { x: -1.4, z: -1.2 },
      { x: -0.65, z: 0 },
      { x: -1.5, z: 1.1 },
    ],
  },
  {
    name: "Planet Portfolio",
    rarity: "EX",
    suit: "♦",
    repo: "3D-Portfolio",
    languages: ["HTML", "JavaScript", "CSS"],
    chipCounts: [2, 5, 3],
    chipPositions: [
      { x: -1.65, z: -1.15 },
      { x: -0.8, z: 0 },
      { x: -1.55, z: 1.1 },
    ],
  },
];
