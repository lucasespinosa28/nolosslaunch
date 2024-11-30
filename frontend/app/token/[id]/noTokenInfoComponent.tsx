import Container from "@/components/Container";

const NoTokenInfoComponent = () => (
    <Container className="p-4 md:p-8">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">No Token Information</h2>
            <p className="text-gray-300">No token information is available for this address.</p>
            <p className="text-gray-400 mt-2">Please check the token address and try again.</p>
        </div>
    </Container>
);

export default NoTokenInfoComponent;