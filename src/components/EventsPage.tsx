import { useState } from 'react';
import { events } from '../config/events';
import EventModal from './EventModal';

interface EventsPageProps {
  onEventSelect: (index: number) => void;
}

function EventsPage({ onEventSelect }: EventsPageProps) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-36rem)]">
      <div className="w-full h-full overflow-y-auto px-4">
        <div className="w-full max-w-2xl mx-auto space-y-6 py-4">
          {events.map((event, index) => (
            <div 
              key={index}
              className="relative bg-white/70 dark:bg-dark-300/60 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => onEventSelect(index)}
            >
              {/* 时间线 */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/30 rounded-full"></div>
              
              {/* 日期 */}
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {formatDate(event.date)}
              </div>
              
              {/* 标题 */}
              <h3 className="text-xl font-bold text-primary mb-3">
                {event.title}
              </h3>
              
              {/* 描述 */}
              <p className="text-gray-700 mb-4">
                {event.description}
              </p>
              
              {/* 图片（如果有） */}
              {event.image && (
                <div className="mt-4">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 模态框 */}
      {selectedEvent !== null && (
        <EventModal
          isOpen={true}
          onClose={() => setSelectedEvent(null)}
          title={events[selectedEvent].title}
          description={events[selectedEvent].description}
          content={events[selectedEvent].content}
        />
      )}
    </div>
  );
}

export default EventsPage; 