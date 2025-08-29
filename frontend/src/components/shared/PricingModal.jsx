import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, Zap } from "lucide-react";
import { useCallback, useEffect } from "react";

export default function PricingModal({ isOpen, onClose }) {
  // Handle click outside
  const handleClickOutside = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Chat with single document",
        "Basic question generation",
        "Limited translations",
        "Basic flashcards"
      ],
      isPopular: false,
      buttonText: "Current Plan",
      disabled: true
    },
    {
      name: "Pro",
      price: "$9.99/mo",
      features: [
        "All Basic features",
        "Unlimited notes generation",
        "Advanced question papers",
        "Unlimited translations",
        "Advanced flashcards",
        "Priority support"
      ],
      isPopular: true,
      buttonText: "Get Started",
      disabled: false
    },
    {
      name: "Team",
      price: "$24.99/mo",
      features: [
        "All Pro features",
        "5 team members",
        "Team collaboration",
        "Custom branding",
        "Analytics dashboard",
        "24/7 support"
      ],
      isPopular: false,
      buttonText: "Contact Sales",
      disabled: false
    }
  ];

  const handleUpgrade = (plan) => {
    if (!plan.disabled) {
      console.log(`Upgrading to ${plan.name}`);
      // Add your payment logic here
      onClose(); // Close modal after selection
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClickOutside}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to overlay
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Upgrade to Premium
                </h2>
                <p className="text-gray-400">
                  Unlock the full potential of AI-powered learning
                </p>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.name}
                    whileHover={{ translateY: -5 }}
                    className={`relative p-6 rounded-xl border ${
                      plan.isPopular 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1 px-3 py-1 bg-purple-500 rounded-full text-xs font-medium text-white">
                          <Sparkles className="w-3 h-3" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="text-2xl font-bold text-white mb-1">
                        {plan.price}
                      </div>
                      {plan.price !== "Free" && (
                        <div className="text-sm text-gray-400">per month</div>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleUpgrade(plan)}
                      disabled={plan.disabled}
                      className={`w-full p-3 rounded-lg font-medium transition-all duration-200
                        ${plan.isPopular
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
                          : plan.disabled
                            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }
                        ${!plan.disabled && 'hover:scale-105'}
                      `}
                    >
                      {plan.buttonText}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Money-back guarantee */}
              <div className="mt-8 text-center text-sm text-gray-400">
                <p>30-day money-back guarantee • Cancel anytime • Secure payment</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}