import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import InquiryFormPreview from '@/components/InquiryFormPreview';

export const metadata = {
  title: 'Contact Us & Get Quote | Jitesh Engineering Works, Boisar, Palghar',
  description: 'Request a quote for VMC machining, metal fabrication, or custom parts. Upload your technical drawings. Located in Boisar, Palghar. Call +91 93233 97961.',
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-steel-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get a Free Quote</h1>
          <p className="text-steel-300 max-w-2xl mx-auto text-lg">
            Send us your requirements or upload technical drawings. We&apos;ll respond with a competitive quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-steel-800">Contact Information</h2>

              <div className="space-y-4">
                <a href="tel:+919323397961" className="flex items-start gap-4 p-4 bg-steel-50 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200">
                    <FiPhone className="text-primary-600" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-steel-800">Call Us</p>
                    <p className="text-primary-600 font-medium">+91 93233 97961</p>
                    <p className="text-primary-600 font-medium">+91 83083 83673</p>
                  </div>
                </a>

                <a href="https://wa.me/918308383673" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-steel-50 rounded-xl hover:bg-green-50 transition-colors group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200">
                    <FaWhatsapp className="text-green-600" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-steel-800">WhatsApp</p>
                    <p className="text-green-600 font-medium">+91 83083 83673</p>
                    <p className="text-steel-500 text-sm">Send drawings instantly</p>
                  </div>
                </a>

                <a href="mailto:jiteshengineeringworks20@gmail.com" className="flex items-start gap-4 p-4 bg-steel-50 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200">
                    <FiMail className="text-primary-600" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-steel-800">Email</p>
                    <p className="text-primary-600 font-medium">jiteshengineeringworks20@gmail.com</p>
                    <p className="text-steel-500 text-sm">For detailed inquiries</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-steel-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-primary-600" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-steel-800">Address</p>
                    <p className="text-steel-600 text-sm">
                      Plot No. W/12, Near Custom Capsule,<br />
                      Camlin Naka, M.I.D.C. Tarapur,<br />
                      Boisar, Dist. Palghar - 401 506,<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-steel-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiClock className="text-primary-600" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-steel-800">Working Hours</p>
                    <p className="text-steel-600 text-sm">
                      Monday - Sunday: 9:00 AM - 9:00 PM<br />
                      Open all days
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                  <p className="font-semibold text-steel-800">Proprietor</p>
                  <p className="text-primary-600 font-medium">Rajesh Pujari</p>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
              <InquiryFormPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="h-96 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.7!2d72.7567!3d19.8298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBoisar%2C%20Palghar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Jitesh Engineering Works Location - Boisar, Palghar"
        ></iframe>
      </section>
    </>
  );
}
