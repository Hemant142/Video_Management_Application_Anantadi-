import React, { useState } from 'react';
import { Box, Input, Button, Heading, VStack, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('https://video-management-application-anantadi-api.vercel.app/users/register', { username, email, password });
      alert('Registered successfully! Please login.');
      navigate('/');
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <Box
      w={{ base: '90%', md: '400px' }}  // Responsive width
      mx="auto"
      mt={{ base: '50px', md: '100px' }}  // Adjusted top margin
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading mb="6" textAlign="center" fontSize={{ base: '2xl', md: '3xl' }}>
        Sign Up
      </Heading>
      <VStack spacing="4">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="lg"
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
        />
        <Button
          colorScheme="green"
          width="100%"
          size="lg"
          onClick={handleSignup}
        >
          Sign Up
        </Button>
        <Text fontSize={{ base: 'sm', md: 'md' }}>
          Already have an account?{' '}
          <Link color="blue.500" fontWeight="bold" onClick={() => navigate('/')}>
            Login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignupPage;
