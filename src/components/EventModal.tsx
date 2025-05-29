import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  content?: string;
}

const md = new MarkdownIt();

function EventModal({ isOpen, onClose, title, description, content }: EventModalProps) {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && content) {
      fetch(`/data/event/${content}`)
        .then(response => response.text())
        .then(text => {
          setMarkdownContent(md.render(text));
        })
        .catch(error => {
          console.error('Error loading markdown content:', error);
          setMarkdownContent('');
        });
    }
  }, [isOpen, content]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white dark:bg-dark-200 transform transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}
      style={{ 
        animation: !isClosing ? 'modalEnter 0.3s ease-out forwards' : undefined 
      }}
    >
      {/* 关闭按钮 */}
      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* 内容区域 */}
      <div className="h-full overflow-y-auto p-6 md:p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
        {content ? (
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: markdownContent || md.render(description) }}
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        )}
      </div>
    </div>
  );
}

export default EventModal; 