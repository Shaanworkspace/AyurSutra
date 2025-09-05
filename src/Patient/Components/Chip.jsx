const Chip = ({ children, tone = 'gray' }) => {
  const map = {
    gray: 'bg-gray-100 text-gray-700',
    green: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700'
  };
  return <span className={`text-xs px-2.5 py-1 rounded-full ${map[tone] || map.gray}`}>{children}</span>;
};

export default Chip;