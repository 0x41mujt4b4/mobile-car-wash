import { create } from 'zustand';

interface BookingState {
    step: number;
    serviceType: string;
    location: string;
    userParams: {
        name: string;
        phone: string;
        email: string;
    };
    setStep: (step: number) => void;
    setServiceType: (type: string) => void;
    setLocation: (loc: string) => void;
    setUserParams: (params: { name: string; phone: string; email: string }) => void;
    reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    step: 1,
    serviceType: '',
    location: '',
    userParams: { name: '', phone: '', email: '' },
    setStep: (step) => set({ step }),
    setServiceType: (serviceType) => set({ serviceType }),
    setLocation: (location) => set({ location }),
    setUserParams: (userParams) => set({ userParams }),
    reset: () => set({ step: 1, serviceType: '', location: '', userParams: { name: '', phone: '', email: '' } }),
}));
