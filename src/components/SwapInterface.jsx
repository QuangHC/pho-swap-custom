import CreatePoolComponent from './CreatePoolComponent.jsx';
import SwapComponent from './SwapComponent';

const SwapInterface = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Create Pool</h2>
                    <CreatePoolComponent />
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Swap Tokens</h2>
                    <SwapComponent />
                </div>
            </div>
        </div>
    );
};

export default SwapInterface;