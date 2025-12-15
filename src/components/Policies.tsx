import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

export const Policies: React.FC = () => {
  return (
    <section id="policies" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Platform Integrity */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-amber-500" size={22} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Platform Integrity</h2>
          </div>
          <p className="text-gray-600 mb-4">
            LiftMate is a community platform. These guidelines help keep everyone safe, respectful, and accountable.
          </p>
          <div className="space-y-2 text-sm md:text-base">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="text-emerald-600 mt-0.5" size={18} />
              <p className="text-gray-700">
                Provide accurate information in your profile and ride listings (name, phone number, vehicle and trip details).
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="text-emerald-600 mt-0.5" size={18} />
              <p className="text-gray-700">
                Use WhatsApp and LiftMate only to arrange trips and share practical trip information — keep communication respectful.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="text-emerald-600 mt-0.5" size={18} />
              <p className="text-gray-700">
                Leave honest, constructive feedback and ratings after trips to help others travel safely.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="text-red-500 mt-0.5" size={18} />
              <p className="text-gray-700">
                No fake profiles, misrepresenting trips, fraudulent activity, or manipulation of ratings.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="text-red-500 mt-0.5" size={18} />
              <p className="text-gray-700">
                Do not use LiftMate for illegal activities, transporting prohibited items, or any unauthorised commercial purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Consequences */}
        <div className="mb-12 rounded-xl border border-red-100 bg-red-50 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="text-xl font-bold text-red-700">Consequences of Violations</h3>
          </div>
          <div className="space-y-1 text-sm md:text-base text-red-800">
            <p>
              <span className="font-semibold">First Violation:</span> Warning and temporary account restriction.
            </p>
            <p>
              <span className="font-semibold">Serious Violations:</span> Immediate account suspension pending investigation.
            </p>
            <p>
              <span className="font-semibold">Repeated Violations:</span> Permanent account termination.
            </p>
            <p>
              <span className="font-semibold">Criminal Activity:</span> Immediate termination and reporting to authorities.
            </p>
          </div>
        </div>

        {/* Reporting */}
        <div className="mb-12 rounded-xl border border-blue-100 bg-blue-50 p-6 md:p-8">
          <h3 className="text-xl font-bold text-blue-800 mb-3">Reporting Violations</h3>
          <p className="text-sm md:text-base text-blue-900 mb-3">
            If you encounter behaviour that violates these guidelines:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-blue-900">
            <li>Use the in‑app reporting option or contact LiftMate support.</li>
            <li>Provide detailed information about the incident (date, location, trip details).</li>
            <li>Contact emergency services immediately if you are in danger.</li>
            <li>Our safety team reviews all reports within 24–48 hours.</li>
          </ul>
        </div>

        {/* Terms of Service (LiftMate) */}
        <div id="terms" className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Info className="text-gray-700" size={20} />
            <h3 className="text-xl font-bold text-gray-900">LiftMate Terms of Service (Summary)</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Last updated: 15 December 2025. This is a plain‑language summary. By using LiftMate you agree to the full Terms of Service
            below and our Community Guidelines.
          </p>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Marketplace only:</span> LiftMate is a platform that connects independent drivers and riders
              or parcel senders. LiftMate does not provide transport or delivery services, own vehicles, or employ drivers.
            </p>
            <p>
              <span className="font-semibold">Eligibility:</span> You must be 18+, provide accurate information, and keep your account
              secure. Drivers must have a valid licence, roadworthy vehicle, and appropriate insurance.
            </p>
            <p>
              <span className="font-semibold">Bookings & payments:</span> Bookings create a direct agreement between driver and rider/
              sender. Payments are handled directly between users (usually cash) — LiftMate does not handle or hold money.
            </p>
            <p>
              <span className="font-semibold">Safety:</span> Always verify the driver, vehicle and route; share trip details with someone
              you trust; and follow South African traffic laws. Driving or riding under the influence, harassment, discrimination or any
              illegal activity is strictly prohibited.
            </p>
            <p>
              <span className="font-semibold">Liability:</span> You use LiftMate at your own risk. To the fullest extent allowed by South
              African law, LiftMate is not responsible for accidents, injuries, losses, delays, or disputes between users. Our total
              liability is limited as set out in the full Terms.
            </p>
            <p>
              <span className="font-semibold">Privacy:</span> We process your personal data in line with POPIA and only share information
              as needed to operate the platform and keep users safe.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs md:text-sm text-gray-500">
          These guidelines and terms help ensure everyone has a safe, respectful, and positive experience on LiftMate.
        </p>
      </div>
    </section>
  );
};

export default Policies;


