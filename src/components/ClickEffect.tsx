import { useEffect } from 'react';

const ClickEffect = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const circle = document.createElement('div');
      circle.className = 'click-effect';
      circle.style.left = `${event.clientX - 10}px`; // Adjust for circle size
      circle.style.top = `${event.clientY - 10}px`; // Adjust for circle size
      document.body.appendChild(circle);

      setTimeout(() => {
        document.body.removeChild(circle);
      }, 400); 
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ClickEffect;