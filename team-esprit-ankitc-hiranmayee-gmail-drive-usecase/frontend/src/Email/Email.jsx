import React, { useState } from "react";
import axios from "axios";
import "./Email.css";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
function Email() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [sending, setSending] = useState(false);
  const toast = useToast();
  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData();
    formData.append("attachment", attachment);
    formData.append("receiver", email);
    formData.append("subject", subject);
    formData.append("message", message);
    try {
      const response = await axios.post(
        "http://localhost:4000/gmail/mail",
        formData
      );
      console.log(response);
      if (response.status === 200) {
        toast({
          title: "Email sent successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEmail("");
        setSubject("");
        setMessage("");
        setAttachment(null);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Failed to send email",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSending(false);
    }
  };
  return (
    <ChakraProvider>
      <VStack p={4} spacing={6} className="container">
        <Text fontSize="xl" fontWeight="bold">
          Email Form
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl id="subject" isRequired>
            <FormLabel>Subject</FormLabel>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </FormControl>
          <FormControl id="message" isRequired>
            <FormLabel>Message</FormLabel>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
          </FormControl>
          <FormControl id="attachment">
            <FormLabel>Attachment</FormLabel>
            <Input
              type="file"
              onChange={handleAttachmentChange}
              accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.png"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="green"
            mt={4}
            isLoading={sending}
            loadingText="Sending..."
          >
            Send Mail
          </Button>
        </form>
      </VStack>
    </ChakraProvider>
  );
}
export default Email;