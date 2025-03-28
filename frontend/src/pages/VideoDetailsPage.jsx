import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Spinner,
  Card,
  CardBody,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const VideoDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://video-management-application-anantadi-api.vercel.app/videos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [id]);

  return (
    <Box minH="100vh" bg="#f7f9fc">
      <Navbar />
      <Box maxW="1000px" mx="auto" mt="10" p={4}>
        {loading ? (
          <VStack spacing={6}>
            <Spinner size="xl" />
            <Text fontSize="lg" fontWeight="bold">Loading video details...</Text>
          </VStack>
        ) : video ? (
          <Card borderRadius="lg" boxShadow="lg" bg="white" overflow="hidden" p={6}>
            <CardBody>
              {/* Flexbox for layout */}
              <Flex direction={{ base: "column", md: "row" }} gap={6}>
                {/* Video Section */}
                <Box 
                  flex="1"
                  position="relative"
                  paddingTop="56.25%" // 16:9 Aspect Ratio
                  borderRadius="10px"
                  overflow="hidden"
                  boxShadow="md"
                >
                  <video
                    controls
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <source src={decodeURIComponent(video.videoUrl)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>

                {/* Description Section */}
                <VStack flex="1" align="start" spacing={4}>
                  <Heading size="lg" color="#244c9c">{video.title}</Heading>
                  <Divider />
                  <Text fontSize="md" color="gray.600">{video.description}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Uploaded on: <strong>{new Date(video.createdAt).toLocaleDateString()}</strong>
                  </Text>

                  <Button
                    colorScheme="blue"
                    width="full"
                    mt={4}
                    size="lg"
                    borderRadius="md"
                    onClick={() => navigate("/dashboard")}
                  >
                    Back to Dashboard
                  </Button>
                </VStack>
              </Flex>
            </CardBody>
          </Card>
        ) : (
          <Text fontSize="xl" fontWeight="bold" color="red.500" textAlign="center">
            Video not found.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default VideoDetailsPage;
