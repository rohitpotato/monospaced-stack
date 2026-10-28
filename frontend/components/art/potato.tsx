/** The site's potato: the homelab's napper and the 404's delivery rider. */
export function Potato({ hat = '#a77bd6', asleep = false }: { hat?: string, asleep?: boolean }) {
  return (
    <g>
      <path d="M0 -46 C 34 -48 48 -20 44 10 C 40 40 16 50 -6 48 C -32 46 -46 24 -44 -2 C -42 -28 -26 -45 0 -46Z" fill="#c4935e" />
      <g fill="#9c7046">
        <circle cx={-24} cy={-22} r={2.4} />
        <circle cx={26} cy={22} r={3} />
      </g>
      <g fill="#e38b7a" opacity={0.55}>
        <ellipse cx={-20} cy={10} rx={6} ry={3.5} />
        <ellipse cx={20} cy={10} rx={6} ry={3.5} />
      </g>
      {asleep
        ? <path d="M-17 -4 q5 4 10 0 M7 -4 q5 4 10 0" stroke="#221f1c" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        : (
            <g fill="#221f1c">
              <ellipse cx={-12} cy={-6} rx={4} ry={5} />
              <ellipse cx={12} cy={-6} rx={4} ry={5} />
            </g>
          )}
      {hat && <path d="M-30 -36 Q0 -76 30 -36Z" fill={hat} />}
    </g>
  )
}
