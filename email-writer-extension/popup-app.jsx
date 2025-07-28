import { Container,CircularProgress, TextField, Typography,Box,MenuItem, FormControl, InputLabel,Select, Button} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [emailContent,setEmailContent] = useState('');
  const [tone,setTone] = useState('formal');
  const [generatedReply,setGeneratedReply] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');

  // Auto-detect email content from active tab (Gmail)
  useEffect(() => {
    // Try to get email content from current Gmail page
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes('mail.google.com')) {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: () => {
              // Try to extract email content from Gmail
              const emailBody = document.querySelector('[data-message-id] .ii.gt .ii.gt div');
              return emailBody ? emailBody.innerText : '';
            }
          }).then((results) => {
            if (results && results[0] && results[0].result) {
              setEmailContent(results[0].result);
            }
          }).catch(console.error);
        }
      });
    }
  }, []);

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

  const handleCopyToGmail = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes('mail.google.com')) {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: (reply) => {
              // Try to insert into Gmail compose area
              const composeBox = document.querySelector('[role="textbox"][aria-label*="Message Body"]') || 
                                document.querySelector('.Am.Al.editable');
              if (composeBox) {
                composeBox.innerHTML = reply.replace(/\n/g, '<br>');
                // Trigger input event
                composeBox.dispatchEvent(new Event('input', { bubbles: true }));
              }
            },
            args: [generatedReply]
          });
        }
      });
    }
    // Also copy to clipboard as fallback
    navigator.clipboard.writeText(generatedReply);
  };

  return (
    <Container maxWidth="sm" sx={{py: 2, px: 2}}>
      <Typography variant="h6" component="h1" gutterBottom sx={{fontSize: '1.1rem'}}>
        Smart Email Assistant
      </Typography>

      <Box>
        <TextField
          label="Original Email Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
          size="small"
        />

        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          variant="outlined"
          size="small"
        >
          <InputLabel>Tone</InputLabel>
          <Select
            label="Tone"
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

        <Button 
          variant='contained' 
          color='primary' 
          onClick={handleGenerateReply}
          disabled={loading|| !emailContent}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={20} color='inherit' /> : 'Generate Reply'}
        </Button>
      </Box>

      {error && <Typography color="error" variant="body2" sx={{mb: 2}}>{error}</Typography>}

      {generatedReply && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Generated Reply
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={generatedReply || ''}
            size="small"
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant='outlined' 
              color='primary' 
              onClick={() => navigator.clipboard.writeText(generatedReply || '')}
              size="small"
              fullWidth
            >
              Copy
            </Button>
            <Button 
              variant='contained' 
              color='primary' 
              onClick={handleCopyToGmail}
              size="small"
              fullWidth
            >
              Insert to Gmail
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default App
