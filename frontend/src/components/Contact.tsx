import { Mail, MapPin, Phone } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-20 bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">

          <h2 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite mb-4 relative inline-block">
            Contact Us
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-handwritten mt-4">
            Have questions? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white hand-drawn-border p-6 hover:rotate-1 hover:scale-105 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-yellowHighlight/30 p-4 rounded-full hand-drawn-border">
                <Mail className="w-8 h-8 text-graphite" />
              </div>
              <div>
                <h4 className="font-handwritten text-xl font-bold text-graphite mb-2">
                  Email
                </h4>
                <p className="text-muted-foreground">support@studystuff.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white hand-drawn-border p-6 hover:-rotate-1 hover:scale-105 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-blueHighlight/30 p-4 rounded-full hand-drawn-border">
                <Phone className="w-8 h-8 text-graphite" />
              </div>
              <div>
                <h4 className="font-handwritten text-xl font-bold text-graphite mb-2">
                  Phone
                </h4>
                <p className="text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="bg-white hand-drawn-border p-6 hover:rotate-1 hover:scale-105 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-accent/30 p-4 rounded-full hand-drawn-border">
                <MapPin className="w-8 h-8 text-graphite" />
              </div>
              <div>
                <h4 className="font-handwritten text-xl font-bold text-graphite mb-2">
                  Location
                </h4>
                <p className="text-muted-foreground">
                  Campus Center, Building A<br />
                  Rishihood University
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Doodle elements */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-yellowHighlight/20 px-6 py-3 rounded-lg border-2 border-dashed border-graphite transform -rotate-1">
            <p className="font-handwritten text-lg text-graphite">
              📧 We typically respond within 24 hours!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};