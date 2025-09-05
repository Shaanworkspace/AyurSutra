import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, MessageSquare, User as UserIcon, Settings,
  LogOut, Clock, ChevronRight, Sun, Moon, Bell, CheckCircle2, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../layout/Header';

// Inline notifications dropdown (self-contained)
function InlineDropdown() {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const btnRef = React.useRef(null);

  // Sample notifications
  const [items, setItems] = React.useState([
    { id: 1, title: 'New assignment scheduled', meta: 'Today -  10:00 AM', unread: true },
    { id: 2, title: 'Therapist changed to Rahul', meta: 'Today -  9:30 AM', unread: true },
    { id: 3, title: 'Feedback pending for Day 3', meta: 'Yesterday -  6:15 PM', unread: false },
  ]);

  const unreadCount = items.filter(i => i.unread).length;

  React.useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, unread: false })));
  const clearAll = () => setItems([]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        className="hidden md:inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <span className='font-bold text-gray-700'>Notifications</span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.16l-4.24 3.36a.75.75 0 0 1-.94 0L5.21 8.39a.75.75 0 0 1 .02-1.18z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none"
        >
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-sm font-semibold text-gray-800">Notifications</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-emerald-700 hover:underline disabled:text-gray-400"
                disabled={unreadCount === 0}
              >
                Mark all read
              </button>
              <span className="text-gray-300">- </span>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-rose-600 hover:underline disabled:text-gray-400"
                disabled={items.length === 0}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="h-px w-full bg-gray-200" />

          <div className="max-h-80 overflow-auto p-1">
            {items.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              items.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className="flex w-full items-start gap-3 rounded-md px-3 py-2 text-left hover:bg-gray-50"
                  onClick={() => {
                    setItems(prev => prev.map(i => i.id === item.id ? { ...i, unread: false } : i));
                  }}
                >
                  <span
                    className={`mt-1 h-2 w-2 rounded-full ${item.unread ? 'bg-emerald-600' : 'bg-gray-300'}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="truncate text-xs text-gray-500">{item.meta}</p>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="h-px w-full bg-gray-200" />
          <div className="flex items-center justify-between px-3 py-2">
            <button
              type="button"
              className="text-xs text-gray-600 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="text-xs font-medium text-emerald-700 hover:underline"
              onClick={() => setOpen(false)}
            >
              View all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Data and utilities
const patientData = {
  fullName: 'PriyaSharma',
  email: 'priya@example.com',
  treatmentPlan: { name: '7‑din ki Shodhan Chikitsa', totalDays: 7, currentDay: 3 },
  todaySession: {
    therapyName: 'Abhyanga (Full Body Massage)',
    time: '10:00 AM',
    therapist: 'Rahul Verma',
    pre_instructions: 'Therapy se 2 ghante pehle kuch na khayein.',
    post_instructions: 'Garam paani se snan karein aur halka bhojan lein.'
  },
  assignment: {
    byDoctor: { name: 'Dr. Meera', time: '09:12 AM' },
    therapistAssigned: { name: 'Rahul Verma', busyLevel: 'Medium' },
    slotStatus: 'Awaiting Slot',
    slot: { date: 'Wed, 03 Sep', time: '10:00 AM', room: 'T2' }
  },
  upcomingSessions: [
    { day: 4, therapyName: 'Shirodhara', status: 'Assigned', eta: 'Pending Slot' },
    { day: 5, therapyName: 'Swedana', status: 'Assigned', eta: 'Pending Slot' },
    { day: 6, therapyName: 'Virechana Prep', status: 'Draft', eta: 'TBD' }
  ],
  lastSessionFeedbackPending: true
};

const SidebarLink = ({ icon: Icon, text, active }) => (
  <Link
    to="#"
    className={`flex items-center py-3 px-4 my-1 rounded-lg transition-colors ${active ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="truncate">{text}</span>
  </Link>
);

const Chip = ({ children, tone = 'gray' }) => {
  const map = {
    gray: 'bg-gray-100 text-gray-700',
    green: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700'
  };
  return <span className={`text-xs px-2.5 py-1 rounded-full ${map[tone]}`}>{children}</span>;
};

// Donut pie (static SVG arcs — no animation)
const Donut = ({ segments, size = 170, stroke = 22, centerColor }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let acc = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
        <circle r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        {segments.map((s) => {
          const value = Math.max(0, Math.min(100, s.value));
          const dash = (value / 100) * circumference;
          const gap = circumference - dash;
          const rot = (acc / 100) * 360;
          acc += value;
          return (
            <circle
              key={`${s.label}-${s.color}`}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="butt"
              transform={`rotate(${rot})`}
            />
          );
        })}
      </g>
      <foreignObject x={size / 2 - 44} y={size / 2 - 28} width="88" height="56">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: centerColor }}>
              {Math.min(100, segments.reduce((a, b) => a + b.value, 0))}%
            </div>
            <div className="text-[11px] text-gray-500">Overall</div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const sheet = {
  hidden: { y: 40, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 24 } },
  exit: { y: 30, opacity: 0, transition: { duration: 0.15 } }
};

const PatientDashboard = () => {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  // Normalize name
  const raw = patientData.fullName || '';
  const guess = raw.replace(/([a-z])([A-Z])/g, '$1 $2');
  const [first, ...rest] = guess.trim().split(/\s+/);
  const displayName = [first, rest.join(' ')].filter(Boolean).join(' ');
  const initials = displayName.split(' ').map(n => n).join('').slice(0, 2);

  const isEvening = new Date().getHours() >= 18;

  const slotTone =
    patientData.assignment.slotStatus === 'Slot Fixed'
      ? 'green'
      : patientData.assignment.slotStatus === 'Awaiting Slot'
        ? 'amber'
        : patientData.assignment.slotStatus === 'Completed'
          ? 'blue'
          : 'gray';[1]

  // Donut segments + dynamic colors (distinct)
  const colorForPctBand = (p) => (p <= 33 ? '#ef4444' : p <= 66 ? '#f59e0b' : '#059669');
  const overall = Math.round((patientData.treatmentPlan.currentDay / patientData.treatmentPlan.totalDays) * 100);
  const band = (p) => (p <= 33 ? 0 : p <= 66 ? 1 : 2);
  const huePrep = ['#ef4444', '#ec4899', '#a21caf'];
  const hueTherapy = ['#f59e0b', '#ea580c', '#eab308'];
  const hueRecovery = ['#14b8a6', '#059669', '#22c55e'];
  const colorFor = (label, val) => {
    const i = band(val);
    if (label === 'Prep') return huePrep[i];
    if (label === 'Therapy') return hueTherapy[i];
    return hueRecovery[i];
  };

  const segments = React.useMemo(() => {
    const arr = [
      { label: 'Prep', value: Math.min(20, overall) },
      { label: 'Therapy', value: Math.max(0, Math.min(60, overall - 20)) },
      { label: 'Recovery', value: Math.max(0, overall - 80) }
    ];
    return arr.map(s => ({ ...s, color: colorFor(s.label, s.value) }));
  }, [overall]);

  const [sessionFeedback, setSessionFeedback] = React.useState({ rating: null, notes: '' });
  const submitSessionFeedback = () => {
    if (!sessionFeedback.rating && !sessionFeedback.notes.trim()) return;
    console.log('Session feedback:', sessionFeedback);
    setSessionFeedback({ rating: null, notes: '' });
  };

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: displayName,
    email: patientData.email || '',
    symptoms: '',
    onsetDate: '',
    onsetTime: '',
    severity: 'Moderate',
    bodyArea: '',
    notes: ''
  });
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Symptom report:', form);
    setIsFormOpen(false);
  };

  const [issue, setIssue] = React.useState({ tags: [], severity: 'Moderate', notes: '' });
  const tags = ['Pain', 'Dizziness', 'Nausea', 'Allergy', 'Other'];
  const toggleTag = (t) =>
    setIssue((s) => ({ ...s, tags: s.tags.includes(t) ? s.tags.filter((x) => x !== t) : [...s.tags, t] }));
  const submitIssue = () => {
    if (!issue.tags.length && !issue.notes.trim()) return;
    console.log('After-therapy issue:', issue);
    setIssue({ tags: [], severity: 'Moderate', notes: '' });
  };
  const [isCheckInOpen, setIsCheckInOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <div className="fixed inset-x-0 top-0 z-50">
        <Header />
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 bg-white shadow-xl flex-shrink-0 flex flex-col h-[calc(100vh-6rem)] sticky top-24">
          <div className="p-5 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white grid place-items-center text-lg font-bold">
                {initials}
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900 leading-5">{displayName}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 overflow-auto">
            <SidebarLink icon={LayoutDashboard} text="Dashboard" active />
            <SidebarLink icon={Calendar} text="My Schedule" />
            <SidebarLink icon={MessageSquare} text="Feedback" />
            <SidebarLink icon={UserIcon} text="Profile" />
            <SidebarLink icon={Settings} text="Settings" />
          </nav>

          <div className="p-4 border-t">
            <button className="w-full flex items-center justify-start gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto">
            {/* Greeting + Actions */}
            <motion.div variants={itemVariants} className="mb-6 flex items-start justify-between gap-6">
              <div>
                <h1 className="text-[28px] lg:text-[36px] leading-8 lg:leading-10 font-extrabold tracking-tight font-display text-gray-900">
                  Namaste, {displayName}!
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-md"
                >
                  Report Symptoms
                </button>

                {/* Notifications dropdown (inline) */}
                <InlineDropdown />
              </div>
            </motion.div>

            {/* Aaj ka Nirdesh */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Aaj ka Nirdesh</h2>
                  <p className="text-green-100">Day {patientData.treatmentPlan.currentDay} of {patientData.treatmentPlan.totalDays}</p>
                </div>
                <div className="flex items-center gap-2 text-green-100 bg-green-900/30 px-3 py-1 rounded-full text-sm">
                  {isEvening ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long' })}</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-white text-green-600 rounded-lg grid place-items-center mr-4">
                      <Clock className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{patientData.todaySession.therapyName}</h3>
                      <p className="text-green-100">{patientData.todaySession.time} -  Therapist: {patientData.todaySession.therapist}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-50"><span className="font-semibold text-white">Pre:</span> {patientData.todaySession.pre_instructions}</p>
                    <p className="text-green-50"><span className="font-semibold text-white">Post:</span> {patientData.todaySession.post_instructions}</p>
                  </div>
                </div>
                <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
                  <h4 className="font-semibold mb-4">Flow Status</h4>
                  <div className="flex flex-wrap gap-3">
                    <Chip tone="green"><CheckCircle2 className="inline w-4 h-4 mr-1" />Assigned by {patientData.assignment.byDoctor.name}</Chip>
                    <Chip tone="blue">Therapist: {patientData.assignment.therapistAssigned.name}</Chip>
                    <Chip tone={slotTone}>{patientData.assignment.slotStatus}</Chip>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scheduled Therapies */}
            <motion.section variants={itemVariants}>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Scheduled Therapies</h3>
                  <Chip tone={slotTone}>{patientData.assignment.slotStatus}</Chip>
                </div>
                <div className="space-y-3">
                  {[patientData.todaySession, ...patientData.upcomingSessions].slice(0, 3).map((s, idx) => {
                    const isToday = idx === 0;
                    const title = s.therapyName;
                    const meta = isToday ? `${patientData.todaySession.time} -  Therapist ${patientData.todaySession.therapist}` : `Day ${s.day} -  ${s.eta}`;
                    const right = isToday ? patientData.assignment.slotStatus : s.status;
                    const tone = right === 'Slot Fixed' ? 'green' : right === 'Assigned' ? 'blue' : right?.includes('Pending') ? 'amber' : 'gray';
                    return (
                      <motion.div key={idx} whileHover={{ y: -2 }} className="p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-all border border-gray-100">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center font-bold">{idx + 1}</div>
                            <div>
                              <p className="font-semibold text-gray-800">{title}</p>
                              <p className="text-sm text-gray-500">{meta}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Chip tone={tone}>{right}</Chip>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <Link to="/schedule" className="text-emerald-700 font-medium hover:underline">View all in Schedule</Link>
                </div>
              </div>
            </motion.section>

            {/* Progress + Feedback row */}
            <div className="grid grid-cols-12 gap-6 mt-6 items-stretch">
              {/* Progress (left) */}
              <div className="col-span-12 lg:col-span-6">
                <motion.section variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Chikitsa Pragati</h3>
                  <p className="text-gray-600 mb-4"> {patientData.treatmentPlan.name} </p>
                  <div className={`flex-1 grid gap-4 items-center transition-all duration-300 ${isCheckInOpen ? 'grid-cols-1 place-items-center text-center' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    <div className="flex items-center justify-center">
                      <Donut segments={segments} size={170} stroke={22} centerColor={colorForPctBand(overall)} />
                    </div>
                    <div className={`space-y-3 ${isCheckInOpen ? 'w-full max-w-xs mx-auto' : ''}`}>
                      {segments.map(s => (
                        <div key={s.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
                            <span className="text-sm text-gray-700">{s.label}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{s.value}%</span>
                        </div>
                      ))}
                      <div className="!mt-4 grid grid-cols-3 gap-3 text-xs">
                        <div className="bg-emerald-50 text-emerald-700 rounded-lg p-3 text-center">
                          <div className="font-bold text-lg">{patientData.treatmentPlan.currentDay}</div>
                          <div>Completed</div>
                        </div>
                        <div className="bg-teal-50 text-teal-700 rounded-lg p-3 text-center">
                          <div className="font-bold text-lg">{patientData.treatmentPlan.totalDays - patientData.treatmentPlan.currentDay}</div>
                          <div>Remaining</div>
                        </div>
                        <div className="bg-green-50 text-green-700 rounded-lg p-3 text-center">
                          <div className="font-bold text-lg">{overall}%</div>
                          <div>Overall</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              </div>

              {/* Feedback (right) */}
              <div className="col-span-12 lg:col-span-6">
                {patientData.lastSessionFeedbackPending && (
                  <motion.section variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
                    <div>
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full grid place-items-center mr-3">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Session feedback</h3>
                      </div>
                      <div className="grid grid-cols-5 gap-2 mb-4 text-2xl">
                        {['😞', '😐', '😊', '😁', '🤩'].map((e, idx) => (
                          <motion.button
                            key={e}
                            type="button"
                            whileHover={{ scale: 1.15 }}
                            onClick={() => setSessionFeedback(s => ({ ...s, rating: idx + 1 }))}
                            className={`rounded-lg py-2 ${sessionFeedback.rating === idx + 1 ? 'bg-green-100' : 'bg-gray-50 hover:bg-green-50'}`}
                          >
                            {e}
                          </motion.button>
                        ))}
                      </div>
                      <textarea
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm mb-4"
                        rows={3}
                        placeholder="Short feedback (optional)"
                        value={sessionFeedback.notes}
                        onChange={(e) => setSessionFeedback(s => ({ ...s, notes: e.target.value }))}
                      />
                      <button
                        onClick={submitSessionFeedback}
                        disabled={!sessionFeedback.rating && !sessionFeedback.notes.trim()}
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        Submit feedback
                      </button>
                    </div>
                    <div className="flex-1" />


                    <div className="mt-5">
                      <button
                        onClick={() => setIsCheckInOpen(prev => !prev)}
                        className="w-full flex justify-between items-center cursor-pointer text-base font-semibold text-gray-900"
                      >
                        <span>After-therapy check-in</span>
                        <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${isCheckInOpen ? 'rotate-90' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isCheckInOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: '12px' }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >

                            <div className="flex flex-wrap gap-2 mb-3">
                              {tags.map(t => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => toggleTag(t)}
                                  className={`px-3 py-1.5 rounded-full text-sm border ${issue.tags.includes(t) ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-gray-300 text-gray-700'}`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-sm text-gray-600 mb-1">Severity</label>
                                <select
                                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2"
                                  value={issue.severity}
                                  onChange={(e) => setIssue(s => ({ ...s, severity: e.target.value }))}
                                >
                                  <option>Mild</option>
                                  <option>Moderate</option>
                                  <option>Severe</option>
                                </select>
                              </div>
                            </div>
                            <textarea
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm mb-3"
                              rows={2}
                              placeholder="Describe what you felt after therapy"
                              value={issue.notes}
                              onChange={(e) => setIssue(s => ({ ...s, notes: e.target.value }))}
                            />
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={submitIssue}
                                __ disabled={!issue.tags.length && !issue.notes.trim()}
                                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Submit issue
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.section>
                )}
              </div>
            </div>
          </motion.div>
        </main>
      </div>


      {/* Symptom Report Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div className="fixed inset-0 z- flex items-center justify-center" variants={backdrop} initial="hidden" animate="visible" exit="hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsFormOpen(false)} />
            <motion.div variants={sheet} initial="hidden" animate="visible" exit="exit" onClick={(e) => e.stopPropagation()} className="relative w-[92vw] max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
              <button onClick={() => setIsFormOpen(false)} aria-label="Close" className="absolute right-3 top-3 p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Report Symptoms</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block text sm text-gray-600 mb-1">Symptoms summary</label>
                  <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={3} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Onset date</label>
                    <input name="onsetDate" type="date" value={form.onsetDate} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Onset time</label>
                    <input name="onsetTime" type="time" value={form.onsetTime} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Severity</label>
                    <select name="severity" value={form.severity} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2">
                      <option>Mild</option>
                      <option>Moderate</option>
                      <option>Severe</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Affected area/body part</label>
                    <input name="bodyArea" value={form.bodyArea} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Notes (optional)</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Submit</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientDashboard;