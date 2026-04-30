'use client'
import React from 'react'
import Title from '@/components/Title'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import HydrationGuard from '@/components/HydrationGuard'

const ContactPage = () => {
    return (
        <HydrationGuard>
            <main className="min-h-screen pt-12 pb-24 px-6 max-w-7xl mx-auto">
                <Title 
                    title="Get in Touch" 
                    description="Have a question or just want to say hello? We'd love to hear from you." 
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-rose-950 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-rose-950/20">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.15),transparent)]"></div>
                            <h2 className="text-2xl font-black italic tracking-tighter mb-6 relative z-10">Contact Information</h2>
                            
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4 group/item">
                                    <div className="size-10 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-xl group-hover/item:bg-rose-600 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Call Us</p>
                                        <p className="text-base font-bold">+1 (555) 000-1234</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group/item">
                                    <div className="size-10 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-xl group-hover/item:bg-rose-600 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Email Us</p>
                                        <p className="text-base font-bold">hello@glowaura.premium</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group/item">
                                    <div className="size-10 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-xl group-hover/item:bg-rose-600 transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Visit Us</p>
                                        <p className="text-base font-bold text-rose-50/90 leading-tight">Luminous St, Radiance District, NY</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-white border border-rose-100/50 shadow-sm">
                            <h3 className="font-black text-lg italic tracking-tighter mb-2">Customer Support</h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Our support team is available Mon - Fri, 9am - 6pm. We respond within 24 hours.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-[2rem] p-8 border border-rose-100/50 shadow-sm">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                                    <input type="text" placeholder="John" className="w-full bg-rose-50/20 border border-rose-100/30 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                                    <input type="text" placeholder="Doe" className="w-full bg-rose-50/20 border border-rose-100/30 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-rose-50/20 border border-rose-100/30 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                                <textarea rows="4" placeholder="How can we help?" className="w-full bg-rose-50/20 border border-rose-100/30 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all font-medium resize-none text-sm"></textarea>
                            </div>
                            <button className="premium-button w-full flex items-center justify-center gap-3 group py-3.5">
                                Send Message
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </HydrationGuard>
    )
}

export default ContactPage
