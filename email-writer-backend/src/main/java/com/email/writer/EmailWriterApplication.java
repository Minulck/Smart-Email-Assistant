package com.email.writer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmailWriterApplication {

	public static void main(String[] args) {
		// Load .env file and set as system properties
		try {
			io.github.cdimascio.dotenv.Dotenv dotenv = io.github.cdimascio.dotenv.Dotenv.configure()
				.directory("./src/main/resources")
				.ignoreIfMalformed()
				.ignoreIfMissing()
				.load();
			dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
		} catch (Exception e) {
			System.out.println("Could not load .env: " + e.getMessage());
		}
		SpringApplication.run(EmailWriterApplication.class, args);
	}

}
