package com.example.demo.controller;

import com.example.demo.model.Product;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping
public class HelloController {

    @GetMapping("/hello")
    public String helloMessage() {
        return "Hello world!";
    }

    @GetMapping("/products")
    public Product getProduct() {
        return new Product(1L, "Notebook Lenovo", new BigDecimal("1600.00"));
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }
}
