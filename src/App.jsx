import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, MessageCircle, Smartphone, BatteryCharging, Signal, Power, Cpu, Wrench, Star, Clock, Award, ChevronRight } from 'lucide-react';

// Router implementation
const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  return React.Children.map(children, child => {
    return React.cloneElement(child, { currentPath });
  });
};

const Route = ({ path, component: Component, currentPath }) => {
  return currentPath === path ? <Component /> : null;
};

const Link = ({ to, children, className = '' }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

// Constants
const COMPANY_NAME = "Best Mobile Care";
const CONTACT_INFO = {
  phone: "+977-9851234567",
  email: "info@bestmobilecare.com",
  facebook: "https://facebook.com/bestmobilecare",
  whatsapp: "+977-9851234567",
  location: "Jadibuti, Narephat Road, Near Pani Padhero, Near NIC ASIA Bank, Kathmandu, Nepal",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113071.57912759307!2d85.21839550093149!3d27.671343979391892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ef35a30083%3A0x5b9ec6dff6891d02!2sBest%20Mobile%20Care%20(BMC)!5e0!3m2!1sne!2snp!4v1769874748332!5m2!1sne!2snp"
};

const TECHNICIAN_INFO = {
  name: "Raju Yadav",
  experience: "19+",
  description: "Expert mobile technician with extensive experience in all types of mobile repairs and advanced chip-level solutions."
};

const SERVICES = [
  {
    id: 1,
    title: "Broken Screen Repair",
    description: "Professional screen replacement for all mobile brands with original quality parts",
    icon: Smartphone,
    offer: "20% OFF on screen replacement",
    features: ["LCD/AMOLED screen replacement", "Touch screen repair", "Display quality assurance", "Same day service available"]
  },
  {
    id: 2,
    title: "Charging Problem",
    description: "Complete charging port repair and battery replacement services",
    icon: BatteryCharging,
    offer: "Free diagnosis",
    features: ["Charging port repair/replacement", "Battery replacement", "Charging IC repair", "Fast charging issues"]
  },
  {
    id: 3,
    title: "Network Problem",
    description: "Expert solutions for all network and connectivity issues",
    icon: Signal,
    offer: "15% OFF",
    features: ["No signal issues", "SIM card not detecting", "WiFi/Bluetooth problems", "Network IC repair"]
  },
  {
    id: 4,
    title: "Mobile Dead Problems",
    description: "Advanced chip-level repairs for all dead mobile issues",
    icon: Power,
    offer: "Free inspection",
    features: ["Water damage repair", "Fall damage repair", "Motherboard fault repair", "Battery problem", "Power IC failure repair"]
  },
  {
    id: 5,
    title: "EMMC/UFS Programming",
    description: "Professional chip programming and data recovery services",
    icon: Cpu,
    offer: "Expert service",
    features: ["F64 programming", "MIPI Tester services", "EasyJTAG programming", "Pragmafix solutions", "Data recovery"]
  },
  {
    id: 6,
    title: "All Other Mobile Problems",
    description: "Complete solution for any mobile issue you face",
    icon: Wrench,
    offer: "Best price guaranteed",
    features: ["Camera issues", "Speaker/Microphone repair", "Button replacement", "Software problems", "Any other issues"]
  }
];

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <Smartphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
              Home
            </Link>
            <a href="#services" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
              Services
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
              Contact
            </a>
            <Link to="/developer" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
              Developer
            </Link>
            <a href={`tel:${CONTACT_INFO.phone}`} className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg">
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block px-4 py-3 text-foreground hover:bg-primary/10 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <a href="#services" className="block px-4 py-3 text-foreground hover:bg-primary/10 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Services
            </a>
            <a href="#about" className="block px-4 py-3 text-foreground hover:bg-primary/10 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              About
            </a>
            <a href="#contact" className="block px-4 py-3 text-foreground hover:bg-primary/10 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </a>
            <Link to="/developer" className="block px-4 py-3 text-foreground hover:bg-primary/10 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Developer
            </Link>
            <a href={`tel:${CONTACT_INFO.phone}`} className="block mx-4 mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-semibold">
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-block mb-6 px-6 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-primary font-semibold text-sm md:text-base">🏆 Nepal's Trusted Mobile Repair Expert</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Professional Mobile
            </span>
            <br />
            <span className="text-foreground">Repair Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Expert technicians with 19+ years of experience. From screen repairs to advanced chip-level solutions - we fix it all with precision and care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="#services" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center group">
              Explore Services
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`tel:${CONTACT_INFO.phone}`} className="w-full sm:w-auto bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary/80 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center">
              <Phone className="mr-2 w-5 h-5" />
              {CONTACT_INFO.phone}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">19+</div>
              <div className="text-sm md:text-base text-muted-foreground">Years Experience</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-sm md:text-base text-muted-foreground">Repairs Done</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm md:text-base text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Our Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive mobile repair solutions with expert care and guaranteed quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>

                <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-primary font-semibold text-sm">{service.offer}</span>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Why Choose Us?
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              At Best Mobile Care, we combine years of expertise with state-of-the-art equipment to provide the best mobile repair services in Kathmandu.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Expert Technician</h3>
                  <p className="text-muted-foreground">{TECHNICIAN_INFO.name} - {TECHNICIAN_INFO.experience} years of experience in mobile repairs and chip-level solutions</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Quick Service</h3>
                  <p className="text-muted-foreground">Same-day repair service available for most issues with quality guaranteed</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Quality Parts</h3>
                  <p className="text-muted-foreground">We use only genuine and high-quality replacement parts for all repairs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up lg:animate-fade-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative bg-card rounded-3xl p-8 border border-border shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                      <Smartphone className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{TECHNICIAN_INFO.name}</h3>
                    <p className="text-primary font-semibold mb-4">{TECHNICIAN_INFO.experience} Years Experience</p>
                    <p className="text-muted-foreground">{TECHNICIAN_INFO.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground">Visit us or reach out for quick support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">{CONTACT_INFO.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">{CONTACT_INFO.email}</p>
                  </div>
                </a>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">{CONTACT_INFO.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center group">
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </a>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center group">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg h-[500px]">
            <iframe 
              src={CONTACT_INFO.mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Best Mobile Care Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">{COMPANY_NAME}</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted mobile repair expert in Kathmandu with 19+ years of experience.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Screen Repair</li>
              <li className="text-muted-foreground">Battery Replacement</li>
              <li className="text-muted-foreground">Water Damage Repair</li>
              <li className="text-muted-foreground">Chip Programming</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 {COMPANY_NAME}. All rights reserved.</p>
          <p className="mt-2">
            Designed by <Link to="/developer" className="text-primary hover:text-accent transition-colors">Fullstack Developer</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const HomePage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
};

// Developer Page
const DeveloperPage = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-2xl animate-fade-in-up">
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-5xl font-bold text-primary-foreground">GPP</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Gobinda Prasad Paudel
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-2">Full Stack Developer</p>
              <p className="text-lg text-primary font-semibold">Best Mobile Care Website Creator</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                <h2 className="font-bold text-lg mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  Email
                </h2>
                <a href="mailto:gobindapaudelofficial@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                 gobindapaudelofficial@gmail.com
                </a>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                <h2 className="font-bold text-lg mb-3 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-primary" />
                  Website
                </h2>
                <a href="https://gobindapoudel.com.np" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  gobindapoudel.com.np
                </a>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                <h2 className="font-bold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </h2>
                <a href="https://github.com/gobinda-prasad-paudel" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  github.com/gobinda-prasad-paudel
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
              <p className="text-foreground leading-relaxed">
                Hello, I am <span className="font-bold text-primary">Gobinda Prasad Paudel</span>. I am a fullstack developer of this site. I specialize in creating modern, responsive, and user-friendly web applications using cutting-edge technologies. Feel free to explore my portfolio at{' '}
                <a href="https://gobindapaudel.com.np" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-accent transition-colors underline">
                  gobindapoudel.com.np
                </a>
                {' '}to see more of my work and projects.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link to="/" className="inline-flex items-center text-primary hover:text-accent transition-colors font-semibold">
                <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Main App Component
export default function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/developer" component={DeveloperPage} />
    </Router>
  );
}
