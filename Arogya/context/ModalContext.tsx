"use client";
import React, { createContext, useContext, useState } from "react";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";

import { motion, AnimatePresence } from "framer-motion";


type ModalType = "signup" | "signin" | null;

interface ModalContextType {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModal(type);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <AnimatePresence>
        {modal === "signup" && (
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-md bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-h-[95vh] overflow-y-auto p-4"
              initial={{ y: "20%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "20%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <SignUp />
            </motion.div>
          </motion.div>
        )}
        {modal === "signin" && (
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-md bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-h-[95vh] overflow-y-auto p-4"
              initial={{ y: "20%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "20%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <SignIn />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </ModalContext.Provider>
  );
};
