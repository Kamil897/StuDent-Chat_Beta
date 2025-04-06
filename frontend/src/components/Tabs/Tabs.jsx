import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./Tabs.module.scss";

const tabs = [
  { id: 1, title: "Стать волонтером", content: "Свяжитесь с любым из приютов, чтобы узнать, как вы можете внести свой вклад. Они всегда нуждаются в людях, готовых помочь." },
  { id: 2, title: "Сделать пожертвование", content: "Финансовая поддержка помогает приютам обеспечивать корм, медикаменты и жилье для животных" },
  { id: 3, title: "Принять животное ", content: "Посетите любой из выше указанных приютов и найдите себе верного друга среди их подопечных." },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={s.tabsContainer}>
      <div className={s.tabsHeader}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? `${s.tab} ${s.activeTab}` : s.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            {activeTab === tab.id && <motion.div layoutId="underline" className={s.underline} />}
          </button>
        ))}
      </div>
      <div className={s.tabContentWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={s.tabContent}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;
