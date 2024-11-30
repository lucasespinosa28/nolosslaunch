import { TokenSepolia } from '@/app/page';
import TokenInfoCard from '@/components/ui/tokenInfoCard';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';

type TokenGridProps = {
  title: string;
  tokens: TokenSepolia[] | undefined;
  isLoading: boolean;
  error: any;
};

export default function TokenGrid({ title, tokens, isLoading, error }: TokenGridProps) {
  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error.message} />;

  return (
    <section className="py-8">
      <h3 className="text-2xl font-bold text-center mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {tokens && tokens.map((token: TokenSepolia) => (
          <TokenInfoCard key={token.id} contractAddress={token.tokenAddress as `0x${string}`} />
        ))}
      </div>
    </section>
  );
}