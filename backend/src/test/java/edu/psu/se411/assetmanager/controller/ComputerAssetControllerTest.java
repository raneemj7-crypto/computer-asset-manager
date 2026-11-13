package edu.psu.se411.assetmanager.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.psu.se411.assetmanager.model.ComputerAsset;
import edu.psu.se411.assetmanager.service.ComputerAssetService;

@ExtendWith(MockitoExtension.class)
class ComputerAssetControllerTest {

	@Mock
	private ComputerAssetService service;

	private MockMvc mockMvc;
	private ObjectMapper objectMapper;
	private ComputerAsset computer;

	@BeforeEach
	void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(new ComputerAssetController(service)).build();
		objectMapper = new ObjectMapper();
		objectMapper.findAndRegisterModules();
		computer = new ComputerAsset(1L, "Dell Latitude", "Dell", "Laptop", "SER-100",
				"Nora", "IT", LocalDate.of(2026, 1, 10), new BigDecimal("4500"), "In Use");
	}

	@Test
	void getAllComputersReturnsPaginatedData() throws Exception {
		when(service.getAllComputers(0, 5)).thenReturn(
				new PageImpl<>(List.of(computer), PageRequest.of(0, 5), 1));

		mockMvc.perform(get("/api/v1/computers?page=0&size=5"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.content[0].name").value("Dell Latitude"));
	}

	@Test
	void getComputerByIdReturnsComputer() throws Exception {
		when(service.getComputerById(1L)).thenReturn(Optional.of(computer));

		mockMvc.perform(get("/api/v1/computers/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.serial").value("SER-100"));
	}

	@Test
	void getMissingComputerReturnsNotFound() throws Exception {
		when(service.getComputerById(99L)).thenReturn(Optional.empty());

		mockMvc.perform(get("/api/v1/computers/99"))
				.andExpect(status().isNotFound());
	}

	@Test
	void createComputerReturnsCreated() throws Exception {
		ComputerAsset request = withoutId(computer);
		when(service.createComputer(any(ComputerAsset.class))).thenReturn(computer);

		mockMvc.perform(post("/api/v1/computers")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isCreated())
				.andExpect(header().string("Location", "http://localhost/api/v1/computers/1"));
	}

	@Test
	void updateComputerReturnsNoContent() throws Exception {
		ComputerAsset request = withoutId(computer);
		doNothing().when(service).updateComputer(eq(1L), any(ComputerAsset.class));

		mockMvc.perform(put("/api/v1/computers/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isNoContent());
	}

	@Test
	void deleteComputerReturnsNoContent() throws Exception {
		doNothing().when(service).deleteComputer(1L);

		mockMvc.perform(delete("/api/v1/computers/1"))
				.andExpect(status().isNoContent());
	}

	private ComputerAsset withoutId(ComputerAsset value) {
		return new ComputerAsset(null, value.name(), value.brand(), value.category(), value.serial(),
				value.assignedTo(), value.department(), value.purchaseDate(), value.cost(), value.status());
	}
}
