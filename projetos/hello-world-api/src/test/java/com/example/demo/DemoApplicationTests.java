package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DemoApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	void shouldReturnHelloMessage() throws Exception {
		mockMvc.perform(get("/hello"))
				.andExpect(status().isOk())
				.andExpect(content().string("Hello world!"));
	}

	@Test
	void shouldReturnProduct() throws Exception {
		mockMvc.perform(get("/products"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id", is(1)))
				.andExpect(jsonPath("$.name", is("Notebook Lenovo")))
				.andExpect(jsonPath("$.price", is(1600.0)));
	}

	@Test
	void shouldCreateProduct() throws Exception {
		String productJson = """
				{
				  "id": 2,
				  "name": "Mouse Logitech",
				  "price": 120.0
				}
				""";

		mockMvc.perform(post("/products")
						.contentType("application/json")
						.content(productJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id", is(2)))
				.andExpect(jsonPath("$.name", is("Mouse Logitech")))
				.andExpect(jsonPath("$.price", is(120.0)));
	}

	@Test
	void shouldRejectInvalidProduct() throws Exception {
		String invalidProductJson = """
				{
				  "id": 0,
				  "name": "",
				  "price": -1
				}
				""";

		mockMvc.perform(post("/products")
						.contentType("application/json")
						.content(invalidProductJson))
				.andExpect(status().isBadRequest());
	}

}
