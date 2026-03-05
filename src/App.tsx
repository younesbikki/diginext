import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star,
  Zap,
  Instagram,
  X,
  Phone,
  MapPin,
  User,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = ({ onOpenCheckout }: { onOpenCheckout: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-white rounded-xl">
          <img 
            src="https://drive.google.com/thumbnail?id=1KPuA6anpTA8frSSUZPIeRXfwC4hshbpW&sz=w500" 
            alt="Diginext-Store Logo" 
            className="w-8 h-8 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="font-display font-bold text-xl tracking-tight premium-text-gradient">Diginext-Store</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
        <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
        <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
        <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
      </div>
      <button 
        onClick={onOpenCheckout}
        className="premium-gradient text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-95"
      >
        Buy Now
      </button>
    </div>
  </nav>
);

const CheckoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    address: '',
    phone: '',
    email: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Netlify Form Submission
      const netlifyData = new URLSearchParams();
      netlifyData.append('form-name', 'checkout');
      netlifyData.append('name', formData.name);
      netlifyData.append('surname', formData.surname);
      netlifyData.append('email', formData.email);
      netlifyData.append('phone', formData.phone);
      netlifyData.append('address', formData.address);
      netlifyData.append('plan', 'Canva Pro Lifetime');

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyData.toString()
      });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        window.location.href = '/success.html';
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-xl h-fit max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 z-[70] rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Request Sent!</h3>
                <p className="text-slate-400">
                  Your information has been sent to diginextstore@gmail.com. We will contact you shortly to complete your lifetime access.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white font-display">Complete Your Order</h3>
                  <p className="text-slate-400">Please provide your details to get lifetime access.</p>
                </div>

                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                  name="checkout"
                  method="POST"
                  action="/success.html"
                  data-netlify="true"
                >
                  <input type="hidden" name="form-name" value="checkout" />
                  <input type="hidden" name="plan" value="Canva Pro Lifetime" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4" /> Name
                      </label>
                      <input 
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="First Name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4" /> Surname
                      </label>
                      <input 
                        required
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={e => setFormData({...formData, surname: e.target.value})}
                        placeholder="Last Name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone Number
                    </label>
                    <input 
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Address
                    </label>
                    <textarea 
                      required
                      rows={2}
                      name="address"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      placeholder="Your full address"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <button 
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl premium-gradient text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-xl shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Processing...' : 'Confirm Order'}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Pricing = ({ onOpenCheckout }: { onOpenCheckout: () => void }) => {
  return (
    <section id="pricing" className="py-32 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">
            One payment, <span className="premium-text-gradient">lifetime access</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Stop worrying about monthly bills. Get full access to Canva Pro forever with a single one-time payment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-1 md:p-1.5 rounded-[3rem] shadow-2xl shadow-indigo-500/5">
            <div className="bg-slate-900/80 rounded-[2.8rem] p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 premium-gradient text-white text-[10px] font-black px-10 py-2 rotate-45 translate-x-10 translate-y-4 uppercase tracking-[0.2em]">
                Best Value
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-16">
                <div className="max-w-sm">
                  <h3 className="text-3xl font-display font-bold mb-4 text-white">Lifetime Pro Access</h3>
                  <p className="text-slate-400 text-lg">Everything you need to create stunning designs, forever.</p>
                </div>
                <div className="text-left lg:text-right">
                  <div className="flex items-center lg:justify-end gap-3 mb-2">
                    <span className="text-slate-500 line-through text-2xl font-medium">$99.00</span>
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/20">Save 70%</span>
                  </div>
                  <div className="flex items-baseline lg:justify-end gap-2">
                    <span className="text-7xl font-display font-black text-white">$29.99</span>
                  </div>
                  <span className="text-slate-500 block text-sm mt-2 font-medium uppercase tracking-widest">One-time payment</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                <ul className="space-y-5">
                  {['All Pro features included', '1TB Cloud storage', 'Lifetime updates', 'Official account access'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                        <Check className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span className="text-base font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-5">
                  {['Brand Kit Pro', 'Magic AI tools', '24/7 Priority support', 'Full Pro Assets'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                        <Check className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span className="text-base font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={onOpenCheckout}
                className="w-full py-6 rounded-2xl premium-gradient text-white text-xl font-black hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all active:scale-[0.98]"
              >
                Get Lifetime Access Now
              </button>
              
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em]">
                <span>Secure checkout</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full my-auto" />
                <span>Instant delivery</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full my-auto" />
                <span>Lifetime Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => (
  <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-20">
        <div className="flex justify-center gap-1.5 mb-8">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-indigo-400 text-indigo-400" />)}
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 tracking-tight">Trusted by 100M+ creators worldwide</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          {['Google', 'Netflix', 'Spotify', 'Airbnb', 'Slack'].map((brand) => (
            <span key={brand} className="text-2xl font-black tracking-tighter uppercase italic">{brand}</span>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto glass-card p-10 md:p-16 rounded-[3rem] relative">
        <div className="absolute -top-6 -left-6 w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <p className="text-xl md:text-3xl font-medium leading-relaxed mb-12 text-slate-200 tracking-tight">
          "Canva Pro has completely transformed how our marketing team works. The Magic Resizer alone saves us hours every week. It's the best investment we've made for our brand's visual identity."
        </p>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 overflow-hidden border border-slate-700">
            <img src="https://picsum.photos/seed/user1/100/100" alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-lg text-white">Sarah Jenkins</p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Creative Director at DesignFlow</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

interface FAQItemProps {
  question: string;
  answer: string;
  key?: React.Key;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left hover:text-indigo-400 transition-colors group"
      >
        <span className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">{question}</span>
        <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-400 text-lg leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How do I get my login?",
      answer: "After your purchase is confirmed, you'll receive an email with your login credentials and a step-by-step guide to accessing your Canva Pro account immediately."
    },
    {
      question: "Is this the official Canva Pro?",
      answer: "Yes, we provide official Canva Pro subscriptions through our enterprise partnership program, ensuring you get all the features and updates directly from Canva."
    }
  ];

  return (
    <section id="faq" className="py-32 px-4 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-20 text-white tracking-tight">Frequently Asked Questions</h2>
        <div className="glass-card rounded-[3rem] p-8 md:p-12">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Netlify Form Submission
      const netlifyData = new URLSearchParams();
      netlifyData.append('form-name', 'contact');
      netlifyData.append('name', formData.name);
      netlifyData.append('email', formData.email);
      netlifyData.append('message', formData.message);

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyData.toString()
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        window.location.href = '/success.html';
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">Message Sent!</h3>
        <p className="text-slate-400">We've received your message and will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form 
      className="space-y-6" 
      onSubmit={handleSubmit}
      name="contact"
      method="POST"
      action="/success.html"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 ml-1">Name</label>
          <input 
            required
            type="text" 
            name="name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="John Doe"
            className="w-full px-5 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 ml-1">Email</label>
          <input 
            required
            type="email" 
            name="email"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            placeholder="john@example.com"
            className="w-full px-5 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300 ml-1">Message</label>
        <textarea 
          required
          rows={4}
          name="message"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          placeholder="How can we help you?"
          className="w-full px-5 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
        ></textarea>
      </div>
      <button 
        disabled={status === 'submitting'}
        className="w-full py-5 rounded-2xl premium-gradient text-white font-black text-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">Failed to send message. Please try again.</p>
      )}
    </form>
  );
};

const Contact = () => (
  <section id="contact" className="py-32 px-4 bg-slate-950 relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white tracking-tight">Get in <span className="premium-text-gradient">touch</span></h2>
          <p className="text-slate-400 mb-12 text-xl leading-relaxed">
            Have questions about your subscription or need technical support? Our team is here to help you 24/7.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg text-white">Fast Support</p>
                <p className="text-slate-500 font-medium">Response within 2 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg text-white">Email Us</p>
                <p className="text-slate-500 font-medium text-lg">diginextstore@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-400 border border-pink-500/20 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg text-white">Instagram</p>
                <a href="https://instagram.com/diginext_store" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-400 transition-colors font-medium text-lg">@diginext_store</a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[3rem]">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 bg-slate-950 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white rounded-xl">
            <img 
              src="https://drive.google.com/thumbnail?id=1KPuA6anpTA8frSSUZPIeRXfwC4hshbpW&sz=w500" 
              alt="Diginext-Store Logo" 
              className="w-6 h-6 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-display font-bold text-xl tracking-tight premium-text-gradient">Diginext-Store</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-[0.15em] text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
          <a href="https://instagram.com/diginext_store" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
        </div>
      </div>
      <div className="text-center md:text-left pt-10 border-t border-slate-900/50">
        <p className="text-slate-600 text-xs font-medium uppercase tracking-widest">
          © 2024 Diginext-Store. All rights reserved. Crafted for creators.
        </p>
      </div>
    </div>
  </footer>
);

const Hero = ({ onOpenCheckout }: { onOpenCheckout: () => void }) => (
  <section className="pt-32 pb-20 px-4 relative overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </div>

    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-[0.9]">
          Design without <br />
          <span className="premium-text-gradient">boundaries.</span>
        </h1>
        <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          Get full, official Canva Pro access for life. No monthly subscriptions. No hidden fees. Just pure creative freedom.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onOpenCheckout}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl premium-gradient text-white text-lg font-black hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all active:scale-95"
          >
            Claim Lifetime Access
          </button>
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl glass-card">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/avatar${i}/100/100`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm leading-none">10k+ Happy Users</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-indigo-400 text-indigo-400" />)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Feature Badges */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { icon: Zap, label: 'Instant Activation' },
          { icon: Star, label: 'Official Account' },
          { icon: Check, label: 'Pro Features' },
          { icon: User, label: 'Priority Support' }
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl flex flex-col items-center gap-4 hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-slate-300 font-bold text-sm uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16 bg-[#020617]">
      <Navbar onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <Hero onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <Pricing onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <SocialProof />
      <FAQ />
      <Contact />
      <Footer />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
