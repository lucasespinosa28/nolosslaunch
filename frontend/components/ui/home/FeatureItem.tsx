export function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex items-start">
            <div className="bg-yellow-400 rounded-full p-2 mr-3">
                {icon}
            </div>
            <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </div>
    );
}
