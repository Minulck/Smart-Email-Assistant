package com.email.writerapp;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/email")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
       String response = emailGeneratorService.generateEmailReply(emailRequest);
       return ResponseEntity.ok(response);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> generateEmail(){
        return ResponseEntity.ok("hello world");
    }


}
