// components/CreatePoolComponent.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import { useUniswap } from '../hook/useUniswap.js';

// pool address: 0x3C12Ca2cDC7d4C48010C8a8c9CDeAD83f25A874E
const CreatePoolComponent = () => {
    const { createPool, loading, error } = useUniswap();
    const [tokenA, setTokenA] = useState('');
    const [tokenB, setTokenB] = useState('');
    const [fee, setFee] = useState(3000);

    const handleCreatePool = async () => {
        console.log(tokenA, tokenB);
        if (!ethers.isAddress(tokenA) || !ethers.isAddress(tokenB)) {
            alert('Invalid token addresses');
            return;
        }

        try {
            const poolAddress = await createPool(tokenA, tokenB, fee);
            alert(`Pool created successfully at ${poolAddress}`);
        } catch (err) {
            alert(`Failed to create pool: ${err.message}`);
        }
    };

    return (
        <div className="p-4">
            <div className="space-y-4">
                <div>
                    <label>Token A Address:</label>
                    <input
                        type="text"
                        value={tokenA}
                        onChange={(e) => setTokenA(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="0x..."
                    />
                </div>

                <div>
                    <label>Token B Address:</label>
                    <input
                        type="text"
                        value={tokenB}
                        onChange={(e) => setTokenB(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="0x..."
                    />
                </div>

                <div>
                    <label>Fee Tier:</label>
                    <select
                        value={fee}
                        onChange={(e) => setFee(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                    >
                        <option value={500}>0.05%</option>
                        <option value={3000}>0.3%</option>
                        <option value={10000}>1%</option>
                    </select>
                </div>

                <button
                    onClick={handleCreatePool}
                    disabled={loading}
                    className="w-full p-2 bg-blue-500 text-white rounded"
                >
                    {loading ? 'Creating...' : 'Create Pool'}
                </button>

                {error && (
                    <div className="text-red-500">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatePoolComponent;