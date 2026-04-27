import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Crown, Star } from "lucide-react";

const plans = [
  {
    name: "GOLD",
    label: "Bridgify Gold",
    amount: 499,
    price: "₹499 / year",
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
    name: "PLATINUM",
    label: "Bridgify Platinum",
    amount: 999,
    price: "₹999 / year",
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
    name: "DIAMOND",
    label: "Bridgify Diamond",
    amount: 1999,
    price: "₹1999 / year",
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

const planRank = { FREE: 0, GOLD: 1, PLATINUM: 2, DIAMOND: 3 };

export default function UpgradePlans() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const buyPlan = async (plan, amount) => {
    try {
      const res = await fetch("http://localhost:8000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount }),
      });

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Bridgify",
        description: `${plan} Plan`,
        order_id: order.id,

        handler: async function (response) {
          const userObj = JSON.parse(localStorage.getItem("user"));

          const verifyRes = await fetch("http://localhost:8000/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan,
              userId: userObj.id,
            }),
          });

          const data = await verifyRes.json();

          if (data.success) {
            const updatedUser = {
              ...userObj,
              plan: data.plan,
              planExpiresAt: data.expiresAt,
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            document.documentElement.setAttribute("data-plan", data.plan);
            const root = document.documentElement
root.classList.remove("theme-free", "theme-gold", "theme-platinum", "theme-diamond")
root.classList.add(`theme-${plan.toLowerCase()}`)

            alert("🎉 Plan activated for 1 year!");
            window.location.reload();
          } else {
            alert(data.message || "Payment verification failed");
          }
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen upgrade-bg text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h1
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-5xl font-bold mb-4 text-black dark:text-white"
>
  Upgrade to <span className="plan-accent">Bridgify Pro</span>
</motion.h1>

<p className="text-gray-600 dark:text-gray-400 text-lg">
  Unlock powerful networking features and get noticed by industry leaders.
</p>
        
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const disabled = planRank[plan.name] <= planRank[user.plan || "FREE"];

          return (
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
              <h2 className="text-2xl font-bold mb-2">{plan.label}</h2>
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
  disabled={disabled}
  className={`w-full py-3 rounded-xl font-semibold transition-all ${
    disabled
      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
      : "plan-btn"
  }`}
  onClick={() => buyPlan(plan.name, plan.amount)}
>
                {disabled
                  ? user.plan === plan.name
                    ? "Current Plan"
                    : "Upgrade Required"
                  : "Buy Plan"}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}