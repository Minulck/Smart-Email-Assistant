package com.email.writer.replygenerte;

import lombok.Data;

@Data
public class EmailRequest {

    public String getEmailContent() {
        return emailContent;
    }

    public String getTone() {
        return tone;
    }

    private String emailContent;

    public void setTone(String tone) {
        this.tone = tone;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    private String tone;

}
