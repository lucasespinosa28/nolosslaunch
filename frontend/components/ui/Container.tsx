import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <main className={`p-8 flex justify-center shadow max-w-7xl mx-auto ${className}`}>
      <section className="flex flex-col w-full max-w-[1280px] mx-auto bg-gradient-to-b from-gray-800 to-gray-900  p-4 rounded-xl shadow-lg">
        {children}
      </section>
    </main>
  );
};

export default Container;