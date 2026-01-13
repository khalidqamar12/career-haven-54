import { createContext, useContext, useState, ReactNode } from 'react';
import { Application } from '@/lib/data';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'candidate' | 'employer';
  avatar?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  savedJobs: number[];
  toggleSavedJob: (jobId: number) => void;
  applications: Application[];
  addApplication: (application: Application) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSavedJob = (jobId: number) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const addApplication = (application: Application) => {
    setApplications(prev => [...prev, application]);
  };

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status } : app))
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        savedJobs,
        toggleSavedJob,
        applications,
        addApplication,
        updateApplicationStatus,
        isDarkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
