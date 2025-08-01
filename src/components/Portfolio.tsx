'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { 
  Moon, Sun, Menu, X, Github, Linkedin, Mail, Phone, MapPin, 
  Download, ChevronRight, Code, Brain, Database, Award, 
  GraduationCap, Briefcase, User, FolderOpen, Heart, Send,
  ExternalLink, Calendar, Globe
} from 'lucide-react';

const Portfolio = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fonction pour télécharger le CV
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/CV-Mohamed-Amine-MOUMENI.pdf';
    link.download = 'CV-Mohamed-Amine-MOUMENI.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Gérer les changements du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Envoyer l'email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Tentative d\'envoi email...');
      
      // Configuration EmailJS avec vos IDs
      const result = await emailjs.send(
        'service_wsg9iae',     // Votre Service ID
        'template_tzaeeca',    // Votre Template ID
        {
          from_name: formData.nom,
          from_email: formData.email,
          subject: formData.sujet,
          message: formData.message,
        }
      );

      console.log('Résultat EmailJS:', result);

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Erreur envoi email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initialiser EmailJS
    emailjs.init('hH-uCcojsS0TZGweO');
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'education', 'interests', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: User },
    { id: 'about', label: 'À propos', icon: User },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'projects', label: 'Projets', icon: FolderOpen },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'education', label: 'Formation', icon: GraduationCap },
    { id: 'interests', label: 'Centres d&apos;intérêt', icon: Heart },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const experiences = [
    {
      company: "ATOS Casablanca",
      role: "Développeur Full Stack - Stage de fin d&apos;études",
      period: "Mars 2025 - En cours",
      description: "Plateforme d&apos;Intégration avec Mocks API pour la Prise de Commande Unifiée (PCU) (Jordanie, North Africa, Botswana)",
      technologies: ["Java", "JavaScript", "React", "Node.js", "Spring Boot", "Docker", "WireMock"]
    },
    {
      company: "6Solutions Casablanca",
      role: "Développeur Full Stack - Stage",
      period: "Juillet-Sept 2024",
      description: "Développement d&apos;une application pour créer un Smart Parking intelligent",
      technologies: ["Python", "ANPR", "OCR", "OpenCV", "Angular", "Spring Boot", "Docker", "SQL"]
    },
    {
      company: "ONEP Oujda",
      role: "Développeur Backend - Stage",
      period: "Juillet-Août 2023",
      description: "Système de gestion des stocks et ventes",
      technologies: ["Java", "SQL", "Java Swing", "MySQL"]
    }
  ];

  const projects = [
    {
      title: "Portail Marocain Marchés Publics - IA",
      type: "Projet de fin d&apos;études (PFE)",
      description: "Scraping 50+ sites, moteur recommandations IA (92%), chatbot NLP",
      technologies: ["React.js", "Node.js", "MongoDB", "TensorFlow.js", "Redis", "JWT"],
      highlights: ["92% de précision", "50+ sites scrapés", "Chatbot NLP intégré"]
    },
    {
      title: "Reconnaissance Plantes - Deep Learning",
      type: "Projet Fin d&apos;Année (PFA)",
      description: "CNN pour identification espèces végétales, 10000+ espèces",
      technologies: ["Python", "TensorFlow", "CNN", "Flutter", "OpenCV"],
      highlights: ["10000+ espèces", "Vision par ordinateur", "Application mobile"]
    },
    {
      title: "Prédiction Transactions - ML",
      type: "Projet Machine Learning",
      description: "Random Forest + régression linéaire, MAE/RMSE < 5%",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      highlights: ["MAE/RMSE < 5%", "Modèles prédictifs", "Analyse temporelle"]
    },
    {
      title: "LMS avec Reconnaissance Faciale",
      type: "Projet Fin d&apos;Année (PFA)",
      description: "Plateforme complète cours/quiz/paiements",
      technologies: ["Django", "SQLite", "Python", "Bootstrap", "Face Recognition"],
      highlights: ["Reconnaissance faciale", "Système complet", "Gestion utilisateurs"]
    }
  ];

  const skills = {
    "Frontend": ["React", "Angular", "JavaScript", "TypeScript", "Flutter", "HTML/CSS", "Bootstrap", "Tailwind"],
    "Backend": ["Node.js", "Spring Boot", "Django", "Express", "Java", "Python", "PHP"],
    "Database": ["MongoDB", "MySQL", "SQLite", "SQL Server", "Firebase", "Redis"],
    "AI/ML": ["TensorFlow", "Scikit-learn", "OpenCV", "CNN", "Deep Learning", "NLP"],
    "Cloud & DevOps": ["Docker", "Kubernetes", "Azure", "Git", "GitHub", "CI/CD", "WireMock"],
    "Big Data": ["Hadoop", "Spark", "Pandas", "Data Analysis", "ETL"]
  };

  const certifications = [
    "Python Data Analysis (DataCamp, 2024)",
    "Git and GitHub (GitHub, 2024)",
    "Virtual Networks in Azure (Microsoft, 2024)",
    "Docker, Kubernetes & OpenShift (Red Hat, 2024)",
    "React Native (Meta, 2024)",
    "Implementation and Testing (IBM, 2024)",
    "SAP Professional Fundamentals (SAP, 2024)",
    "Neural Networks and Deep Learning (DeepLearning.AI, 2024)",
    "Big Data with Spark and Hadoop (Apache, 2024)"
  ];

  const education = [
    {
      degree: "M2 MBDS (Mobiquité, Big Data, Intégration Systèmes)",
      school: "Université Côte d&apos;Azur, Nice",
      period: "2025-2026",
      status: "RENTRÉE SEPTEMBRE 2025"
    },
    {
      degree: "M2 Intelligence Artificielle (Co-diplomation EMSI & UCA)",
      school: "Rabat & Nice",
      period: "2024-2025"
    },
    {
      degree: "Ingénieur MIAGE Informatique et Réseaux",
      school: "EMSI Rabat",
      period: "2020-2025"
    },
    {
      degree: "Bac Sciences Physiques",
      school: "Lycée Oriental Oujda",
      period: "2019-2020"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Navigation */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-lg ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mohamed Amine MOUMENI
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={toggleMenu}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Photo de profil */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <Image
                    src="/images/profile.jpg"
                    alt="Mohamed Amine MOUMENI"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 animate-pulse"></div>
              </div>
            </div>
            
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Mohamed Amine MOUMENI
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-gray-300">
                Ingénieur <span className="text-blue-400">Full Stack</span> • 
                Spécialiste <span className="text-purple-400">IA</span> • 
                Expert <span className="text-pink-400">Big Data</span>
              </p>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Futur étudiant en M2 MBDS à l&apos;Université Côte d&apos;Azur • En recherche d&apos;alternance dès septembre 2025
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Mail size={20} />
                <span>Me Contacter</span>
              </button>
              <button 
                onClick={downloadCV}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Télécharger CV</span>
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="mailto:aminemoumni61@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <Mail size={24} />
              </a>
              <a href="https://github.com/aminox1?tab=repositories" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-amine-moumeni-598699209/?locale=ar_AE" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              À Propos de Moi
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Ingénieur en développement logiciel et intelligence artificielle, je viens d&apos;obtenir mon diplôme 
                  en ingénierie MIAGE ainsi qu&apos;un Master en Intelligence Artificielle. Passionné par les 
                  technologies innovantes, je maîtrise plusieurs langages de programmation et des frameworks modernes.
                </p>
                <p className="text-lg leading-relaxed">
                  Mes compétences couvrent le développement Full Stack, le Big Data, le Deep Learning, et les outils 
                  comme Hadoop. J&apos;ai mené à bien des projets académiques et professionnels intégrant développement 
                  logiciel, analyse de données massives et vision par ordinateur.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="flex items-center space-x-2">
                    <MapPin size={20} className="text-blue-600" />
                    <span>Antibes, France</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={20} className="text-purple-600" />
                    <span>+212 632-746-536</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe size={20} className="text-pink-600" />
                    <span>Français C1, Anglais B2</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={20} className="text-green-600" />
                    <span>Disponible Sept 2025</span>
                  </div>
                </div>
                
                {/* Bouton CV dans la section À propos */}
                <div className="pt-6">
                  <button 
                    onClick={downloadCV}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <Download size={20} />
                    <span>Télécharger mon CV</span>
                  </button>
                </div>
              </div>
              <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
                
                {/* Photo de profil dans la section À propos */}
                <div className="relative z-10 text-center mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-600/20 shadow-lg mb-4">
                    <Image
                      src="/images/profile.jpg"
                      alt="Mohamed Amine MOUMENI"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">Recherche d&apos;alternance</h3>
                </div>
                
                <div className="relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Code className="text-blue-600" size={24} />
                      <span>Développement Full Stack</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Brain className="text-purple-600" size={24} />
                      <span>Intelligence Artificielle</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="text-pink-600" size={24} />
                      <span>Big Data & Analytics</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg">
                    <p className="font-semibold">Début : Septembre 2025</p>
                    <p className="text-sm opacity-80">M2 MBDS - Université Côte d&apos;Azur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expérience Professionnelle
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-blue-600 mb-1">{exp.company}</h3>
                      <p className="text-lg font-semibold">{exp.role}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm bg-blue-600/20 px-3 py-1 rounded-full">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="mb-4 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projets Académiques
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:shadow-xl transition-all duration-300 group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                      <p className="text-sm text-blue-600 font-medium">{project.type}</p>
                    </div>
                    <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="mb-4 leading-relaxed">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Points clés :</h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-center space-x-2 text-sm">
                          <ChevronRight size={16} className="text-green-500" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-2 py-1 rounded-full text-xs ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Compétences Techniques
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList], index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <h3 className="text-lg font-bold mb-4 text-blue-600">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <span key={skillIndex} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors cursor-default`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Certifications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:shadow-lg transition-all duration-300 flex items-center space-x-3`}>
                  <Award className="text-yellow-500 flex-shrink-0" size={20} />
                  <span className="text-sm leading-tight">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Formation
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium mb-2">{edu.school}</p>
                      {edu.status && (
                        <span className="inline-block px-3 py-1 bg-green-600/20 text-green-600 rounded-full text-sm font-medium">
                          {edu.status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm bg-blue-600/20 px-3 py-1 rounded-full mt-2 lg:mt-0">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Centres d&apos;Intérêt
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} text-center hover:shadow-lg transition-all duration-300`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏊‍♂️</span>
                </div>
                <h3 className="font-bold mb-2">Natation</h3>
                <p className="text-sm">Discipline, gestion du stress</p>
              </div>
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} text-center hover:shadow-lg transition-all duration-300`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-bold mb-2">Lecture</h3>
                <p className="text-sm">Technique/scientifique IA</p>
              </div>
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} text-center hover:shadow-lg transition-all duration-300`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-600/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-bold mb-2">Veille Technologique</h3>
                <p className="text-sm">Nouvelles technologies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Me Contacter
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Restons en contact</h3>
                <p className="text-lg leading-relaxed mb-8">
                  Je suis actuellement à la recherche d&apos;une alternance en développement, IA ou Big Data 
                  pour septembre 2025. N&apos;hésitez pas à me contacter pour discuter d&apos;opportunités !
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <Mail className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:aminemoumni61@gmail.com" className="text-blue-600 hover:underline">
                        aminemoumni61@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-600/20 rounded-lg">
                      <Phone className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <a href="tel:+212632746536" className="text-green-600 hover:underline">
                        +212 632-746-536
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-600/20 rounded-lg">
                      <MapPin className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Localisation</p>
                      <p>19 Av. Maréchal Joffre, 06160 Antibes, France</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="font-semibold mb-3">Retrouvez-moi sur :</p>
                  <div className="flex space-x-4">
                    <a href="https://github.com/aminox1?tab=repositories" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-600/20 hover:bg-gray-600/30 rounded-lg transition-colors">
                      <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/mohamed-amine-moumeni-598699209/?locale=ar_AE" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet</label>
                    <input
                      type="text"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      placeholder="Opportunité d&apos;alternance"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none`}
                      placeholder="Décrivez votre projet ou opportunité..."
                    ></textarea>
                  </div>
                  
                  {/* Messages de statut */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-600/20 text-green-600 rounded-lg text-sm">
                      ✅ Message envoyé avec succès ! Je vous répondrai rapidement.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-600/20 text-red-600 rounded-lg text-sm">
                      ❌ Erreur lors de l&apos;envoi. Veuillez réessayer ou me contacter directement.
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    <Send size={20} />
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-lg font-semibold">
              Mohamed Amine MOUMENI
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ingénieur Full Stack • Spécialiste IA • Expert Big Data
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
              En recherche d&apos;alternance pour septembre 2025
            </p>
            <div className="flex justify-center space-x-6 mt-6">
              <a href="mailto:aminemoumni61@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://github.com/aminox1?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-amine-moumeni-598699209/?locale=ar_AE" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-6`}>
              © 2025 Mohamed Amine MOUMENI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;