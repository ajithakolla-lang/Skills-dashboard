
import React, { useState } from 'react';
import { Spinner } from './ui/Spinner';

interface NLPQueryProps {
    onQuerySubmit: (query: string) => void;
    isLoading: boolean;
    aiResponse: string | null;
    onQueryClear: () => void;
}

const ChatBubbleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10.5a1.5 1.5 0 113 0v.001a1.5 1.5 0 01-3 0V10.5zM6.5 10.5a1.5 1.5 0 113 0v.001a1.5 1.5 0 01-3 0V10.5zM11 12a1.5 1.5 0 000-3H5.5a1.5 1.5 0 000 3H11z" />
        <path fillRule="evenodd" d="M2 5a3 3 0 013-3h10a3 3 0 013 3v5a3 3 0 01-3 3H7.5a1.5 1.5 0 00-1.06.44L3.72 16.68A.75.75 0 013 16.22V13a1 1 0 00-1-1H2V5zm3-1a1 1 0 00-1 1v7h1.5a2.5 2.5 0 012.5 2.5v1.28l1.72-1.72a.75.75 0 01.53-.22H15a1 1 0 001-1V5a1 1 0 00-1-1H5z" clipRule="evenodd" />
    </svg>
);


export const NLPQuery: React.FC<NLPQueryProps> = ({ onQuerySubmit, isLoading, aiResponse, onQueryClear }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onQuerySubmit(query);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim() === '') {
            onQueryClear();
        }
    };

    const exampleQueries = [
        "Show CSM certified employees in Toronto",
        "Who reports to Rashmi Shrivastava?",
        "Find people with API experience",
    ];

    const handleExampleClick = (exampleQuery: string) => {
        setQuery(exampleQuery);
        onQuerySubmit(exampleQuery);
    };

    return (
        <div className="bg-surface rounded-lg shadow-lg p-4 sm:p-6 mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2 flex items-center"><ChatBubbleIcon /> Ask the AI Assistant</h3>
            <p className="text-sm text-text-secondary mb-4">Use natural language to find team members. Try an example or type your own query.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="e.g., 'Who works with client Medtronic and is based in Santa Clara?'"
                    className="flex-grow bg-surface border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-6 rounded-md transition duration-150 ease-in-out flex justify-center items-center min-w-[120px]"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : 'Query'}
                </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
                {exampleQueries.map((ex, index) => (
                    <button
                        key={index}
                        onClick={() => handleExampleClick(ex)}
                        className="text-xs bg-slate-200 hover:bg-slate-300 text-text-secondary py-1 px-3 rounded-full transition"
                        disabled={isLoading}
                    >
                       {ex}
                    </button>
                ))}
            </div>

            {aiResponse && (
                 <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-900">
                    <p><strong className="font-semibold">AI Assistant:</strong> {aiResponse}</p>
                 </div>
            )}
        </div>
    );
};
