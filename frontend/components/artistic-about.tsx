"use client"

import { useState, useEffect } from "react"
import { Github, Twitter, Linkedin, Mail, Code, Server, Cpu, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const skills = [
  { name: "Frontend", icon: Code, level: 90, color: "from-blue-400 to-cyan-400" },
  { name: "Backend", icon: Server, level: 85, color: "from-green-400 to-emerald-400" },
  { name: "DevOps", icon: Cpu, level: 75, color: "from-purple-400 to-pink-400" },
  { name: "Performance", icon: Zap, level: 80, color: "from-yellow-400 to-orange-400" },
]

const codeSnippets = [
  "const passion = 'building things';",
  "function solve(problem) { return coffee + code; }",
  "while(learning) { grow(); }",
  "// TODO: Change the world",
  "export default Developer;",
]

export function ArtisticAbout() {
  const [activeSnippet, setActiveSnippet] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSnippet((prev) => (prev + 1) % codeSnippets.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-400/20 animate-pulse">
                  <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-mono font-bold text-emerald-400">RK</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                  <div className="w-3 h-3 bg-slate-950 rounded-full"></div>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 bg-gradient-to-r from-slate-100 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Gardener
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 font-mono mb-8 max-w-3xl mx-auto leading-relaxed">
              Cultivating code, growing infrastructure, and planting seeds of knowledge in the digital landscape.
            </p>

            {/* Animated code snippet */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-lg p-4 max-w-md mx-auto backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <code className="text-emerald-400 font-mono text-sm">
                {codeSnippets[activeSnippet]}
                <span className="animate-pulse">|</span>
              </code>
            </div>
          </div>

          {/* Skills Garden */}
          <div className="mb-20">
            <h2 className="text-3xl font-mono font-bold text-center mb-12 text-slate-200">
              Skills Growing in My Garden
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={skill.name}
                  className="bg-slate-900/50 border-slate-800/50 hover:border-slate-700/50 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <skill.icon className="w-8 h-8 mx-auto text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <h3 className="font-mono font-semibold text-slate-200 mb-3">{skill.name}</h3>
                    <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${index * 200}ms`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-400">{skill.level}%</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-mono font-bold text-center mb-12 text-slate-200">My Digital Journey</h2>
              <div className="space-y-8">
                <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="prose prose-invert prose-slate max-w-none">
                      <p className="text-lg leading-relaxed text-slate-300 font-mono">
                        Welcome to my digital backyard—a place where curiosity grows into expertise and problems become
                        opportunities for innovation. I'm a developer who believes in the power of understanding systems
                        from the ground up.
                      </p>
                      <p className="text-lg leading-relaxed text-slate-300 font-mono">
                        From crafting pixel-perfect frontends to orchestrating complex infrastructure, I find joy in the
                        entire spectrum of software development. My journey has taken me through the evolving landscape
                        of web technologies, cloud platforms, and DevOps practices.
                      </p>
                      <p className="text-lg leading-relaxed text-slate-300 font-mono">
                        This blog is my way of giving back to the community that taught me so much. Every post is a seed
                        planted for future developers to discover and grow from.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="text-center">
            <h2 className="text-3xl font-mono font-bold mb-8 text-slate-200">Let's Grow Together</h2>
            <p className="text-lg text-slate-400 font-mono mb-8 max-w-2xl mx-auto">
              Whether you want to collaborate on a project, discuss the latest in tech, or just say hello—I'd love to
              connect!
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 hover:border-emerald-400 hover:text-emerald-400 font-mono bg-transparent"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 hover:border-blue-400 hover:text-blue-400 font-mono bg-transparent"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 hover:border-purple-400 hover:text-purple-400 font-mono bg-transparent"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 hover:border-green-400 hover:text-green-400 font-mono bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
