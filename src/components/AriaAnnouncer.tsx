import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

type AriaAnnouncerContextType = {
  announceAssertive: (message: string) => void;
  announcePolite: (message: string) => void;
};

const AriaAnnouncerContext = createContext<
  AriaAnnouncerContextType | undefined
>(undefined);

export const useA11yAnnouncer = () => {
  const context = useContext(AriaAnnouncerContext);
  if (!context) {
    throw new Error("useA11yAnnouncer must be used within AriaAnnouncer");
  }
  return context;
};

export const AriaAnnouncer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [assertiveMessage, setAssertiveMessage] = useState<string>("");
  const [politeMessage, setPoliteMessage] = useState<string>("");

  const announceAssertive = useCallback((message: string) => {
    setAssertiveMessage(message);
  }, []);

  const announcePolite = useCallback((message: string) => {
    setPoliteMessage(message);
  }, []);

  // Clear assertive messages immediately after being spoken (small delay for screen reader)
  useEffect(() => {
    if (assertiveMessage) {
      const timer = setTimeout(() => {
        setAssertiveMessage("");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [assertiveMessage]);

  return (
    <AriaAnnouncerContext.Provider
      value={{ announceAssertive, announcePolite }}
    >
      {children}
      {/* Hidden live regions for screen readers */}
      <div
        role='status'
        aria-live='assertive'
        aria-atomic='true'
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {assertiveMessage}
      </div>
      <div
        role='status'
        aria-live='polite'
        aria-atomic='true'
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {politeMessage}
      </div>
    </AriaAnnouncerContext.Provider>
  );
};

export default AriaAnnouncer;
