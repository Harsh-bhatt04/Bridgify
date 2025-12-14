import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Crown, Star } from "lucide-react";

const plans = [
  {
    name: "Bridgify Gold",
    price: "₹499 / month",
    icon: <Star className="text-yellow-400 w-10 h-10" />,
    features: [
      "Highlighted profile visibility",
      "Unlimited connection requests",
      "Access to premium projects",
      "Exclusive networking events",
    ],
    gradient: "from-yellow-500 to-yellow-300",
  },
  {
    name: "Bridgify Platinum",
    price: "₹999 / month",
    icon: <Crown className="text-purple-400 w-10 h-10" />,
    features: [
      "Top-tier search ranking",
      "1-on-1 mentorship sessions",
      "Early access to collaborations",
      "Custom profile themes",
    ],
    gradient: "from-purple-600 to-indigo-400",
    popular: true,
  },
  {
    name: "Bridgify Diamond",
    price: "₹1999 / month",
    icon: <Sparkles className="text-blue-400 w-10 h-10" />,
    features: [
      "Priority industry connections",
      "AI-driven project promotion",
      "Feature on homepage spotlight",
      "Dedicated support 24/7",
    ],
    gradient: "from-blue-600 to-cyan-400",
  },
];

export default function UpgradePlans() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          Upgrade to <span className="text-blue-400">Bridgify Pro</span>
        </motion.h1>
        <p className="text-gray-400 text-lg">
          Unlock powerful networking features and get noticed by industry leaders.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`relative p-8 rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg overflow-hidden`}
          >
            {plan.popular && (
              <span className="absolute top-4 right-4 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            )}

            <div className="flex justify-center mb-4">{plan.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-lg font-semibold mb-6">{plan.price}</p>

            <ul className="text-left space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-xl font-semibold text-black bg-white hover:bg-gray-100 transition-all"
            >
              Buy Plan
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16 text-gray-500">
        <p>
          Not sure which plan fits you?{" "}
          <a href="/support" className="text-blue-400 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
