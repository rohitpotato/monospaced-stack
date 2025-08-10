import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tocItems = [
  { id: 1, title: "A Packet's Journey Begins—Entering the Cluster", level: 1 },
  { id: 2, title: "Navigating with Services—Stable Addresses for Packets", level: 1 },
  { id: 3, title: "Finding the Way—DNS Resolution with CoreDNS", level: 1 },
  { id: 4, title: "How Packets Travel—NAT and Veth Pairs", level: 1 },
  { id: 5, title: "Crossing Nodes—VXLAN Overlays with Flannel", level: 1 },
  { id: 6, title: "Securing the Path—Network Policies", level: 1 },
  { id: 7, title: "Upgrading with Cilium", level: 1 },
  { id: 8, title: "The Packet's Lesson", level: 0 },
  { id: 9, title: "Try This", level: 0 },
]

export function TableOfContents() {
  return (
    <Card className="bg-slate-900/50 border-slate-800/50 sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-mono text-slate-300">The journey of a packet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#step-${item.id}`}
            className={`block text-sm font-mono transition-colors hover:text-emerald-400 py-2 px-3 rounded-md hover:bg-slate-800/50 ${
              item.level === 0 ? "text-slate-300 font-semibold" : "text-slate-400 pl-6"
            }`}
          >
            {item.level === 1 && <span className="text-emerald-400 mr-2">Step {item.id}:</span>}
            {item.title}
          </a>
        ))}
      </CardContent>
    </Card>
  )
}
