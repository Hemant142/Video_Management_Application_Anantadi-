import React, { useState } from 'react';
import { Box, Input, Button, Heading, Text, Link, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/users/login', { email, password });
      console.log(res, "response");
      localStorage.setItem('user', res.data.user.username);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Please check credentials.');
    }
  };

  return (
    <Box
      w={{ base: '90%', md: '400px' }}  // Adjust width for different screen sizes
      mx="auto"
      mt={{ base: '50px', md: '100px' }}  // Reduce top margin on smaller screens
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading mb="6" textAlign="center" fontSize={{ base: '2xl', md: '3xl' }}>
        Login
      </Heading>
      <VStack spacing="4">
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
          colorScheme="blue"
          width="100%"
          size="lg"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Text fontSize={{ base: 'sm', md: 'md' }}>
          Don't have an account?{' '}
          <Link color="blue.500" fontWeight="bold" onClick={() => navigate('/signup')}>
            Sign up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginPage;
