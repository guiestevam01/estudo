package com.example.demo.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("hello")
    public String helloMenssage(){
        return "Hello world!";
    }
    @PostMapping
    public ResponseEntity<String> messagePost() {

    return ResponseEntity
            .status(HttpStatus.METHOD_NOT_ALLOWED)
            .body("não permitido");

    }

 }
