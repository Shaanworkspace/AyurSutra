import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronRight } from 'lucide-react';

const FeedBack = () => {
  const [sessionFeedBack, setSessionFeedBack] = React.useState({ rating: null, notes: '' });
  const [isCheckInOpen, setIsCheckInOpen] = React.useState(false);
  const [issue, setIssue] = React.useState({ tags: [], severity: 'Moderate', notes: '' });
  const tags = ['Pain', 'Dizziness', 'Nausea', 'Allergy', 'Other'];

  const submitSessionFeedBack = () => {
    if (!sessionFeedBack.rating && !sessionFeedBack.notes.trim()) return;
    console.log('Session feedBack:', sessionFeedBack);
    setSessionFeedBack({ rating: null, notes: '' });
  };

  const toggleTag = (t) =>
    setIssue((s) => ({ ...s, tags: s.tags.includes(t) ? s.tags.filter((x) => x !== t) : [...s.tags, t] }));

  const submitIssue = () => {
    if (!issue.tags.length && !issue.notes.trim()) return;
    console.log('After-therapy issue:', issue);
    setIssue({ tags: [], severity: 'Moderate', notes: '' });
  };

  return (
    <motion.section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
      <div>
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full grid place-items-center mr-3">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Session feedBack</h3>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-4 text-2xl">
          {['😞', '😐', '😊', '😁', '🤩'].map((e, idx) => (
            <motion.button
              key={e}
              type="button"
              whileHover={{ scale: 1.15 }}
              onClick={() => setSessionFeedBack(s => ({ ...s, rating: idx + 1 }))}
              className={`rounded-lg py-2 ${sessionFeedBack.rating === idx + 1 ? 'bg-green-100' : 'bg-gray-50 hover:bg-green-50'}`}
            >
              {e}
            </motion.button>
          ))}
        </div>
        <textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm mb-4"
          rows={3}
          placeholder="Short feedBack (optional)"
          value={sessionFeedBack.notes}
          onChange={(e) => setSessionFeedBack(s => ({ ...s, notes: e.target.value }))}
        />
        <button
          onClick={submitSessionFeedBack}
          disabled={!sessionFeedBack.rating && !sessionFeedBack.notes.trim()}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Submit feedBack
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
                  disabled={!issue.tags.length && !issue.notes.trim()}
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
  );
};

export default FeedBack;