import React, { useState } from 'react';
import { 
  Box, Input, Button, VStack, Heading, FormControl, 
  FormLabel, Text, useToast, Container 
} from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AddVideoPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleUpload = async () => {
    if (!videoFile) {
      toast({
        title: 'Error',
        description: 'Please select a video file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('video', videoFile);

    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8080/videos/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      toast({
        title: 'Success',
        description: 'Video uploaded successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setTitle('');
      setDescription('');
      setTags('');
      setVideoFile(null);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Video upload failed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navbar />
      <Container 
        maxW={{ base: "95%", md: "600px", lg: "500px" }} 
        mt="10" 
        p={{ base: "4", md: "6" }} 
        borderWidth="1px" 
        borderRadius="lg" 
        boxShadow="md"
      >
        <Heading mb="4" textAlign="center" fontSize={{ base: "xl", md: "2xl" }}>
          Upload Video
        </Heading>

        <VStack spacing="4" align="stretch">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input 
              placeholder="Enter title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              width="full"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input 
              placeholder="Enter description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              width="full"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tags (comma-separated)</FormLabel>
            <Input 
              placeholder="Enter tags" 
              value={tags} 
              onChange={(e) => setTags(e.target.value)} 
              width="full"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Video File</FormLabel>
            <Input 
              type="file" 
              accept="video/*" 
              onChange={(e) => setVideoFile(e.target.files[0])} 
            />
            {videoFile && (
              <Text mt={2} fontSize="sm" color="gray.600">
                Selected file: {videoFile.name}
              </Text>
            )}
          </FormControl>

          <Button 
            colorScheme="blue" 
            isLoading={loading} 
            width="full" 
            onClick={handleUpload}
          >
            Upload
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default AddVideoPage;
