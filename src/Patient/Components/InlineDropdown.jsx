import React from 'react';
import { Bell } from 'lucide-react';

const InlineDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const btnRef = React.useRef(null);

  const [items, setItems] = React.useState([
    { id: 1, title: 'New assignment scheduled', meta: 'Today - 10:00 AM', unread: true },
    { id: 2, title: 'Therapist changed to Rahul', meta: 'Today - 9:30 AM', unread: true },
    { id: 3, title: 'Feedback pending for Day 3', meta: 'Yesterday - 6:15 PM', unread: false },
  ]);

  const unreadCount = React.useMemo(() => 
    items.filter(i => i.unread).length,
    [items]
  );

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
    
    function onKey(e) { 
      if (e.key === 'Escape') setOpen(false);
      
      if (!open || !menuRef.current) return;
      
      const menuItems = menuRef.current.querySelectorAll('button[role="menuitem"]');
      if (!menuItems.length) return;
      
      const currentIndex = Array.from(menuItems).indexOf(document.activeElement);
      let nextIndex;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = currentIndex + 1 >= menuItems.length ? 0 : currentIndex + 1;
          menuItems[nextIndex].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = currentIndex - 1 < 0 ? menuItems.length - 1 : currentIndex - 1;
          menuItems[nextIndex].focus();
          break;
      }
    }
    
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const markAllRead = React.useCallback(() => 
    setItems(prev => prev.map(i => ({ ...i, unread: false }))),
    []
  );
  
  const clearAll = React.useCallback(() => 
    setItems([]),
    []
  );

  return (
    <div className="relative inline-block text-left">
      {/* Desktop button */}
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
      
      {/* Mobile button */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100"
        aria-label="Notifications"
      >
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
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
              <span className="text-gray-300">-</span>
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
                  role="menuitem"
                  aria-label={`${item.title} - ${item.meta}${item.unread ? ' (unread)' : ''}`}
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
};

export default InlineDropdown;