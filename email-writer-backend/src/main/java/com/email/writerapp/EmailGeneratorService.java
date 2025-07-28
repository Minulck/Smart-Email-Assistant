package com.email.writerapp;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@AllArgsConstructor
public class EmailGeneratorService {

    private final WebClient webClient;


    @Value("${geminai.api.url}")
    private String geminiApiUrl;

    @Value("${geminai.api.key}")
    private String geminiApiKey;

    public String generateEmailReply(EmailRequest emailRequest) {

        String prompt = buildPrompt(emailRequest);

        Map<String , Object> requestBody= Map.of(
          "content",new Object[]{
                  Map.of(
                          "parts",new Object[]{
                                 Map.of("text",prompt)
                          })
                }
        );

        String response = webClient.post()
                .uri(geminiApiUrl)
                .header(
                        "Content-Tyoe","Application/json")
                .header("X-goog-api-key",geminiApiKey)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return extractResponseContent(response);


    }

    private String extractResponseContent(String response) {

        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.get("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }
        catch(Exception e){
            return "Error While Processing :  "+e.getMessage();
        }

    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional reply for the following email content:\nPlease Do not generate a subject line");

        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a").append(emailRequest.getTone()).append(" Tone");
        }
        prompt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }


}
