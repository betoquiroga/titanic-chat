import { Chat } from '../components/chat/Chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="h-screen">
        <Chat />
      </div>
    </div>
  );
}
