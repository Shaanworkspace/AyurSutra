const LoadingPage = () => {
  return (
    <div className="flex h-screen justify-center items-center text-gray-600">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-500 mr-3"></div>
      <span className="text-lg">Fetching dashboard...</span>
    </div>
  );
};

export default LoadingPage;