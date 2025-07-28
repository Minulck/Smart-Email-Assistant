import { Container,CircularProgress, TextField, Typography,Box,MenuItem, FormControl, InputLabel,Select, Menu, Button} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [emailContent,setEmailContent] = useState('');
  const [tone,setTone] = useState('formal');
  const [generatedReply,setGeneratedReply] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');

  const handleGenerateReply = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (err) {
      console.error('Error generating reply:', err);
      setError('Failed to generate reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{py: 4}}>

    <Typography variant="h3" component="h1" gutterBottom>
      Smart Email Assistant
    </Typography>

    <Box>
      <TextField
        label="Original Email Content"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        sx={{ mb: 2 }}
      >
      </TextField>


      <FormControl
          fullWidth
          sx={{ mb: 2 }}
          variant="outlined"
>

        <InputLabel>
          Tone of Reply (Optional)
        </InputLabel>
        <Select
          label="Tone of Reply (Optional)"
          value={tone || 'formal'}
          onChange={(e)=>setTone(e.target.value)}>
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="informal">Informal</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="concise">Concise</MenuItem>
            <MenuItem value="detailed">Detailed</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ mt: 2, mb: 2 , display: 'flex',gap: 2 }}>
        
        <Button variant='contained' color='primary' 
          onClick={handleGenerateReply}
          disabled={loading|| !emailContent}
          fullWidth
        >{loading ? <CircularProgress size={24} color='white' /> : 'Generate Reply'}</Button>
      </Box>
    </Box>

    {error && <Typography color="error">{error}</Typography>}

    {generatedReply && (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Generated Reply
        </Typography>
        <TextField
          label="Generated Reply"
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          value={generatedReply || ''}
        />
        <Button variant='contained' color='primary ' onClick={() => navigator.clipboard.writeText(generatedReply || '')}>Copy to Clipboard</Button>
      </Box>
    )}

    </Container>
    
  )
}

export default App
