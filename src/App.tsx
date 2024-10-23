import React, { useState } from 'react';
import { Download, History, X, AlertCircle } from 'lucide-react';

interface HistoryItem {
  url: string;
  timestamp: Date;
}

function App() {
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a valid Bluesky URL');
      return;
    }
    
    if (!url.includes('bsky.app')) {
      setError('Please enter a valid Bluesky URL');
      return;
    }

    // Add to history
    setHistory(prev => [{
      url,
      timestamp: new Date()
    }, ...prev.slice(0, 9)]);

    // TODO: Implement actual download logic
    // For now, just clear the input
    setUrl('');
    setError('');
  };

  const clearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto pt-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bluesky Media Downloader
          </h1>
          <p className="text-gray-600">
            Download videos and GIFs from Bluesky with just one click
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your Bluesky video or GIF URL here"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {url && (
              <button
                onClick={() => setUrl('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 mt-2">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="mt-4 flex gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Download size={20} />
              Download
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <History size={20} />
              History
            </button>
          </div>
        </div>

        {showHistory && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Download History</h2>
              <button
                onClick={clearHistory}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear History
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No download history yet</p>
            ) : (
              <div className="space-y-3">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-600 truncate flex-1 mr-4">
                      {item.url}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Download your favorite Bluesky content easily and securely.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;