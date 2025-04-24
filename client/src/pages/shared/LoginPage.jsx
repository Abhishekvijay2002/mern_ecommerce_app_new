
import React, { useState } from 'react';
import { userLogin } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    userLogin({ email, password })
        .then((res) => {
            toast.success("login successful!");
            
            console.log(res.data);
            if (res.data.admin?.role === 'admin') {
              navigate('/admin/dashboard');
          } else {
              navigate('/');
          }
          
            
        })
        .catch((err) => {
          toast.error(err.response?.data?.error ||"login failed!");
            const errorMsg = err.response?.data?.error || 'Login failed!';
            setMessage(errorMsg);
        });
};

  return (
    <div style={styles.container}>
     <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontFamily: 'Arial',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Login;
