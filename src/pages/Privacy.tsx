import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-hero-gradient py-10 text-center text-primary-foreground">
        <h1 className="font-display font-bold text-3xl">Privacy Policy</h1>
        <p className="text-primary-foreground/80 mt-1">Last updated: October 2026</p>
      </div>

      <div className="container mx-auto px-4 py-12 flex-1 max-w-3xl space-y-6 text-foreground">
        <section className="space-y-2">
          <h2 className="font-display font-semibold text-xl">1. Information We Collect</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Career Connect Hub collects information provided directly by users when creating an account, posting job listings, submitting job applications, or updating profile details. This includes contact details, resume credentials, and employment preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-semibold text-xl">2. How We Use Information</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use collected data solely to facilitate talent discovery, deliver application status updates, match candidates with employer listings, and continuously improve platform performance and security.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-semibold text-xl">3. Data Protection & Security</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Career Connect Hub implements industry-standard encryption, role-based access control, and strict data protection measures to ensure candidate and recruiter privacy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-semibold text-xl">4. Your Rights</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Users have full control over their account data, including the right to inspect, update, export, or delete their profile information at any time via the user dashboard.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
