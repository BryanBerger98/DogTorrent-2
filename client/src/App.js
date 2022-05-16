import Navbar from './common/components/Navbar';
import Torrents from './Torrents/components/Torrents';

function App() {

  return (
    <div className="h-screen bg-slate-100">
      <Navbar />
      <Torrents />
    </div>
  );
}

export default App;
