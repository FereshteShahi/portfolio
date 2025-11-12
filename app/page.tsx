"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Download, Send, Linkedin, ExternalLink, Mail, Phone, MapPin, Menu, X, Github } from "lucide-react"

export default function Home() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "work", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      // Reset form
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col dark">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold gradient-text">
            Fereshte Shahi
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "home" ? "text-primary" : "text-muted-foreground"}`}
            >
              Startseite
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "about" ? "text-primary" : "text-muted-foreground"}`}
            >
              Über mich
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "work" ? "text-primary" : "text-muted-foreground"}`}
            >
              Projekte
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "contact" ? "text-primary" : "text-muted-foreground"}`}
            >
              Kontakt
            </button>
            <Button asChild size="sm">
              <a href="/CV_Fereshte-Shahi.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Lebenslauf
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-background border-b border-border py-4 px-4 flex flex-col space-y-4">
            <button onClick={() => scrollToSection("home")} className="text-sm font-medium py-2 hover:text-primary">
              Startseite
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm font-medium py-2 hover:text-primary">
              Über mich
            </button>
            <button onClick={() => scrollToSection("work")} className="text-sm font-medium py-2 hover:text-primary">
              Projekte
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-sm font-medium py-2 hover:text-primary">
              Kontakt
            </button>
            <Button asChild size="sm" className="w-full">
              <a href="/CV_Fereshte-Shahi.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Lebenslauf
              </a>
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Hallo, ich bin  <span className="gradient-text">Fereshte Shahi</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">Front-End-Developer & UX/UI DESIGNER</h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Leidenschaftlich daran interessiert, innovative Weblösungen zu entwickeln, die Funktionalität und Design verbinden.
                  Stets motiviert, neue Technologien zu erlernen und kreative Ideen in moderne, responsive Benutzeroberflächen umzusetzen.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button onClick={() => scrollToSection("about")}>Erfahre mehr über mich</Button>
                  <Button variant="outline" onClick={() => scrollToSection("contact")}>
                    Im Kontakt treten
                  </Button>
                </div>
              </div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src="/CV-Bild_Fereshte-Shahi.jpg"
                  alt="FERESHTE SHAHI"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Über mich Section */}
        <section id="about" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Über mich</h2>

              <div className="space-y-6">
                <p className="text-lg">
                  Engagierte Nachwuchs-Webentwicklerin
                  mit einem Studium in Software Engineering und
                  Weiterbildung im Full-Stack Development
                  an der ReDI School. Praktische Erfahrung
                  mit HTML, CSS, JavaScript, React, Next.js,
                  Tailwind, Node.js und AWS Amplify.
                  Praktikantin bei Witjaw mit Schwerpunkt
                  auf Frontend-Entwicklung und
                  nutzerzentriertem Design.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="gradient-border p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-4">Berufserfahrungen</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Front-End-Developer</h4>
                        <p className="text-sm text-muted-foreground">Witjaw (München) | 06/2025 - 08/2025</p>
                        <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                          <li>Entwicklung und Gestaltung moderner UI-Komponenten mit Figma, React und AWS Amplify UI</li>
                          <li>Umsetzung komplexer Frontend-Funktionalitäten, einschließlichReactFlow-Integrationen</li>
                          <li>Eigenständige Ticketbearbeitung, Code Reviews (Pull Requests) und enge Zusammenarbeit im agilen Team</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">FRONTEND DEVELOPER (PRO-BONO-PROJEKT)</h4>
                        <p className="text-sm text-muted-foreground">Duygu Froehlich (München) | 04/2025 - 07/2025</p>
                        <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                          <li>Konzeption und Gestaltung der professionellen, responsiven Website duygu-freohlich.de zur Präsentation psychologischer Beratungsdienstleistungen</li>
                          <li>Implementierung eines mehrsprachigen Zugangs zur besseren Erreichbarkeit internationaler Klient*innen</li>
                          <li>Fokus auf nutzerfreundliches Design, Barrierefreiheit und klare Informationsstruktur</li>

                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium">BÜROKRAFT (AUSHILFE)</h4>
                        <p className="text-sm text-muted-foreground"> Taxiunternehmen, München | 07/2023 - 05/2025</p>
                        <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                          <li> Durchführung organisatorischer und Allgemeiner Aufgaben als Bürokraft</li>
                          <li>Lohn- und Gehaltsabrechnung</li>
                          <li> Verwaltung von Büroprozessen, Dokumentation</li>

                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="gradient-border p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-4"> BILDUNGSWEG & WEITERBILDUNG</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Deutsche Angestellten Akademie München (DAA)</h4>
                        <p className="text-sm text-muted-foreground mt-1"> Weiterbildende und berufsbegleitende Maßnahme – Jobcoaching, Seit 09 / 2025 - heute                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Full-Stack Development Weiterbildung</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          ReDi School of Digital Integration mit IHK-Zertifikate, Seit 09 / 2024 bis 08 / 2025
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">  Integrations-und Deutschkurse, Volkshochschule (B1-C1 zertifiziert)</h4>
                        <p className="text-xs text-muted-foreground">
                          Git, GitHub, VS Code, Kommandozeile, SQL, Docker, CI/CD, Pipeline, Unit Testing(Jest), Scrum, Jira
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium">Design & UX/UI</h4>
                        <p className="text-xs text-muted-foreground"> Responsive Design, Webdesign-Grundlagen, Figma
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="gradient-border m-auto p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-4">Kenntnisse</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Frontend</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          HTML, CSS, JavaScript, TypeScript, React
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Backend</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Node.js, REST APIs, express.js, Next.js
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium"> DevOps & Tools</h4>
                        <p className="text-xs text-muted-foreground">
                          Git, GitHub, VS Code, Kommandozeile, SQL, Docker, CI/CD, Pipeline, Unit Testing(Jest), Scrum, Jira
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium">Design & UX/UI</h4>
                        <p className="text-xs text-muted-foreground"> Responsive Design, Webdesign-Grundlagen, Figma
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex justify-center pt-6">
                  <Button asChild>
                    <a href="/CV_Fereshte-Shahi.pdf" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
<section id="work" className="py-20">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Projekte</h2>
      <p className="text-lg text-muted-foreground mb-12">
        Hier unten können Sie meine bisherigen Projekte sehen.
      </p>

      {/* --- Projekte Grid --- */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* === Projekt 1: Duygu Fröhlich === */}
        <div className="group relative p-6 rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500">
          <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl border-4 border-primary/20">
            <Image
              src="/duygu-froehlich.jpg"
              alt="Webdesign-Projekt für Psychologin Duygu Fröhlich"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-sm"
              priority
            />

            {/* Overlay mit Buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
              <a
                href="https://www.duygu-froehlich.de"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                Webseite
              </a>
              <a
                href="https://github.com/FereshteShahi/psychologin-froehlich"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
              >
                GitHub Repository
              </a>
            </div>
          </div>
          <p className="text-sm mt-10 text-muted-foreground text-center">
                Eine zweisprachige, responsive und nutzerfreundliche Website, erstellt mit Next.js, TypeScript, Figma, Tailwind, GitHub und EmailJS.
                      </p>
        </div>

        {/* === Projekt 2: Lennart Erschler === */}
        <div className="group relative p-6 rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500">
          <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl border-4 border-primary/20">
            <Image
              src="/lennart-erschler.jpg"
              alt="Künstler-Website Lennart Erschler – Contemporary Art Projekt"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-sm"
              priority
            />

            {/* Overlay mit Buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
              <a
                href="https://www.kunst-artlenn.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                Webseite
              </a>
              <a
                href="https://github.com/FereshteShahi/Kunstprojekt-Lennart-Erschler"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
              >
                GitHub Repository
              </a>
            </div>
          </div>
          <p className="text-sm mt-10 text-muted-foreground text-center">
             Eine responsive und benutzerfreundliche Website mit klarer Struktur und modernem Design.
              Erstellt mit React, HTML und CSS.        
              </p>
        </div>

        {/* === Projekt 3: Reservierungssystem === */}
        <div className="group relative p-6 rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500">
          <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl border-4 border-primary/20">
            <Image
              src="/Reservations System.png"
              alt="Online-Reservierungssystem – Interaktionsdesign Projekt"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-sm"
              priority
            />

            {/* Overlay mit Buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
              <a
                href="https://github.com/FereshteShahi/Booking-System-Backend"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
              >
              GitHub Repository
              </a>
            </div>
          </div>
          <p className="text-sm mt-10 text-muted-foreground text-center">
            Eine moderne Website mit Registrierung und Login, auf der man Termine erstellen, löschen und die Psychologin automatisch per E-Mail informieren kann.
            Erstellt mit Next.js, PostgreSQL, REST APIs, TypeScript, Figma, Tailwind und EmailJS.     
              </p>
        </div>
      </div>

      {/* --- GitHub Section unten --- */}
      <div className="gradient-border p-8 mt-20 bg-card flex flex-col items-center rounded-2xl shadow-md">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <ExternalLink className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-4">
          Meine Repositories auf GitHub ansehen
        </h3>
        <p className="text-muted-foreground mb-8 max-w-md text-center">
          Entdecke auf meinem GitHub meine Projekte in UI/UX-Design und Webentwicklung        </p>
        <Button asChild size="lg">
          <a
            href="https://github.com/FereshteShahi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
          GitHub Profil
          </a>
        </Button>
      </div>
    </div>
  </div>
</section>



        {/* Contact Section */}
        <section id="contact" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center"></h2>Im Kontakt treten

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Kontakt Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-primary" />
                      <a href="mailto:shuaibkarim302@gmail.com" className="text-muted-foreground hover:text-primary">
                        fereshteshahi@outlook.com
                      </a>
                    </div>
              
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-primary" />
                      <span className="text-muted-foreground">München, Deutschland</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-6">Kontakt mich</h3>
                  <div className="flex space-x-4">
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="https://linkedin.com/in/fereshte-shahi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="https://github.com/FereshteShahi"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <a href="mailto:fereshteshahi@outlook.com" aria-label="Email">
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Fereshte Shahi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://linkedin.com/in/fereshte-shahi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/FereshteShahi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                GitHub
              </a>
              <a href="mailto:fereshteshahi@outlook.com" className="text-muted-foreground hover:text-primary">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
