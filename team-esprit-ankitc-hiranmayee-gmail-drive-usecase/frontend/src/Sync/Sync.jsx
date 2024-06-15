import React, { useState } from "react";
import axios from "axios";
import "./Sync.css";
import {
  ChakraProvider,
  Button,
  useToast,
} from "@chakra-ui/react";
function Register() {

  const [sending, setSending] = useState(false);
  const toast = useToast();

  const handleSync = async () => {
    try {
      const response = await axios.post("http://localhost:4000/drive/upload");
      if (response.status === 200) {
        toast({
          title: "sync successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to sync",
          description: "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };
 
  return (
    <>
      <ChakraProvider>
      
        <div className="sync">
          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            onClick={handleSync}
            isLoading={sending}
            loadingText="Syncing..."
          >
            Sync
          </Button>
        </div>
      </ChakraProvider>
    </>
  );
}
export default Register;
