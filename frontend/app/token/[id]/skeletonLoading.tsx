import Container from "@/components/Container";
const SkeletonLoading = () => (
    <Container className="p-4 md:p-8 animate-pulse">
        <div className="text-center mb-8">
            <div className="h-10 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
                <div className="bg-gray-700 rounded-lg w-full h-96"></div>
            </div>
            <div className="md:w-1/2 space-y-4">
                <div className="h-8 bg-gray-700 rounded w-full mb-4"></div>
                <div className="h-40 bg-gray-700 rounded w-full"></div>
                <div className="h-40 bg-gray-700 rounded w-full"></div>
            </div>
        </div>
        <div className="mt-8">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
        </div>
    </Container>
);

export default SkeletonLoading;