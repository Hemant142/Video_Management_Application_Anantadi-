import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, Grid, GridItem, Spinner, Image, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/videos/my-videos', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const generateThumbnail = (videoUrl, videoId) => {
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.crossOrigin = "anonymous";
    videoElement.muted = true;
    videoElement.currentTime = 2;

    videoElement.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const thumbnailData = canvas.toDataURL("image/png");

      setThumbnails(prev => ({ ...prev, [videoId]: thumbnailData }));
    };
  };

  return (
    <Box>
      <Navbar />
      <Box maxW="1200px" mx="auto" mt="10" p="4">
        {videos.length > 0 ?        <Heading mb="4" textAlign="center">Your Uploaded Videos</Heading>:""}

       
        {loading ? (
          <Box display="flex" justifyContent="center" mt="10">
            <Spinner size="xl" />
          </Box>
        ) : videos.length > 0 ? (
          <Grid 
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} 
            gap={4}
          >
            {videos.map(video => (
              <GridItem 
                key={video._id} 
                p="4" 
                borderWidth="1px" 
                borderRadius="md"
                cursor="pointer"
                onClick={() => navigate(`/details/${video._id}`)}
                bg="gray.50"
                _hover={{ boxShadow: "lg" }}
              >
                <Text fontWeight="bold" isTruncated>{video.title}</Text>
                <Text fontSize="sm" color="gray.500" noOfLines={2}>{video.description}</Text>
                <Text fontSize="xs" color="gray.400">Uploaded on: {new Date(video.createdAt).toLocaleDateString()}</Text>
                
                <Box mt="2">
                  {video.videoUrl && !thumbnails[video._id] ? (
                    <video
                      src={video.videoUrl}
                      onLoadedData={() => generateThumbnail(video.videoUrl, video._id)}
                      width="100%"
                      style={{ display: "none" }}
                    />
                  ) : null}

                  <Image 
                    src={thumbnails[video._id] || 'https://via.placeholder.com/300'} 
                    alt="Video Thumbnail" 
                    width="100%"
                    height="150px"
                    borderRadius="md"
                    objectFit="cover"
                  />
                </Box>
              </GridItem>
            ))}
          </Grid>
        ) : (
          <VStack spacing={4} mt="10">
            <Image 
              src="https://cdn-icons-png.flaticon.com/512/4076/4076743.png" 
              alt="No Videos"
              boxSize="150px"
              opacity={0.8}
            />
            <Text fontSize="xl" fontWeight="bold" color="gray.600">
              No videos uploaded yet.
            </Text>
            <Text fontSize="md" color="gray.500" textAlign="center">
              Start by adding your first video and managing your content easily.
            </Text>
            <Button colorScheme="blue" onClick={() => navigate('/add-video')}>
              Upload Video
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
