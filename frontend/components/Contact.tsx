import React from 'react';

interface ContactProps {
  website: string;
  telegram: string;
  discord: string;
  twitter: string;
}

const Contact: React.FC<ContactProps> = ({ website, telegram, discord, twitter }) => {
  return (
    <div className="flex items-center">
      <h2 className="text-xl font-semibold mr-2">Contact information:</h2>
      <div className="flex space-x-2">
        <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"><strong>Website</strong></a>,
        <a href={telegram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"><strong>Telegram</strong></a>,
        <a href={discord} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"><strong>Discord</strong></a>,
        <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"><strong>Twitter</strong></a>
      </div>
    </div>
  );
};

export default Contact;