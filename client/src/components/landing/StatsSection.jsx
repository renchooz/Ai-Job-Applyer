import { motion } from "framer-motion";

const stats = [
  {
    value: "95%",
    label: "Resume match accuracy",
  },
  {
    value: "5 sec",
    label: "AI JD analysis",
  },
  {
    value: "1 click",
    label: "Gmail application send",
  },
  {
    value: "∞",
    label: "Multiple resume support",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur"
          >
            <h3 className="text-3xl font-bold text-violet-300 md:text-4xl">
              {stat.value}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;