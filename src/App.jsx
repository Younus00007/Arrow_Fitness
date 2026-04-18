import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Trophy, Users, Star, Zap, Shield, Award,
  ChevronDown, ArrowRight, Dumbbell, Target,
  Flame, Heart, Clock, CheckCircle, Menu, X,
  TrendingUp, Medal, Instagram, MapPin, Phone
} from 'lucide-react';

// Transformation Images
import transform1Left from './transform_images/transform_1(left).jpeg';
import transform1Right from './transform_images/transform_1(right).jpeg';
import transform2Left from './transform_images/transform_2(left).jpeg';
import transform2Right from './transform_images/transform_2(right).jpeg';
import transform3Left from './transform_images/transform_3(left).jpeg';
import transform3Right from './transform_images/transform_3(right).jpeg';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const QUOTES = [
  "Pain is temporary. Glory is forever.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The only bad workout is the one that didn't happen.",
  "Push yourself because no one else is going to do it for you.",
  "Sweat is just fat crying.",
  "Train insane or remain the same.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The hard days are the best days because that's when champions are made.",
  "Don't stop when you're tired. Stop when you're done.",
  "Success starts with self-discipline.",
  "Wake up. Work out. Look hot. Kick ass. Repeat.",
  "Strive for progress, not perfection.",
  "You don't have to be great to start, but you have to start to be great.",
  "Every rep is a vote for the person you want to become.",
  "Champions aren't born. They're built — one set at a time.",
  "Iron never lies to you. Neither does the mirror.",
  "The only limit is the one you set yourself.",
  "Discipline is doing what needs to be done, even when you don't want to.",
  "Strong is the new sexy.",
  "Be stronger than your excuses.",
  "The gym is my therapy.",
  "Your future self is watching you right now.",
  "Fall in love with the process and the results will come.",
  "No shortcuts. No excuses. No limits.",
  "Earn your body.",
  "Get comfortable being uncomfortable.",
  "You are one workout away from a good mood.",
  "Hustle for that muscle.",
  "The difference between try and triumph is a little 'umph'.",
  "First say to yourself what you would be, and then do what you have to do.",
  "Energy flows where intention goes.",
  "Rise and grind.",
  "Hard work beats talent when talent doesn't work hard.",
  "Be the reason someone starts believing in themselves.",
  "Make your body the sexiest outfit you own.",
  "You are stronger than you think.",
  "The body achieves what the mind believes.",
  "Lift heavy. Lift often. Lift smart.",
  "One more rep. Always one more rep.",
  "Sore today, strong tomorrow.",
  "Don't wish for a good body. Work for it.",
  "Eat. Sleep. Train. Repeat.",
  "Leave every session better than you came.",
  "Suffer the pain of discipline or suffer the pain of regret.",
  "Be a beast in the gym and a beauty in life.",
  "Your health is your wealth.",
  "Outwork everyone.",
  "Do not pray for an easy life. Pray for the strength to endure a difficult one.",
  "Motivation gets you started. Habit keeps you going.",
  "Today's pain is tomorrow's power.",
];

const TRANSFORMATIONS = [
  {
    name: "Arjun R.",
    months: 6,
    kgLost: 22,
    label: "Fat → Fit",
    beforeImg: transform1Left,
    afterImg: transform1Right
  },
  {
    name: "Priya M.",
    months: 4,
    kgLost: 14,
    label: "Slim → Strong",
    beforeImg: transform2Left,
    afterImg: transform2Right
  },
  {
    name: "Rahul S.",
    months: 8,
    kgLost: 28,
    label: "Obese → Athletic",
    beforeImg: transform3Left,
    afterImg: transform3Right
  },
  { name: "Sneha K.", months: 5, kgLost: 18, label: "Unfit → Toned" },
  { name: "Vikram T.", months: 3, kgLost: 10, label: "Soft → Shredded" },
  { name: "Ananya P.", months: 7, kgLost: 20, label: "Lazy → Lean" },
  { name: "Karan D.", months: 6, kgLost: 24, label: "Bulky → Built" },
  { name: "Meera L.", months: 5, kgLost: 16, label: "Weak → Warrior" },
];

const PLANS = [
  {
    label: "1 Month",
    prices: { normal: 2000, couple: 3000, student: 1500 },
    popular: false,
    perks: ["Free Consultation", "Free Diet Chart", "Free Workout Chart", "Lifestyle"]
  },
  {
    label: "3 Months",
    prices: { normal: 5000, couple: 7500, student: 4000 },
    popular: false,
    perks: ["Free Consultation", "Free Diet Chart", "Free Workout Chart", "Lifestyle"]
  },
  {
    label: "6 Months",
    prices: { normal: 7500, couple: 12000, student: 6000 },
    popular: true,
    perks: ["Free Consultation", "Free Diet Chart", "Free Workout Chart", "Lifestyle"]
  },
  {
    label: "1 Year",
    prices: { normal: 12000, couple: 18000, student: 9000 },
    popular: false,
    perks: ["Free Consultation", "Free Diet Chart", "Free Workout Chart", "Lifestyle"]
  },
];

const TESTIMONIALS = [
  { name: "Rohit Sharma", role: "Software Engineer", text: "Arrow Fitness changed my life. Lost 18 kg in 5 months with the best trainers I've ever met. The energy here is electric!", rating: 5 },
  { name: "Divya Nair", role: "Teacher", text: "I was terrified of gyms before. The trainers here made me feel so welcome. Now I squat 80 kg and feel unstoppable!", rating: 5 },
  { name: "Aakash Patel", role: "Student", text: "Student pricing is a lifesaver. The facilities are top-notch and the community keeps me accountable every single day.", rating: 5 },
  { name: "Sonia Mehta", role: "Doctor", text: "As a doctor I care about science-backed training. Arrow Fitness trainers understand biomechanics. Zero injuries in 8 months.", rating: 5 },
  { name: "Farhan Khan", role: "Personal Trainer", text: "I've trained at 12 different gyms. Arrow Fitness equipment and coaching quality is genuinely world-class for the price.", rating: 5 },
  { name: "Kavitha Rao", role: "Homemaker", text: "Morning batch, flexible schedule, and crèche facility. Arrow Fitness truly cares about every member's life situation.", rating: 5 },
];

const ACHIEVEMENTS = [
  { icon: Trophy, value: "3x", label: "Best Gym Award", sub: "City Fitness Awards 2022–24" },
  { icon: Users, value: "2,400+", label: "Active Members", sub: "And growing every month" },
  { icon: Medal, value: "4", label: "Certified Trainers", sub: "NASM & ACE certified" },
  { icon: TrendingUp, value: "98%", label: "Retention Rate", sub: "Members who stay and grow" },
  { icon: Star, value: "4.9★", label: "Google Rating", sub: "Based on 840+ reviews" },
  { icon: Flame, value: "5 Yrs", label: "Of Excellence", sub: "Est. 2020, Arrow Fitness" },
];

const GALLERY_IMAGES = [
  { id: 1, title: "Cardio Zone", category: "Facility" },
  { id: 2, title: "Weight Area", category: "Strength" },
  { id: 3, title: "Yoga Studio", category: "Wellness" },
  { id: 4, title: "CrossFit Zone", category: "Performance" },
  { id: 5, title: "Locker Rooms", category: "Premium" },
  { id: 6, title: "Nutrition Bar", category: "Lifestyle" },
];

const COACHES = [
  {
    id: 1,
    name: "Vikram 'The Beast' Rathore",
    role: "Head Coach & Founder",
    specialty: "Bodybuilding & Transformation",
    experience: "12+ Years Experience",
    bio: "Certified master trainer with a passion for pushing limits and achieving the impossible.",
    awards: ["National Pro 2019", "Best Transformation Coach 2022"]
  },
  {
    id: 2,
    name: "Anjali Sharma",
    role: "Strength Specialist",
    specialty: "Powerlifting & Core Strength",
    experience: "7 Years Experience",
    bio: "Focused on functional strength and building a bulletproof core."
  },
  {
    id: 3,
    name: "Marcus Jones",
    role: "CrossFit Lead",
    specialty: "High-Intensity Functional Training",
    experience: "5 Years Experience",
    bio: "Helping members find their athletic potential through dynamic movement."
  },
  {
    id: 4,
    name: "Sarah Miller",
    role: "Yoga & Mobility",
    specialty: "Mind-Body Wellness",
    experience: "8 Years Experience",
    bio: "Specializing in recovery, flexibility, and sustainable fitness lifestyles."
  },
];

// ─────────────────────────────────────────────
// CUSTOM CURSOR & TILT CARD (INTERACTIVE UI)
// ─────────────────────────────────────────────
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const updateHoverState = (e) => {
      const target = e.target;
      if (target.closest('a, button, input, select, textarea, canvas, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateHoverState);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-yellow-400 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center transform"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(255,215,0,0.8)' : 'rgba(255,215,0,0)'
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-yellow-400 pointer-events-none z-[100] hidden md:block transform mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </>
  );
}

function TiltCard({ children, className, ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative ${className}`}
      {...props}
    >
      <div style={{ transform: "translateZ(20px)" }} className="relative h-full z-10 w-full flex flex-col">
        {children}
      </div>
      {/* Dynamic Glass Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// BMI CALCULATOR COMPONENT
// ─────────────────────────────────────────────
function BMICalculator() {
  const [gender, setGender] = useState('male');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calcBMI = useCallback(() => {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) { setBmi(null); return; }
    if (weightUnit === 'lbs') w = w * 0.453592;
    if (heightUnit === 'inches') h = h * 2.54;
    const hM = h / 100;
    const result = w / (hM * hM);
    setBmi(result.toFixed(1));
    if (result < 18.5) setCategory('Underweight');
    else if (result < 25) setCategory('Normal');
    else if (result < 30) setCategory('Overweight');
    else setCategory('Obese');
  }, [weight, height, weightUnit, heightUnit]);

  useEffect(() => { calcBMI(); }, [calcBMI]);

  const categoryColor = {
    Underweight: 'text-blue-400',
    Normal: 'text-green-400',
    Overweight: 'text-orange-400',
    Obese: 'text-red-500',
  };

  const bmiPercent = bmi ? Math.min(100, ((parseFloat(bmi) - 10) / 30) * 100) : 0;

  return (
    <section id="bmi" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.06),transparent_60%)]" />
      <div className="max-w-5xl mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">CHECK YOUR</p>
          <h2 className="font-display text-5xl md:text-7xl text-white mb-4">BMI CALCULATOR</h2>
          <p className="text-gray-400 max-w-xl mb-12">Know exactly where you stand. Enter your stats and get your Body Mass Index instantly.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Inputs */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-2xl p-5 sm:p-8">
            {/* Gender */}
            <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">Gender</label>
            <div className="flex gap-3 mb-6">
              {['male', 'female'].map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className={`flex-1 py-3 rounded-xl font-semibold uppercase text-sm tracking-widest transition-all ${gender === g ? 'bg-yellow-400 text-black' : 'bg-[#222] text-gray-400 hover:bg-[#2a2a2a]'}`}>
                  {g === 'male' ? '♂ Men' : '♀ Women'}
                </button>
              ))}
            </div>

            {/* Weight */}
            <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">Weight</label>
            <div className="flex gap-2 sm:gap-3 mb-6">
              <input type="number" min="1" placeholder={weightUnit === 'kg' ? 'e.g. 75' : 'e.g. 165'}
                value={weight} onChange={e => setWeight(e.target.value)}
                className="flex-1 min-w-0 w-full bg-[#222] border border-[#333] text-white rounded-xl px-3 sm:px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors" />
              <div className="flex bg-[#222] border border-[#333] rounded-xl overflow-hidden shrink-0">
                {['kg', 'lbs'].map(u => (
                  <button key={u} onClick={() => setWeightUnit(u)}
                    className={`px-3 sm:px-4 py-3 text-sm font-semibold transition-all ${weightUnit === u ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Height */}
            <label className="block text-gray-400 text-sm uppercase tracking-widest mb-3">Height</label>
            <div className="flex gap-2 sm:gap-3">
              <input type="number" min="1" placeholder={heightUnit === 'cm' ? 'e.g. 175' : 'e.g. 69'}
                value={height} onChange={e => setHeight(e.target.value)}
                className="flex-1 min-w-0 w-full bg-[#222] border border-[#333] text-white rounded-xl px-3 sm:px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors" />
              <div className="flex bg-[#222] border border-[#333] rounded-xl overflow-hidden shrink-0">
                {['cm', 'inches'].map(u => (
                  <button key={u} onClick={() => setHeightUnit(u)}
                    className={`px-3 sm:px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap ${heightUnit === u ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Result */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-2xl p-5 sm:p-8 flex flex-col justify-center overflow-hidden">
            {bmi ? (
              <div className="text-center">
                <p className="text-gray-400 uppercase tracking-widest text-sm mb-4">Your BMI</p>
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={bmi}
                  className="text-8xl font-display text-yellow-400 mb-2">{bmi}</motion.div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={category}
                  className={`text-2xl font-bold mb-6 ${categoryColor[category]}`}>{category}</motion.p>
                {/* Bar */}
                <div className="relative h-4 bg-[#333] rounded-full overflow-hidden mb-4">
                  <div className="absolute inset-0 flex">
                    <div className="flex-1 bg-blue-500/60" />
                    <div className="flex-1 bg-green-500/60" />
                    <div className="flex-1 bg-orange-400/60" />
                    <div className="flex-1 bg-red-500/60" />
                  </div>
                  <motion.div initial={{ left: 0 }} animate={{ left: `${bmiPercent}%` }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-yellow-400 rounded-full border-2 border-black shadow-lg" style={{ left: `${bmiPercent}%` }} />
                </div>
                <div className="flex justify-between text-[10px] sm:text-xs text-gray-500">
                  <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
                </div>
                <p className="mt-6 text-gray-400 text-sm">
                  {category === 'Normal' ? '🎉 Great shape! Keep maintaining your lifestyle.' :
                    category === 'Underweight' ? '💪 Consider a muscle-gain program with our trainers.' :
                      category === 'Overweight' ? '🔥 Our fat-loss program can get you to Normal in 90 days.' :
                        '⚡ Our intensive transformation program is designed for you.'}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Dumbbell className="w-16 h-16 text-[#333] mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Enter your weight & height to see your BMI result here.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Reference Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Underweight', range: '< 18.5', color: 'border-blue-500 text-blue-400' },
            { label: 'Normal', range: '18.5 – 24.9', color: 'border-green-500 text-green-400' },
            { label: 'Overweight', range: '25 – 29.9', color: 'border-orange-400 text-orange-400' },
            { label: 'Obese', range: '≥ 30', color: 'border-red-500 text-red-400' },
          ].map(row => (
            <div key={row.label} className={`bg-[#1A1A1A] border ${row.color} rounded-xl p-4 text-center`}>
              <p className={`font-bold text-sm ${row.color.split(' ')[1]}`}>{row.label}</p>
              <p className="text-gray-400 text-xs mt-1">{row.range}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TRANSFORMATION MARQUEE
// ─────────────────────────────────────────────
function TransformationMarquee() {
  const doubled = [...TRANSFORMATIONS, ...TRANSFORMATIONS];
  return (
    <section id="transformations" className="py-24 bg-[#111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">REAL RESULTS</p>
          <h2 className="font-display text-5xl md:text-7xl text-white">TRANSFORMATIONS</h2>
        </motion.div>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <TransformCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformCard({ t }) {
  return (
    <TiltCard className="flex-shrink-0 mx-4 w-[24rem] bg-[#1A1A1A] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-colors group">
      <div className="flex relative h-[20rem] overflow-hidden bg-black/40">
        {/* Before */}
        <div className="flex-1 relative overflow-hidden">
          {t.beforeImg ? (
            <img src={t.beforeImg} alt="Before" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="h-full bg-[#222] flex items-center justify-center">
              <span className="text-2xl grayscale opacity-20">😞</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest text-white border border-white/10">Before</div>
        </div>

        {/* Laser Divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-400 to-transparent z-20 shadow-[0_0_8px_rgba(255,215,0,0.8)]" />

        {/* After */}
        <div className="flex-1 relative overflow-hidden">
          {t.afterImg ? (
            <img src={t.afterImg} alt="After" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="h-full bg-[#2a2a2a] flex items-center justify-center">
              <span className="text-2xl grayscale opacity-20">💪</span>
            </div>
          )}
          <div className="absolute inset-0 bg-yellow-400/5" />
          <div className="absolute bottom-2 right-2 bg-yellow-400 text-black px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-yellow-400/20 shadow-lg">After</div>
        </div>
      </div>
      <div className="p-4 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-sm">{t.name}</p>
            <p className="text-gray-400 text-xs">{t.label}</p>
          </div>
          <div className="text-right">
            <p className="text-yellow-400 font-bold text-sm">-{t.kgLost} kg</p>
            <p className="text-gray-500 text-xs">{t.months} months</p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

// ─────────────────────────────────────────────
// PRICING SECTION
// ─────────────────────────────────────────────
function Pricing({ setSelectedPlan }) {
  const [tier, setTier] = useState('normal'); // 'normal', 'couple', 'student'

  const tiers = [
    { id: 'normal', label: 'Normal' },
    { id: 'couple', label: 'Couple' },
    { id: 'student', label: 'Student' }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.05),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">MEMBERSHIP</p>
            <h2 className="font-display text-5xl md:text-7xl text-white">PRICING PLANS</h2>
          </div>

          {/* 3-Way Tier Selector */}
          <div className="bg-[#1A1A1A] p-1.5 rounded-2xl flex border border-[#2a2a2a] relative">
            {tiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                className={`relative px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors duration-300 min-w-[110px] ${tier === t.id ? 'text-black' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {tier === t.id && (
                  <motion.div
                    layoutId="activeTier"
                    className="absolute inset-0 bg-yellow-400 rounded-xl shadow-lg z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: 1500 }}>
          {PLANS.map((plan, i) => {
            const currentPrice = plan.prices[tier];
            const originalNormalPrice = plan.prices.normal;
            const hasDiscount = tier === 'student' && currentPrice < originalNormalPrice;

            return (
              <TiltCard key={plan.label}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-[1.75rem] p-6 flex flex-col h-full border transition-all duration-500 ${plan.popular
                  ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_20px_50px_rgba(255,215,0,0.15)]'
                  : 'bg-[#1A1A1A] border-[#2a2a2a] text-white hover:border-yellow-400/30'}`}>

                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -track-x-1/2 bg-black text-yellow-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-yellow-400 shadow-xl" style={{ transform: 'translateX(-50%)' }}>
                    Recommended
                  </div>
                )}

                <div className="mb-6">
                  <p className={`font-display text-xl mb-3 ${plan.popular ? 'text-black' : 'text-yellow-400'}`}>{plan.label}</p>
                  <div className="flex flex-col gap-1 h-14 justify-center">
                    <div className="flex items-baseline gap-2 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentPrice}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="font-display text-4xl"
                        >
                          ₹{currentPrice.toLocaleString('en-IN')}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="h-5">
                      <AnimatePresence>
                        {hasDiscount && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-2"
                          >
                            <span className={`text-xs line-through ${plan.popular ? 'text-black/40' : 'text-gray-500'}`}>
                              ₹{originalNormalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${plan.popular ? 'bg-black/10 text-black' : 'bg-yellow-400/10 text-yellow-400'}`}>
                              SAVE ₹{(originalNormalPrice - currentPrice).toLocaleString('en-IN')}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className={`h-px w-full mb-6 ${plan.popular ? 'bg-black/10' : 'bg-[#2a2a2a]'}`} />

                <ul className="space-y-3 flex-1">
                  {plan.perks.map(perk => (
                    <li key={perk} className="flex items-start gap-2.5 text-xs">
                      <div className={`mt-0.5 p-0.5 rounded-full ${plan.popular ? 'bg-black/10' : 'bg-yellow-400/10'}`}>
                        <CheckCircle className={`w-3 h-3 ${plan.popular ? 'text-black' : 'text-yellow-400'}`} />
                      </div>
                      <span className={`leading-snug ${plan.popular ? 'text-black/80' : 'text-gray-300'}`}>{perk}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    const planName = `${tier.charAt(0).toUpperCase() + tier.slice(1)} - ${plan.label} Plan`;
                    setSelectedPlan(planName);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`mt-8 w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${plan.popular
                    ? 'bg-black text-yellow-400 hover:scale-[1.02] shadow-lg'
                    : 'bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-[1.02] shadow-lg shadow-yellow-400/5'}`}>
                  Select Plan
                </button>
              </TiltCard>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 py-8 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
              <Target className="w-5 h-5" />
            </div>
            <p className="text-gray-500 text-sm max-w-[200px]">Valid student ID required for student plans.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
              <Heart className="w-5 h-5" />
            </div>
            <p className="text-gray-500 text-sm max-w-[200px]">Couple plans apply to any two members.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ACHIEVEMENTS SECTION
// ─────────────────────────────────────────────
function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-[#111] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">WHY US</p>
          <h2 className="font-display text-5xl md:text-7xl text-white">GYM ACHIEVEMENTS</h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">Five years of relentless dedication, award-winning coaching, and thousands of lives transformed.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div key={a.label}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#1A1A1A] border border-[#2a2a2a] hover:border-yellow-400/50 rounded-2xl p-8 text-center transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-400/20 transition-colors">
                <a.icon className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="font-display text-4xl text-yellow-400 mb-1">{a.value}</p>
              <p className="font-bold text-white text-sm mb-1">{a.label}</p>
              <p className="text-gray-500 text-xs">{a.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COACHES SECTION
// ─────────────────────────────────────────────
function Coaches() {
  const featuredCoach = COACHES[0];
  const teamCoaches = COACHES.slice(1);

  return (
    <section id="coaches" className="py-24 bg-[#111] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">EXPERT TRAINERS</p>
          <h2 className="font-display text-5xl md:text-7xl text-white">OUR COACHES</h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">Learn from the best in the industry. Our certified trainers are dedicated to your success.</p>
        </motion.div>

        {/* Featured Coach - Row 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <TiltCard className="w-full bg-[#1A1A1A] border border-yellow-400/20 rounded-[2.5rem] overflow-hidden group hover:border-yellow-400/50 transition-all shadow-3xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Placeholder for Head Coach */}
              <div className="h-[400px] lg:h-[500px] bg-[#0A0A0A] flex flex-col items-center justify-center p-12 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-32 h-32 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-8 relative z-10">
                  <Award className="w-16 h-16 text-yellow-400/40 group-hover:text-yellow-400 transition-all duration-500 scale-110" />
                </div>
                <div className="relative z-10">
                  <p className="text-yellow-400/60 font-bold text-xs uppercase tracking-[0.4em] mb-4">Master Trainer Slot</p>
                  <h3 className="text-white font-display text-3xl lg:text-4xl mb-2">Photo Ready</h3>
                  <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full" />
                </div>

                {/* Decorative mesh */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#FFD700 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
              </div>

              {/* Content for Head Coach */}
              <div className="p-8 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-yellow-400/20">Featured</span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{featuredCoach.experience}</span>
                </div>
                <h3 className="text-white font-display text-4xl lg:text-6xl mb-4 group-hover:text-yellow-400 transition-colors">{featuredCoach.name}</h3>
                <p className="text-yellow-400 font-bold text-xl mb-6">{featuredCoach.role}</p>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg italic font-medium">"{featuredCoach.bio}"</p>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  <div>
                    <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Specialization</h4>
                    <p className="text-white font-bold">{featuredCoach.specialty}</p>
                  </div>
                  <div>
                    <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Signature Awards</h4>
                    <div className="flex flex-wrap gap-2">
                      {featuredCoach.awards.map(award => (
                        <span key={award} className="text-gray-300 text-xs py-1 px-3 border border-white/10 rounded-lg bg-white/5">{award}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-widest hover:gap-4 transition-all">
                    <span>Trainer Bio</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <div className="flex gap-4 border-l border-white/10 pl-6">
                    <Instagram className="w-5 h-5 text-gray-500 hover:text-yellow-400 cursor-pointer transition-colors" />
                    <Award className="w-5 h-5 text-gray-500 hover:text-yellow-400 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Remaining Coaches - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamCoaches.map((coach, i) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="bg-[#1A1A1A] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-yellow-400/30 transition-all h-full">
                <div className="relative p-6 flex flex-col h-full">
                  {/* Compact Placeholder Slot */}
                  <div className="aspect-[4/3] bg-[#0d0d0d] rounded-2xl mb-6 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden group-hover:border-yellow-400/20 transition-colors">
                    <Users className="w-12 h-12 text-white/5 group-hover:text-yellow-400/20 transition-all duration-500" />
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-2 group-hover:text-yellow-400/40">Avatar Space</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-widest border border-yellow-400/20 px-2 py-0.5 rounded-md bg-yellow-400/5">{coach.specialty.split(' ')[0]}</span>
                      <span className="text-gray-600 font-bold text-[10px] uppercase tracking-widest">{coach.experience.split(' ')[0]} Yrs Exp</span>
                    </div>
                    <h3 className="text-white font-display text-2xl mb-1 group-hover:text-yellow-400 transition-colors">{coach.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 font-medium uppercase tracking-wider">{coach.role}</p>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{coach.bio}</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-3">
                      <Instagram className="w-4 h-4 text-gray-600 hover:text-yellow-400 cursor-pointer" />
                      <Trophy className="w-4 h-4 text-gray-600 hover:text-yellow-400 cursor-pointer" />
                    </div>
                    <button className="text-yellow-400/60 hover:text-yellow-400 transition-colors p-2 bg-yellow-400/5 rounded-full group-hover:scale-110">
                      <Zap className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// GALLERY SECTION
// ─────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">OUR FACILITY</p>
            <h2 className="font-display text-5xl md:text-7xl text-white">PHOTO GALLERY</h2>
          </div>
          <p className="text-gray-400 max-w-sm">Take a virtual tour of our premium training zones and state-of-the-art recovery spaces.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="aspect-square bg-[#1A1A1A] border border-[#2a2a2a] rounded-[2rem] overflow-hidden group cursor-pointer hover:border-yellow-400/50 transition-all shadow-2xl">
                <div className="relative h-full w-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white/[0.02] to-transparent">
                  {/* Glassmorphic Placeholder */}
                  <div className="w-20 h-20 rounded-3xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Star className="w-8 h-8 text-yellow-400/40 group-hover:text-yellow-400 transition-colors" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-yellow-400/60 font-bold text-[10px] uppercase tracking-[0.3em] mb-2 block">{img.category}</span>
                    <h3 className="text-white font-display text-2xl group-hover:text-yellow-400 transition-colors">{img.title}</h3>
                  </div>

                  {/* Empty state overlay */}
                  <div className="absolute inset-x-8 bottom-8 py-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      Image slot ready
                    </span>
                  </div>

                  {/* Animated Background Pulse */}
                  <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/[0.02] transition-colors duration-500" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 py-8 border-t border-[#1a1a1a] text-center"
        >
          <p className="text-gray-500 text-sm">
            Interested in seeing more? <a href="#contact" className="text-yellow-400 font-bold hover:underline">Book a physical tour</a> today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────
function Testimonials() {
  const [isExpanded, setIsExpanded] = useState(false);
  const AVATAR_COLORS = ['#FFD700', '#FFC200', '#FFB300', '#FFE066', '#FFD000', '#FFDC00'];

  const displayedTestimonials = isExpanded ? TESTIMONIALS : TESTIMONIALS.slice(0, 2);

  return (
    <section id="testimonials" className="py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">WHAT THEY SAY</p>
          <h2 className="font-display text-5xl md:text-7xl text-white">TESTIMONIALS</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-24 mt-20 pl-8 pr-4 sm:px-12">
          {displayedTestimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-[30px] p-6 lg:p-8 pt-[90px] lg:pt-[120px] relative flex flex-col h-full card-lift">
              <div className="absolute top-[-40px] lg:top-[-50px] left-[-30px] lg:left-[-50px] rounded-[20px] h-[120px] w-[120px] lg:h-[150px] lg:w-[150px] flex items-center justify-center text-black font-display text-5xl flex-shrink-0 shadow-xl overflow-hidden"
                style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                <span className="opacity-90">{t.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="absolute top-8 right-8 text-yellow-400/10 font-display text-7xl leading-none z-0">"</div>
              <div className="flex flex-col flex-1 relative z-10 mt-2">
                <div className="flex gap-1 mb-4 lg:mb-6">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 flex-1 font-medium">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-[#2a2a2a] pt-4 lg:pt-6 mt-auto">
                  <p className="font-bold text-white text-lg lg:text-xl">{t.name}</p>
                  <p className="text-yellow-400 tracking-wide text-xs lg:text-sm mt-1 uppercase">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {TESTIMONIALS.length > 2 && (
          <motion.div layout className="mt-20 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex flex-col items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors group focus:outline-none"
            >
              <span className="font-bold tracking-widest uppercase text-sm">
                {isExpanded ? 'Show Less' : 'More Reviews'}
              </span>
              <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'animate-bounce'}`} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SCRATCH CARD COMPONENT
// ─────────────────────────────────────────────
function ScratchCard() {
  const canvasRef = useRef(null);
  const [quote, setQuote] = useState('');
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [fullyRevealed, setFullyRevealed] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const lastPos = useRef(null);

  const randomQuote = useCallback(() => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }, []);

  useEffect(() => {
    const newQuote = randomQuote();
    setQuote(newQuote);
    setFullyRevealed(false);
    setRevealed(0);
    lastPos.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width; const H = canvas.height;

    // Draw overlay
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#1a1a1a');
    grad.addColorStop(0.5, '#222222');
    grad.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Pattern - coin scratch texture
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 13px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let y = 30; y < H; y += 30) {
      for (let x = 40; x < W; x += 60) {
        ctx.globalAlpha = 0.15;
        ctx.fillText('SCRATCH', x, y);
      }
    }
    ctx.globalAlpha = 1;

    // Center text
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 18px Syne, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('🪙  SCRATCH TO REVEAL  🪙', W / 2, H / 2 - 10);
    ctx.font = '12px Outfit, sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText('your daily motivation quote', W / 2, H / 2 + 16);
  }, [resetKey, randomQuote]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const scratch = useCallback((e) => {
    if (!isScratching || fullyRevealed) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineWidth = 48;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
    ctx.fill();
    lastPos.current = pos;
    ctx.globalCompositeOperation = 'source-over';

    // Check reveal percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    const pct = (cleared / (canvas.width * canvas.height)) * 100;
    setRevealed(Math.round(pct));
    if (pct > 55) {
      // Auto-clear completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setFullyRevealed(true);
    }
  }, [isScratching, fullyRevealed]);

  const handleReset = () => {
    setResetKey(k => k + 1);
  };

  return (
    <section id="scratch" className="py-24 bg-[#111] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.04),transparent_70%)]" />
      <div className="max-w-2xl mx-auto px-4 relative text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">DAILY MOTIVATION</p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">QUOTE SCRATCH CARD</h2>
          <p className="text-gray-400 mb-10">Scratch the card below to reveal today's motivational quote. A new quote every time!</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-2xl shadow-yellow-400/10"
          style={{ background: 'linear-gradient(135deg, #1a1a1a, #111)' }}>
          {/* Quote underneath */}
          <div className="absolute inset-0 flex items-center justify-center p-8 rounded-2xl bg-[#0d0d0d]">
            <div className="text-center">
              <div className="text-yellow-400 text-5xl mb-4">💬</div>
              <p className="font-display text-2xl md:text-3xl text-white leading-tight">
                &ldquo;{quote}&rdquo;
              </p>
              <p className="text-yellow-400/60 text-sm mt-4">— Arrow Fitness Daily Motivation</p>
            </div>
          </div>

          {/* Scratch canvas on top */}
          <canvas
            key={resetKey}
            ref={canvasRef}
            width={700}
            height={240}
            className="scratch-canvas w-full relative z-10 select-none"
            onMouseDown={e => { setIsScratching(true); lastPos.current = null; scratch(e); }}
            onMouseMove={scratch}
            onMouseUp={() => { setIsScratching(false); lastPos.current = null; }}
            onMouseLeave={() => { setIsScratching(false); lastPos.current = null; }}
            onTouchStart={e => { setIsScratching(true); lastPos.current = null; scratch(e); }}
            onTouchMove={scratch}
            onTouchEnd={() => { setIsScratching(false); lastPos.current = null; }}
          />
        </motion.div>

        {/* Progress & Controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-32 bg-[#222] rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full transition-all"
                style={{ width: `${Math.min(revealed, 100)}%` }} />
            </div>
            <span className="text-gray-500 text-xs">{Math.min(revealed, 100)}% scratched</span>
          </div>
          <button onClick={handleReset}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors font-semibold">
            <span>New Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {fullyRevealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-yellow-400 font-semibold text-sm">
            ✨ Quote revealed! Click "New Quote" to get another one.
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'BMI', href: '#bmi' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Coaches', href: '#coaches' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Quote', href: '#scratch' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-[#222]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img src="/d790da5d-40f0-4378-8d05-98fc8b796c51.png" alt="Arrow Fitness Centre Logo" className="w-10 h-10 object-contain" />
          <span className="font-display text-2xl text-white tracking-wider uppercase">Arrow Fitness <span className="text-yellow-400">Centre</span></span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-gray-400 hover:text-yellow-400 text-sm font-medium transition-colors">{l.label}</a>
          ))}
          <div className="flex items-center gap-4 ml-2 border-l border-[#333] pl-4">
            <a href="https://www.instagram.com/arrowfitnesscentre?igsh=MXYwN2RpZ2xuMHIyZw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://wa.me/918148587871" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-green-500 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.122.54 4.194 1.564 6.027L0 24l6.12-1.605a11.81 11.81 0 005.926 1.583h.005c6.635 0 12.03-5.391 12.033-12.029a11.785 11.785 0 00-3.57-8.528z" />
              </svg>
            </a>
            <a href="#pricing" className="bg-yellow-400 text-black px-5 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors">
              Join Now
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-[#222] overflow-hidden">
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-yellow-400 font-medium transition-colors py-1">{l.label}</a>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <a href="https://wa.me/918148587871" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-300 hover:text-green-500 transition-colors p-2 bg-[#222] rounded-full">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.122.54 4.194 1.564 6.027L0 24l6.12-1.605a11.81 11.81 0 005.926 1.583h.005c6.635 0 12.03-5.391 12.033-12.029a11.785 11.785 0 00-3.57-8.528z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/arrowfitnesscentre?igsh=MXYwN2RpZ2xuMHIyZw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-yellow-400 transition-colors p-2 bg-[#222] rounded-full">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <a href="#pricing" onClick={() => setMenuOpen(false)}
                className="bg-yellow-400 text-black px-5 py-3 rounded-lg text-sm font-bold text-center mt-2">
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
function Hero() {
  const words = ['STRENGTH', 'DISCIPLINE', 'POWER', 'RESULTS'];
  const [wordIdx, setWordIdx] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -250]);

  // Spotlight logic
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    mouseX.set(e.pageX);
    mouseY.set(e.pageY);
  };

  useEffect(() => {
    const timer = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
      onMouseMove={handleMouseMove}
    >
      {/* Background grid */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Dynamic Cursor Spotlight Effect */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* Extraordinary 3D Layered Objects */}
      {/* Object 1: Giant Frosted Ring */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[5%] left-[-5%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full border-[30px] border-yellow-400/5 bg-gradient-to-tr from-white/[0.02] to-transparent backdrop-blur-[4px] pointer-events-none z-10"
        animate={{ rotateX: [0, 360], rotateY: [0, 180, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Object 2: Floating Polygon */}
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[180px] h-[180px] border border-yellow-400/20 bg-yellow-500/[0.02] backdrop-blur-md pointer-events-none z-10"
        style={{ y: y1, clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        animate={{ rotateZ: 360, rotateX: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Object 3: Glass Panel Overlapping Text */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[20%] right-[30%] w-[150px] h-[250px] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[-20px_20px_60px_rgba(255,215,0,0.05)] pointer-events-none z-30"
        animate={{ y: [0, -40, 0], rotateZ: [0, 10, 0], rotateX: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[0%] left-[10%] w-[40vw] h-[40vw] bg-yellow-400/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-0"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0], x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-yellow-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"
      />

      <div className="relative z-40 text-center max-w-6xl mx-auto px-4 pt-16 flex flex-col items-center interactive">
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-5 py-2 mb-10 backdrop-blur-md shadow-[0_0_30px_rgba(255,215,0,0.1)]">
          <Flame className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest uppercase">Award-Winning Gym Facility</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring", damping: 20 }}
          className="font-display text-[5rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight mb-8">
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-yellow-500 bg-[length:200%_auto] block"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            FORGE YOUR
          </motion.span>
          <AnimatePresence mode="wait">
            <motion.span key={wordIdx}
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: 90 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-yellow-400 inline-block drop-shadow-[0_0_40px_rgba(255,215,0,0.3)]"
              style={{ perspective: 1000, display: 'inline-block' }}>
              {words[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-light backdrop-blur-sm">
          Where ordinary people craft extraordinary bodies. Premium equipment, certified coaches, and an elite community.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16 px-4">
          <a href="#pricing"
            className="group relative flex items-center justify-center gap-3 bg-yellow-400 text-black font-extrabold px-10 py-5 rounded-2xl text-lg transition-all shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:shadow-[0_0_60px_rgba(255,215,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 w-[50px] h-[200%] bg-white/50 -translate-x-[400%] -translate-y-1/4 skew-x-[-25deg] group-hover:translate-x-[1000%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">Start Membership <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
          </a>
          <a href="#bmi"
            className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-400/50 hover:bg-white/10 text-white px-10 py-5 rounded-2xl text-lg transition-all shadow-xl">
            <Target className="w-5 h-5 text-yellow-400" />
            Check Your BMI
          </a>
        </motion.div>

        {/* Advanced Glass Stats Bar */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="w-full max-w-5xl px-4 flex justify-center mt-12">
          <TiltCard className="w-full bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-400/10 blur-[100px] rounded-full pointer-events-none z-0" />

            {/* Inner Grid Container */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">

              {/* Left side: Stats Stack */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                {[
                  { v: '2,400+', l: 'MEMBERS', icon: <Users className="w-6 h-6 text-yellow-400" /> },
                  { v: '4', l: 'EXPERT TRAINERS', icon: <Award className="w-6 h-6 text-yellow-400" /> },
                  { v: '4.9★', l: 'GOOGLE RATING', icon: <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" /> },
                ].map((s, idx) => (
                  <div key={s.l} className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-transparent flex items-center justify-center shrink-0 border border-yellow-400/20 shadow-inner">
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-display text-3xl sm:text-4xl text-white mb-1 leading-none drop-shadow-md">{s.v}</p>
                      <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">{s.l}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right side: Live Pulse */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <span className="text-green-500 font-bold text-xs uppercase tracking-widest shadow-green-500/20 drop-shadow-sm">Live Activity Pulse</span>
                    </div>
                    <h3 className="text-white text-3xl sm:text-4xl font-display">142 Members Active Now</h3>
                  </div>

                  {/* Active Avatars */}
                  <div className="flex items-center pl-4 sm:pl-0 shrink-0">
                    {['#FFD700', '#FFC200', '#FFB300', '#FFE066'].map((color, i) => (
                      <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#111] flex items-center justify-center font-bold text-black text-xs sm:text-sm -ml-4 shadow-xl relative"
                        style={{ background: color, zIndex: 10 - i }}>
                        {'AK RS VT MJ'.split(' ')[i]}
                      </div>
                    ))}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#111] flex items-center justify-center text-gray-300 text-xs sm:text-sm font-bold -ml-4 bg-[#222] shadow-xl relative z-0">
                      +138
                    </div>
                  </div>
                </div>

                {/* Animated Bars */}
                <div className="flex items-end gap-1 sm:gap-2 h-24 sm:h-32 w-full mt-auto">
                  {[35, 60, 45, 80, 50, 70, 90, 40, 65, 85, 30, 75, 55, 95, 45, 70, 50, 85, 35, 60, 40, 80, 50, 70, 90, 45, 65, 85, 40, 75].map((v, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-yellow-500/20 to-yellow-400 rounded-t-sm shadow-[0_0_10px_rgba(255,215,0,0.2)]"
                      animate={{ height: [`${v * 0.4}%`, `${v}%`, `${v * 0.4}%`] }}
                      transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, ease: 'easeInOut', delay: (i % 5) * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 flex justify-center pb-8">
          <ChevronDown className="w-8 h-8 text-yellow-400/40" />
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
function Contact({ selectedPlan, setSelectedPlan }) {
  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-yellow-400 font-display tracking-widest text-lg mb-2">GET IN TOUCH</p>
          <h2 className="font-display text-5xl md:text-7xl text-white">CONTACT US</h2>
          <p className="text-gray-400 mt-4">Have questions? Ready to start? Send us a message or visit our gym.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-stretch">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 bg-[#1A1A1A] border border-[#2a2a2a] rounded-2xl p-8 md:p-10 card-lift shadow-2xl flex flex-col justify-center">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent."); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#222] border border-[#333] text-white rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-widest mb-2">Email ID</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-[#222] border border-[#333] text-white rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors" required />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-widest mb-2">Age</label>
                  <input type="number" min="10" max="100" placeholder="e.g. 25" className="w-full bg-[#222] border border-[#333] text-white rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-widest mb-2">Gender</label>
                  <select className="w-full bg-[#222] border border-[#333] text-white rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors" required defaultValue="">
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-widest mb-2">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-[#222] border border-[#333] text-white rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm uppercase tracking-widest mb-2">Package Interested In</label>
                <input
                  type="text"
                  placeholder="e.g. Student - 6 Months Plan"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-[#222] border border-[#333] text-white rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors shadow-inner"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm uppercase tracking-widest mb-2">Queries / Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="w-full bg-[#222] border border-[#333] text-white rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none transition-colors resize-none" required></textarea>
              </div>

              <button type="submit" className="w-full bg-yellow-400 text-black font-bold text-lg uppercase tracking-widest py-4 rounded-xl hover:bg-yellow-300 transition-colors mt-4">
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 h-[400px] lg:h-auto min-h-[400px]">
            <a href="https://maps.app.goo.gl/YWPuNAePnDTrF6t16" target="_blank" rel="noopener noreferrer" className="relative block h-full w-full bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden group hover:border-yellow-400/50 transition-colors shadow-2xl">
              {/* Map stylized background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
              {/* Map routes illustration using SVGs */}
              <svg className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                <path d="M-50,150 Q100,100 200,250 T400,200 T600,100" stroke="rgba(255,215,0,0.4)" strokeWidth="3" fill="none" />
                <path d="M100,-50 Q120,200 150,450" stroke="#333" strokeWidth="4" fill="none" />
                <path d="M300,-50 L250,500" stroke="#444" strokeWidth="2" fill="none" />
                <path d="M0,350 L500,400" stroke="#222" strokeWidth="6" fill="none" />
                <circle cx="200" cy="250" r="4" fill="#FFD700" />
                <circle cx="400" cy="200" r="3" fill="#555" />
              </svg>
              {/* Center Map Pin Context */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)0%,rgba(0,0,0,0.8)100%)]">
                <div className="relative mb-4 group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-30 blur-sm" />
                  <MapPin className="w-14 h-14 text-yellow-400 relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" fill="rgba(0,0,0,0.5)" />
                </div>
                <div className="bg-black/90 backdrop-blur-md px-6 py-4 rounded-xl border border-[#333] text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-yellow-400/30 transition-colors">
                  <p className="text-white font-display text-xl tracking-wider mb-1">ARROW FITNESS CENTRE</p>
                  <p className="text-gray-400 text-sm">Erode, TamilNadu</p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                    <span>Get Directions</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1a1a1a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/d790da5d-40f0-4378-8d05-98fc8b796c51.png" alt="Arrow Fitness Centre Logo" className="w-10 h-10 object-contain" />
              <span className="font-display text-2xl text-white tracking-wider uppercase">Arrow Fitness <span className="text-yellow-400">Centre</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Premium gym experience with certified trainers, state-of-the-art equipment, and a community that never quits.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 mt-6">
              <a href="https://maps.app.goo.gl/YWPuNAePnDTrF6t16" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-yellow-400 text-xs transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Erode, TamilNadu</span>
              </a>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Phone className="w-4 h-4" />
                <span>+91 8754761799</span>
              </div>
              <a href="https://wa.me/918148587871" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-500 hover:text-green-500 transition-colors sm:ml-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.122.54 4.194 1.564 6.027L0 24l6.12-1.605a11.81 11.81 0 005.926 1.583h.005c6.635 0 12.03-5.391 12.033-12.029a11.785 11.785 0 00-3.57-8.528z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/arrowfitnesscentre?igsh=MXYwN2RpZ2xuMHIyZw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-yellow-400 transition-colors sm:ml-2">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-4">Quick Links</p>
            <ul className="space-y-2">
              {['BMI Calculator', 'Pricing Plans', 'Achievements', 'Testimonials', 'Quote of the Day'].map(l => (
                <li key={l}><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-4">Hours</p>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Mon – Fri: <span className="text-white">5:00 AM – 11:00 PM</span></li>
              <li>Saturday: <span className="text-white">5:00 AM – 10:00 PM</span></li>
              <li>Sunday: <span className="text-white">7:00 AM – 8:00 PM</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Arrow Fitness Centre. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built with 💪 for champions</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('');

  return (
    <div className="min-h-screen bg-[#111111]">
      <CustomCursor />
      <Navbar />
      <Hero />
      <BMICalculator />
      <TransformationMarquee />
      <Pricing setSelectedPlan={setSelectedPlan} />
      <Achievements />
      <Coaches />
      <Gallery />
      <Testimonials />
      <ScratchCard />
      <Contact selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      <Footer />
    </div>
  );
}
