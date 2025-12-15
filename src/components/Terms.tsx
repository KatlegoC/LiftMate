import React from 'react';

export const Terms: React.FC = () => {
  return (
    <section id="terms" className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">LiftMate Terms of Service</h2>
        <p className="text-sm text-gray-500 mb-8">Last updated: 15 December 2025</p>

        <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
          <p>
            LiftMate is a ride‑sharing and package delivery marketplace platform. We connect independent drivers and
            riders/parcel senders. We do not provide transport or delivery services ourselves and do not employ drivers.
          </p>

          <h3 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h3>
          <p>
            By creating an account or using LiftMate, you agree to these Terms of Service and our Community Guidelines. If you
            do not agree, you must not use the platform.
          </p>

          <h3 className="text-xl font-semibold mt-6">2. Platform Description</h3>
          <p>
            LiftMate provides tools to connect drivers with riders and parcel senders, manage bookings, and communicate. All
            services are provided by independent users. LiftMate is not a carrier, courier, or logistics provider.
          </p>

          <h3 className="text-xl font-semibold mt-6">3. Eligibility and Registration</h3>
          <p>
            You must be at least 18, legally able to enter contracts, and provide accurate information. You are responsible for
            keeping your account secure and must not share your login with others.
          </p>
          <p>
            Drivers must have a valid South African driver&apos;s licence, a roadworthy and legally registered vehicle, and
            appropriate insurance that covers ride‑sharing or commercial use. Drivers must comply with all South African traffic
            and transport laws.
          </p>

          <h3 className="text-xl font-semibold mt-6">4. Bookings and Service</h3>
          <p>
            Riders/senders request trips or deliveries through LiftMate. Drivers choose whether to accept. A booking is only
            confirmed when a driver accepts, creating a direct agreement between driver and rider/sender. Drivers must arrive on
            time, drive safely, and respect passengers and property. Riders/senders must be ready on time, respect the driver and
            vehicle, and not transport prohibited items.
          </p>

          <h3 className="text-xl font-semibold mt-6">5. Payments</h3>
          <p>
            Payments are made directly between users (typically cash). LiftMate does not hold, process, or guarantee any payment.
            Drivers may set their own prices, which should be shown clearly before confirming a booking. Any disputes over
            payment are between users.
          </p>

          <h3 className="text-xl font-semibold mt-6">6. Cancellations and No‑Shows</h3>
          <p>
            Users should cancel as early as possible. Repeated late cancellations or no‑shows (by either drivers or riders) may
            affect ratings and can lead to account restrictions or suspension.
          </p>

          <h3 className="text-xl font-semibold mt-6">7. Safety</h3>
          <p>
            Always verify the driver, rider, and vehicle before starting a trip. Share trip details with someone you trust and
            use seatbelts at all times. Driving or riding under the influence, harassment, discrimination, intimidation, or any
            illegal behaviour is strictly prohibited and may result in immediate termination and reporting to authorities.
          </p>

          <h3 className="text-xl font-semibold mt-6">8. Insurance and Liability</h3>
          <p>
            Drivers are solely responsible for maintaining suitable insurance. By using LiftMate, you acknowledge that you use
            the platform at your own risk. LiftMate is not responsible for accidents, injuries, losses, delays, property damage,
            or disputes between users, to the fullest extent permitted by South African law.
          </p>

          <h3 className="text-xl font-semibold mt-6">9. Ratings and Reviews</h3>
          <p>
            Users may rate and review each other after trips. Reviews must be honest, respectful, and based on real experiences.
            Manipulating ratings, posting fake reviews, or using reviews to threaten or harass others is prohibited.
          </p>

          <h3 className="text-xl font-semibold mt-6">10. User Conduct</h3>
          <p>
            You must follow our Community Guidelines. We may warn, suspend, or terminate accounts for unsafe behaviour, fraud,
            repeated complaints, or any conduct that harms other users or LiftMate.
          </p>

          <h3 className="text-xl font-semibold mt-6">11. Privacy</h3>
          <p>
            We process your personal information in line with POPIA. We collect data such as account details, trip information,
            and communications to operate the platform and keep users safe. You may request access, correction, or deletion of
            your data, subject to legal and safety requirements.
          </p>

          <h3 className="text-xl font-semibold mt-6">12. Reporting and Disputes</h3>
          <p>
            If you experience behaviour that violates these Terms or our guidelines, report it through LiftMate. In an emergency,
            contact the police or emergency services first. Disputes between users should first be resolved directly; LiftMate may
            step in at its discretion but is not obligated to resolve every dispute.
          </p>

          <h3 className="text-xl font-semibold mt-6">13. Intellectual Property</h3>
          <p>
            The LiftMate name, logo, and platform design are protected by intellectual property laws. You may not copy, modify,
            or resell the platform or content without our written permission.
          </p>

          <h3 className="text-xl font-semibold mt-6">14. Changes and Termination</h3>
          <p>
            We may update these Terms and change or discontinue features at any time. We will update the &quot;Last updated&quot;
            date when we do. If you continue using LiftMate after changes, you accept the new Terms. You may close your account at
            any time; we may suspend or terminate accounts that violate these Terms or create safety risks.
          </p>

          <h3 className="text-xl font-semibold mt-6">15. Governing Law</h3>
          <p>
            These Terms are governed by the laws of the Republic of South Africa. Any legal disputes must be brought before South
            African courts.
          </p>

          <h3 className="text-xl font-semibold mt-6">16. Contact</h3>
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:support@liftmate.co.za" className="text-emerald-600 underline">
              support@liftmate.co.za
            </a>
            . In an emergency, always contact local emergency services first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;


