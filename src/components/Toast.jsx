import { useState, createContext, useContext } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { Button, Flex, Text } from "@radix-ui/themes";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  const showToast = (msg, toastType = "info") => {
    setMessage(msg);
    setType(toastType);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <RadixToast.Provider swipeDirection="right">
        <RadixToast.Root open={open} onOpenChange={setOpen} style={{ zIndex: 9999, minWidth: 240 }}>
          <Flex align="center" gap="3">
            <Text color={type === "error" ? "red" : type === "success" ? "green" : "gray"}>
              {message}
            </Text>
            <Button size="1" variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </Flex>
        </RadixToast.Root>
        <RadixToast.Viewport style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999 }} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
