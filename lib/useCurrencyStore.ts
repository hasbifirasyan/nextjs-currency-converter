import {create} from "zustand";

interface CurrencyState {
    amount: number;
    from: string;
    to: string;
    result: number | null;
    setAmount: (amount: number) => void;
    setFrom: (from: string) => void;
    setTo: (to: string) => void;
    setResult: (result: number | null) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
    amount: 1,
    from: "IDR",
    to: "USD",
    result: null,
    setAmount: (amount) => set({amount}),
    setFrom: (from) => set({from}),
    setTo: (to) => set({to}),
    setResult: (result) => set({result}),
}));