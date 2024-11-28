import { useEffect, useState } from 'react';

interface ProgressBarProps {
    totalSupply: number;
    maxSupply: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSupply, maxSupply }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const percentage = (totalSupply / maxSupply) * 100;

    return (
        <>
            <div className="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                        mounted ? 'animate-gradient-x bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900 bg-[length:200%_100%]' : 'bg-indigo-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
                {percentage.toFixed(1)}% Filled
            </p>
        </>
    );
};
export default ProgressBar;