import React from 'react';
import { Box, Flex, Spacer, Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user'); // Assuming user data is stored in localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Box bg="#244c9c" p={4} color="white">
      <Flex maxW="1200px" mx="auto" align="center">
      <Link to="/dashboard">
        <Text fontSize="xl" fontWeight="bold">VideoApp</Text>
      </Link>
        <Spacer />
        {user && <Text mr="4">Hello, {user}</Text>}
        {user ? (
          <Button colorScheme="red" size="sm" onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button colorScheme="teal" size="sm">Login</Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
