"use client";
import { useEffect, useState, useCallback } from "react";
import { useCurrencyStore } from "@/lib/useCurrencyStore";

// Common currencies for the dropdown
const currencies = [
    "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD",
    "MXN", "SGD", "HKD", "NOK", "TRY", "ZAR", "BRL", "INR", "KRW", "IDR"
];

export default function Home() {
    const { amount, from, to, result, setResult, setAmount, setFrom, setTo } = useCurrencyStore();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Handle hydration
    useEffect(() => {
        setMounted(true);
        
        // Check localStorage first, then system preference
        const savedTheme = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const shouldBeDark = savedTheme ? savedTheme === 'true' : systemPrefersDark;
        
        setIsDarkMode(shouldBeDark);
        
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = useCallback(() => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        
        // Save to localStorage
        localStorage.setItem('darkMode', newDarkMode.toString());
        
        // Apply to document
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleConvert = useCallback(async () => {
        if (amount <= 0) return;
        
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
            if (!response.ok) throw new Error('Failed to fetch rates');
            
            const data = await response.json();
            const rate = data.rates[to];
            
            if (rate) {
                const convertedAmount = amount * rate;
                setResult(convertedAmount);
            } else {
                setResult(null);
            }
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    }, [amount, from, to, setResult]);

    // Swap currencies
    const swapCurrencies = useCallback(() => {
        const tempFrom = from;
        setFrom(to);
        setTo(tempFrom);
    }, [from, to, setFrom, setTo]);

    useEffect(() => {
        if (amount > 0 && mounted) {
            handleConvert();
        }
    }, [amount, from, to, handleConvert, mounted]);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
                            <div className="h-12 bg-gray-200 rounded mb-4"></div>
                            <div className="h-12 bg-gray-200 rounded mb-4"></div>
                            <div className="h-12 bg-gray-200 rounded mb-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 transition-all duration-300">
            <div className="max-w-md mx-auto">
                {/* Header with Dark Mode Toggle */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        💱 Currency Converter
                    </h1>
                    <button
                        onClick={toggleDarkMode}
                        className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDarkMode ? (
                            <span className="text-yellow-500 text-xl">☀️</span>
                        ) : (
                            <span className="text-gray-700 text-xl">🌙</span>
                        )}
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300">
                    
                    {/* Amount Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Amount
                        </label>
                        <input
                            type="number"
                            value={amount || ''}
                            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl 
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     transition-all duration-200"
                            min="0"
                            step="0.01"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Currency Selection */}
                    <div className="space-y-4 mb-6">
                        {/* From Currency */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                From
                            </label>
                            <select
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl 
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                         transition-all duration-200"
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Swap Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={swapCurrencies}
                                className="p-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
                                         text-white rounded-full shadow-lg hover:shadow-xl 
                                         transition-all duration-200 transform hover:scale-110"
                                aria-label="Swap currencies"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </button>
                        </div>

                        {/* To Currency */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                To
                            </label>
                            <select
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl 
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                         transition-all duration-200"
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Result Display */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 
                                  rounded-xl p-6 border-2 border-blue-100 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Conversion Result
                        </h3>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                    <span>Converting...</span>
                                </div>
                            ) : result !== null ? (
                                `${amount} ${from} = ${result.toFixed(2)} ${to}`
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">Enter amount to convert</span>
                            )}
                        </div>
                        
                        {result !== null && !isLoading && amount > 0 && (
                            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                Rate: 1 {from} = {(result / amount).toFixed(4)} {to}
                            </div>
                        )}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Exchange rates provided by exchangerate-api.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}