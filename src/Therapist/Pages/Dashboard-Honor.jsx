const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // header menu + sidebar

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="flex pt-24 px-4 lg:px-6"> 
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <main className="flex-1 lg:ml-64 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AvailableSlots />
            <OngoingTherapies />
            <TherapyRequests />
            <RescheduleOptions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;