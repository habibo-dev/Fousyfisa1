import { useState } from 'react';
import { useLang } from '../hooks/useLang';
import { getWhatsAppUrl } from '../config';
import { Plane, Hotel, FileText, Moon, MapPin, Calendar, Users, Send } from 'lucide-react';

export default function BookingWidget() {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState(0);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [errors, setErrors] = useState<{ destination?: string; date?: string }>({});
  const [pendingWhatsAppUrl, setPendingWhatsAppUrl] = useState<string | null>(null);
  const today = new Date().toISOString().split('T')[0];

  const messages = lang === 'ar'
    ? { destination: 'يرجى اختيار وجهة السفر.', date: 'يرجى اختيار تاريخ سفر مستقبلي.', ready: 'تم التحقق من طلبك. اضغط متابعة للانتقال إلى واتساب وإرساله.', continue: 'متابعة إلى واتساب', cancel: 'تعديل الطلب' }
    : lang === 'fr'
      ? { destination: 'Veuillez indiquer votre destination.', date: 'Veuillez choisir une date de voyage future.', ready: 'Votre demande est prête. Continuez vers WhatsApp pour l’envoyer.', continue: 'Continuer vers WhatsApp', cancel: 'Modifier la demande' }
      : { destination: 'Please enter your destination.', date: 'Please choose a future travel date.', ready: 'Your request is ready. Continue to WhatsApp to send it.', continue: 'Continue to WhatsApp', cancel: 'Edit request' };

  const tabs = [
    { label: t.booking.organizedTrip, icon: <MapPin className="w-4 h-4" /> },
    { label: t.booking.flight, icon: <Plane className="w-4 h-4" /> },
    { label: t.booking.hotel, icon: <Hotel className="w-4 h-4" /> },
    { label: t.booking.visa, icon: <FileText className="w-4 h-4" /> },
    { label: t.booking.umrah, icon: <Moon className="w-4 h-4" /> },
  ];

  const tabNames: Record<string, Record<number, string>> = {
    ar: { 0: 'رحلة منظمة', 1: 'تذكرة طيران', 2: 'فندق', 3: 'تأشيرة', 4: 'عمرة' },
    fr: { 0: 'Voyage organisé', 1: 'Billet d\'avion', 2: 'Hôtel', 3: 'Visa', 4: 'Omra' },
    en: { 0: 'Organized Trip', 1: 'Flight', 2: 'Hotel', 3: 'Visa', 4: 'Umrah' },
  };

  const handleSubmit = () => {
    const nextErrors: { destination?: string; date?: string } = {};
    if (!destination.trim()) nextErrors.destination = messages.destination;
    if (!date || date < today) nextErrors.date = messages.date;
    setErrors(nextErrors);
    setPendingWhatsAppUrl(null);
    if (Object.keys(nextErrors).length) return;

    const service = tabNames[lang]?.[activeTab] || '';
    const whatsappMessages: Record<string, string> = {
      ar: `السلام عليكم، أريد الاستفسار عن:\nنوع الخدمة: ${service}\nالوجهة: ${destination || 'غير محددة'}\nالتاريخ: ${date || 'غير محدد'}\nعدد المسافرين: ${travelers}`,
      fr: `Bonjour, je souhaite me renseigner sur:\nService: ${service}\nDestination: ${destination || 'Non spécifiée'}\nDate: ${date || 'Non spécifiée'}\nNombre de voyageurs: ${travelers}`,
      en: `Hello, I would like to inquire about:\nService: ${service}\nDestination: ${destination || 'Not specified'}\nDate: ${date || 'Not specified'}\nNumber of travelers: ${travelers}`,
    };
    setPendingWhatsAppUrl(getWhatsAppUrl(whatsappMessages[lang] || whatsappMessages.ar));
  };

  const continueToWhatsApp = () => {
    if (!pendingWhatsAppUrl) return;
    window.open(pendingWhatsAppUrl, '_blank', 'noopener,noreferrer');
    setPendingWhatsAppUrl(null);
  };

  return (
    <section className="relative z-20 -mt-20 sm:-mt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-white/50 overflow-hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/50 scrollbar-none">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 border-b-2 flex-1 justify-center min-w-0 ${
                activeTab === i
                  ? 'border-teal-500 text-teal-700 bg-white'
                  : 'border-transparent text-gray-500 hover:text-teal-600 hover:bg-white/50'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* From */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">{t.booking.from}</label>
              <div className="relative">
                <MapPin className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-teal-500" />
                <input
                  type="text"
                  defaultValue={t.booking.fromDefault}
                  className="w-full ps-10 pe-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">{t.booking.to}</label>
              <div className="relative">
                <MapPin className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-gold-500" />
                <input
                  type="text"
                  placeholder={t.booking.toPlaceholder}
                  value={destination}
                  onChange={(e) => { setDestination(e.target.value); setErrors(current => ({ ...current, destination: undefined })); }}
                  aria-invalid={Boolean(errors.destination)}
                  aria-describedby={errors.destination ? 'booking-destination-error' : undefined}
                  className={`w-full ps-10 pe-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.destination ? 'border-red-400 focus:ring-red-200 focus:border-red-500' : 'border-gray-200 focus:ring-teal-500/30 focus:border-teal-500'}`}
                />
              </div>
              {errors.destination && <p id="booking-destination-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.destination}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">{t.booking.date}</label>
              <div className="relative">
                <Calendar className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-teal-500" />
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => { setDate(e.target.value); setErrors(current => ({ ...current, date: undefined })); }}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'booking-date-error' : undefined}
                  className={`w-full ps-10 pe-4 py-3 bg-gray-50 border rounded-xl text-gray-800 focus:outline-none focus:ring-2 transition-all ${errors.date ? 'border-red-400 focus:ring-red-200 focus:border-red-500' : 'border-gray-200 focus:ring-teal-500/30 focus:border-teal-500'}`}
                />
              </div>
              {errors.date && <p id="booking-date-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.date}</p>}
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">{t.booking.travelers}</label>
              <div className="relative">
                <Users className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-teal-500" />
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full ps-10 pe-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all appearance-none"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                {t.booking.submit}
              </button>
            </div>
          </div>
          <div className="min-h-0" aria-live="polite">
            {pendingWhatsAppUrl && <div className="mt-5 flex flex-col gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium">{messages.ready}</p>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setPendingWhatsAppUrl(null)} className="rounded-lg px-3 py-2 font-semibold text-teal-800 hover:bg-teal-100">{messages.cancel}</button>
                <button type="button" onClick={continueToWhatsApp} className="rounded-lg bg-teal-600 px-3 py-2 font-bold text-white hover:bg-teal-700">{messages.continue}</button>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}
