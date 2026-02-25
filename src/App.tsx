import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  MessageSquare, 
  Calendar, 
  ChevronRight, 
  X, 
  Send, 
  User, 
  Phone, 
  MapPin, 
  DollarSign, 
  Clock,
  LayoutDashboard,
  LogOut,
  CheckCircle2,
  Filter,
  Download,
  Search
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROPERTIES, COLORS, SOFIA_SYSTEM_PROMPT } from './constants';
import { Property, Lead, ChatMessage } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function App() {
  const [view, setView] = useState<'landing' | 'admin'>('landing');
  const [showChat, setShowChat] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAdminClick={() => setView('admin')} onHomeClick={() => setView('landing')} />
      
      <main className="flex-grow">
        {view === 'landing' ? (
          <>
            <Hero onStartChat={() => setShowChat(true)} />
            <PropertyGallery onSelectProperty={setSelectedProperty} />
          </>
        ) : (
          <AdminPanel 
            isAuthenticated={isAdminAuthenticated} 
            onLogin={() => setIsAdminAuthenticated(true)} 
          />
        )}
      </main>

      <Footer />

      {/* Chatbot Sofia */}
      <AnimatePresence>
        {showChat && (
          <Chatbot onClose={() => setShowChat(false)} />
        )}
      </AnimatePresence>

      {/* Property Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!showChat && view === 'landing' && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-navy text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:bg-navy/90 transition-colors"
        >
          <MessageSquare size={28} />
          <span className="absolute -top-2 -left-2 bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            SOFIA
          </span>
        </motion.button>
      )}
    </div>
  );
}

function Navbar({ onAdminClick, onHomeClick }: { onAdminClick: () => void, onHomeClick: () => void }) {
  return (
    <nav className="sticky top-0 z-50 bg-navy/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={onHomeClick}
      >
        <div className="w-10 h-10 bg-gold rounded-sm flex items-center justify-center text-navy shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <Home size={24} />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-white leading-none">Inmobiliaria</h1>
          <p className="text-[10px] font-sans font-medium text-gold tracking-[0.3em] uppercase">Premium</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-10 text-[11px] font-bold text-white tracking-widest uppercase">
        <button onClick={onHomeClick} className="hover:text-gold transition-colors">Inicio</button>
        <a href="#propiedades" className="hover:text-gold transition-colors">Propiedades</a>
        <button onClick={onAdminClick} className="flex items-center gap-2 px-6 py-2 rounded-sm border border-white/10 hover:bg-white/5 transition-all">
          <LayoutDashboard size={14} className="text-gold" />
          Admin
        </button>
      </div>
    </nav>
  );
}

function Hero({ onStartChat }: { onStartChat: () => void }) {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-navy">
      {/* Background with Luxury Real Estate */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-60"
          alt="Luxury Modern Villa"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Content - Asymmetric Layout */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <p className="text-gold font-sans font-bold text-tracking-widest uppercase text-sm mb-6">
              Exclusividad & Distinción
            </p>
            <h2 className="text-7xl md:text-9xl font-serif font-medium leading-[0.9] text-white mb-8">
              Asegura tu <br />
              <span className="italic font-bold text-gold">Sueño</span>
            </h2>
            <p className="text-xl text-white mb-12 max-w-xl font-normal leading-relaxed">
              Descubra una curaduría de las propiedades más extraordinarias, 
              guiado por la inteligencia de Sofia, su conserje inmobiliario personal.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={onStartChat}
                className="px-10 py-5 bg-gold text-navy font-bold rounded-sm flex items-center gap-3 transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                CONSULTAR CON SOFIA <ChevronRight size={18} />
              </button>
              <a 
                href="#propiedades"
                className="px-10 py-5 bg-transparent text-white font-bold rounded-sm border border-white/30 hover:bg-white/5 transition-all"
              >
                CATÁLOGO PRIVADO
              </a>
            </div>
          </motion.div>

          {/* Sofia Card - Glassmorphism & Floating Effect */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="glass-premium p-8 rounded-sm max-w-sm relative group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/10 blur-3xl rounded-full group-hover:bg-gold/20 transition-all duration-700" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold to-gold-light p-[2px]">
                    <div className="w-full h-full rounded-full bg-navy flex items-center justify-center text-gold">
                      <User size={32} />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-navy rounded-full" />
                </div>
                <div>
                  <p className="text-lg font-serif italic text-white">Sofia</p>
                  <p className="text-xs font-sans text-gold text-tracking-widest uppercase">Asesora Virtual Elite</p>
                </div>
              </div>
              
              <p className="text-white font-normal leading-relaxed italic mb-6">
                "Bienvenido a la excelencia. Permítame asistirle en la búsqueda de su próxima inversión patrimonial."
              </p>
              
              <div className="flex items-center gap-2 text-[10px] font-bold text-gold/60 uppercase tracking-widest">
                <div className="w-8 h-[1px] bg-gold/30" />
                DISPONIBLE 24/7
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        <span className="text-[10px] text-gold/50 tracking-[0.3em] uppercase vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
}

function PropertyGallery({ onSelectProperty }: { onSelectProperty: (p: Property) => void }) {
  return (
    <section id="propiedades" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold font-bold tracking-widest uppercase text-sm mb-2">Nuestro Catálogo</p>
            <h3 className="text-4xl font-display font-bold text-navy">Propiedades Destacadas</h3>
          </div>
          <button className="text-navy font-bold flex items-center gap-1 hover:text-gold transition-colors">
            Ver todas <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROPERTIES.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onSelectProperty(prop)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={prop.image} 
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-navy/80 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase">
                  {prop.type}
                </div>
                <div className="absolute bottom-4 right-4 px-4 py-2 bg-gold text-navy font-bold rounded-lg shadow-lg">
                  {prop.price}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors line-clamp-1">
                  {prop.title}
                </h4>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  {prop.shortDescription}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium border-t pt-4">
                  {prop.beds && <span className="flex items-center gap-1"><User size={14} /> {prop.beds} Rec.</span>}
                  {prop.baths && <span className="flex items-center gap-1"><Home size={14} /> {prop.baths} Baños</span>}
                  {prop.sqft && <span className="flex items-center gap-1"><MapPin size={14} /> {prop.sqft} m²</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyModal({ property, onClose }: { property: Property, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-6xl bg-navy rounded-sm overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] flex flex-col md:flex-row max-h-[90vh] border border-white/5"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 bg-navy/40 hover:bg-navy/80 backdrop-blur-md text-white rounded-sm flex items-center justify-center transition-all border border-white/10"
        >
          <X size={24} />
        </button>
        
        <div className="w-full md:w-3/5 h-64 md:h-auto overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="w-full md:w-2/5 p-10 md:p-16 overflow-y-auto bg-navy">
          <p className="text-gold font-sans font-medium tracking-[0.3em] uppercase text-[10px] mb-6">{property.type} Elite</p>
          <h3 className="text-4xl font-serif font-medium text-white mb-4 leading-tight">{property.title}</h3>
          <div className="flex items-center gap-2 text-slate-400 mb-8">
            <MapPin size={16} className="text-gold" />
            <span className="text-xs font-light tracking-wide">{property.location}</span>
          </div>
          
          <div className="text-5xl font-serif text-gold mb-10">
            {property.price}
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="border border-white/5 p-5 rounded-sm text-center">
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2">Recámaras</p>
              <p className="text-xl font-serif text-white">{property.beds || '-'}</p>
            </div>
            <div className="border border-white/5 p-5 rounded-sm text-center">
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2">Baños</p>
              <p className="text-xl font-serif text-white">{property.baths || '-'}</p>
            </div>
            <div className="border border-white/5 p-5 rounded-sm text-center">
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2">Superficie</p>
              <p className="text-xl font-serif text-white">{property.sqft}m²</p>
            </div>
          </div>
          
          <div className="mb-12">
            <h4 className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-6">Reseña de la Propiedad</h4>
            <p className="text-slate-400 font-light leading-relaxed text-sm">
              {property.description}
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full py-5 bg-gold text-navy font-bold rounded-sm hover:bg-gold-light transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
          >
            SOLICITAR DOSSIER PRIVADO
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Chatbot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy Sofia, tu asesora virtual de Inmobiliaria Premium. Estoy aquí para ayudarte a encontrar la propiedad de tus sueños. ¿Qué tipo de operación buscas hoy? (Venta, Renta o Inversión)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [classification, setClassification] = useState<'HOT' | 'WARM' | 'COLD' | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SOFIA_SYSTEM_PROMPT,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMsg });
      const responseText = result.text;

      // Check for data summary
      const dataMatch = responseText.match(/\[DATA_SUMMARY: (\{.*?\})\]/s);
      
      let cleanText = responseText.replace(/\[DATA_SUMMARY: \{.*?\}\]/s, '').trim();

      setMessages(prev => [...prev, { role: 'model', text: cleanText }]);

      if (dataMatch) {
        const data = JSON.parse(dataMatch[1]);
        await saveLead(data);
        setClassification(data.classification);
        setIsFinished(true);
        if (data.classification === 'HOT' || data.classification === 'WARM') {
          setShowCalendar(true);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un pequeño problema técnico. ¿Podrías repetirme eso?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLead = async (data: any) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error("Save lead error:", error);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 100, opacity: 0, scale: 0.9 }}
      className="fixed bottom-6 right-6 w-full max-w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-100"
    >
      {/* Header */}
      <div className="bg-navy p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
              <User size={20} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-navy rounded-full" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none">Sofia</p>
            <p className="text-[10px] text-slate-300">Asesora Virtual • En línea</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-5 py-3 shadow-sm ${
              m.role === 'user' 
                ? 'bg-gold text-navy rounded-sm rounded-tr-none font-medium' 
                : 'bg-white text-slate-800 rounded-sm rounded-tl-none border border-slate-100'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="chat-bubble-bot flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        {showCalendar && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 rounded-2xl border border-gold/30 shadow-lg"
          >
            <div className="flex items-center gap-2 text-navy font-bold mb-3">
              <Calendar size={18} className="text-gold" />
              Agendar Cita
            </div>
            <p className="text-xs text-slate-500 mb-4">Selecciona un horario disponible para una videollamada o visita:</p>
            <div className="grid grid-cols-2 gap-2">
              {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map(time => (
                <button 
                  key={time}
                  onClick={() => {
                    setMessages(prev => [...prev, { role: 'model', text: `¡Perfecto! Tu cita ha sido agendada para hoy a las ${time}. Un asesor se pondrá en contacto contigo por WhatsApp en breve.` }]);
                    setShowCalendar(false);
                  }}
                  className="py-2 text-xs font-bold text-navy border border-slate-200 rounded-lg hover:bg-gold hover:border-gold transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      {!isFinished ? (
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-grow bg-transparent border-none focus:ring-0 text-sm py-2"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="text-navy disabled:opacity-30 hover:scale-110 transition-transform"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-navy text-white text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <p className="text-sm font-bold mb-1">¡Registro Completado!</p>
          <p className="text-[10px] text-slate-300">Sofia ha guardado tu perfil correctamente.</p>
        </div>
      )}
    </motion.div>
  );
}

function AdminPanel({ isAuthenticated, onLogin }: { isAuthenticated: boolean, onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'HOT' | 'WARM' | 'COLD'>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const fetchLeads = async () => {
    const res = await fetch('/api/leads');
    const data = await res.json();
    setLeads(data);
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    await fetch(`/api/leads/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchLeads();
  };

  const handleExport = () => {
    window.location.href = '/api/leads/export';
  };

  const filteredLeads = leads.filter(l => {
    const matchesFilter = filter === 'ALL' || l.classification === filter;
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                         l.whatsapp.includes(search);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: leads.length,
    hot: leads.filter(l => l.classification === 'HOT').length,
    warm: leads.filter(l => l.classification === 'WARM').length,
    cold: leads.filter(l => l.classification === 'COLD').length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center text-navy mx-auto mb-4">
              <LayoutDashboard size={32} />
            </div>
            <h2 className="text-2xl font-display font-bold text-navy">Panel de Administración</h2>
            <p className="text-slate-500 text-sm">Ingresa tus credenciales para continuar</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Usuario</label>
              <input 
                type="text" 
                defaultValue="admin"
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && password === 'inmobiliaria2024' && onLogin()}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-navy/20 outline-none"
                placeholder="••••••••"
              />
            </div>
            <button 
              onClick={() => password === 'inmobiliaria2024' ? onLogin() : alert('Contraseña incorrecta')}
              className="w-full py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy/90 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-display font-bold text-navy">Gestión de Leads</h2>
          <p className="text-slate-500">Monitorea y califica a tus prospectos en tiempo real.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <Download size={18} /> Exportar CSV
          </button>
          <button 
            onClick={fetchLeads}
            className="px-4 py-2 bg-navy text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-navy/90 transition-colors"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Leads" value={stats.total} color="navy" />
        <StatCard label="🔥 Hot" value={stats.hot} color="rose" />
        <StatCard label="🌤️ Warm" value={stats.warm} color="amber" />
        <StatCard label="❄️ Cold" value={stats.cold} color="blue" />
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl w-full md:w-96">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-sm w-full"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <Filter size={18} className="text-slate-400 mr-2" />
          {(['ALL', 'HOT', 'WARM', 'COLD'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                filter === f ? 'bg-navy text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {f === 'ALL' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-bottom text-xs font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Interés</th>
                <th className="px-6 py-4">Presupuesto</th>
                <th className="px-6 py-4">Plazo</th>
                <th className="px-6 py-4">Clasificación</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-navy font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">{lead.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Phone size={12} /> {lead.whatsapp}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-navy uppercase">{lead.operation} - {lead.propertyType}</p>
                    <p className="text-[10px] text-slate-500">{lead.zone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-emerald-600">{lead.budget}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-600">{lead.timeline}</span>
                  </td>
                  <td className="px-6 py-4">
                    <ClassificationBadge type={lead.classification} />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      lead.status === 'attended' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {lead.status === 'attended' ? 'Atendido' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {lead.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusUpdate(lead.id, 'attended')}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Marcar como atendido"
                      >
                        <CheckCircle2 size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                    No se encontraron leads con los criterios seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  const colors: any = {
    navy: 'bg-navy text-white',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100'
  };
  
  return (
    <div className={`p-6 rounded-2xl border ${colors[color]} shadow-sm`}>
      <p className="text-xs font-bold uppercase opacity-80 mb-1">{label}</p>
      <p className="text-3xl font-display font-bold">{value}</p>
    </div>
  );
}

function ClassificationBadge({ type }: { type: 'HOT' | 'WARM' | 'COLD' }) {
  const styles = {
    HOT: 'bg-rose-100 text-rose-600',
    WARM: 'bg-amber-100 text-amber-600',
    COLD: 'bg-blue-100 text-blue-600'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${styles[type]}`}>
      {type === 'HOT' ? '🔥 HOT' : type === 'WARM' ? '🌤️ WARM' : '❄️ COLD'}
    </span>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-gold">
              <Home size={18} />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold leading-none">Inmobiliaria</h1>
              <p className="text-[10px] font-medium text-gold tracking-widest uppercase">Premium</p>
            </div>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
          
          <p className="text-xs text-slate-500">
            © 2024 Inmobiliaria Premium. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
