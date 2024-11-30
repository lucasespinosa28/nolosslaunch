import Container from "@/components/Container";
const ErrorComponent = () => (
    <Container className="p-4 md:p-8">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-gray-300">An error occurred while loading token information.</p>
            <p className="text-gray-400 mt-2">Please try again later or contact support if the problem persists.</p>
        </div>
    </Container>
);

export default ErrorComponent;