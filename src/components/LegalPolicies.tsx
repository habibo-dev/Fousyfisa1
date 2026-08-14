import { useLang } from '../hooks/useLang';

export default function LegalPolicies() {
  const { lang } = useLang();
  const copy = lang === 'ar'
    ? {
        title: 'المعلومات القانونية',
        privacy: ['سياسة الخصوصية', 'نستخدم بيانات الاتصال التي ترسلها لنا فقط للرد على طلبك وتجهيز عرض السفر. لا نبيع بياناتك أو نشاركها لأغراض إعلانية.'],
        terms: ['شروط الحجز', 'إرسال طلب عبر الموقع أو واتساب لا يُعد حجزاً نهائياً. يصبح الحجز مؤكداً فقط بعد تأكيد الوكالة كتابياً واستكمال متطلبات الرحلة والدفع المتفق عليه.'],
        cancellation: ['سياسة الإلغاء', 'تعتمد شروط الاسترجاع أو التعديل على مزود الخدمة وتاريخ الطلب. تواصل معنا قبل أي تغيير لنوضح لك الشروط والتكاليف المطبقة على رحلتك.'],
      }
    : lang === 'fr'
      ? {
          title: 'Informations légales',
          privacy: ['Confidentialité', 'Nous utilisons vos coordonnées uniquement pour répondre à votre demande et préparer votre offre. Nous ne vendons pas vos données.'],
          terms: ['Conditions de réservation', 'Une demande envoyée via le site ou WhatsApp ne constitue pas une réservation définitive. La réservation est confirmée après accord écrit de l’agence.'],
          cancellation: ['Annulation', 'Les conditions de modification et de remboursement dépendent du prestataire et de la date de demande. Contactez-nous avant toute modification.'],
        }
      : {
          title: 'Legal information',
          privacy: ['Privacy Policy', 'We use the contact details you provide only to respond to your request and prepare your travel offer. We do not sell your data.'],
          terms: ['Booking Terms', 'A request sent through this website or WhatsApp is not a final booking. A booking is confirmed only after written confirmation from the agency.'],
          cancellation: ['Cancellation Policy', 'Changes and refunds depend on the service provider and request date. Please contact us before making any change.'],
        };
  const policies = [
    { id: 'privacy-policy', content: copy.privacy },
    { id: 'booking-terms', content: copy.terms },
    { id: 'cancellation-policy', content: copy.cancellation },
  ];

  return <section className="border-t border-gray-100 bg-gray-50 py-14" aria-labelledby="legal-title">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 id="legal-title" className="mb-7 text-center text-2xl font-bold text-navy-900">{copy.title}</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {policies.map(({ id, content }) => <article key={id} id={id} className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-2 text-base font-bold text-navy-900">{content[0]}</h3>
          <p className="text-sm leading-7 text-gray-600">{content[1]}</p>
        </article>)}
      </div>
    </div>
  </section>;
}
