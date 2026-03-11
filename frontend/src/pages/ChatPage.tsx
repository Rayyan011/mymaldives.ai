import { useState } from 'react';
import { useAuth, UserButton } from '@clerk/react';
import { Link } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import BookingForm from '../components/BookingForm';
import { useChat } from '../hooks/useChat';

export default function ChatPage() {
  const { messages, sendMessage, isLoading } = useChat();
  const { isSignedIn } = useAuth();
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-ocean-100/30 to-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 shadow-sm">
        <Link to="/" className="text-lg font-bold text-ocean-900">
          MyMaldives.ai
        </Link>
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <button
                onClick={() => setShowBooking(true)}
                className="text-xs px-3 py-1.5 rounded-full bg-coral-500 text-white hover:bg-coral-600 transition-colors"
              >
                Book a Resort
              </button>
              <UserButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="text-xs text-ocean-700 hover:text-ocean-900 font-medium"
            >
              Sign in for personalized recs
            </Link>
          )}
        </div>
      </header>

      {/* Chat */}
      <ChatWindow messages={messages} isLoading={isLoading} />
      <MessageInput onSend={sendMessage} disabled={isLoading} />

      {/* Booking Modal */}
      {showBooking && (
        <BookingForm
          onClose={() => setShowBooking(false)}
          onSuccess={(msg) => {
            sendMessage(msg);
          }}
        />
      )}
    </div>
  );
}
