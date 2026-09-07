export function smoothSculptureProgress(
  current: number,
  target: number,
  deltaSeconds: number,
) {
  const next = current + (target - current) * (1 - Math.exp(-5 * deltaSeconds));
  return Math.abs(target - next) < 0.0001 ? target : next;
}

export function getSculpturePose(progress: number) {
  const arc = Math.sin(progress * Math.PI);

  return {
    rotation: [0.18 * arc, progress * Math.PI, -0.12 * arc] as const,
    position: [
      0.28 * Math.sin((progress * Math.PI) / 2),
      0.18 * progress + 0.26 * arc,
      0.1 * arc,
    ] as const,
  };
}
