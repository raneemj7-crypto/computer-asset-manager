package edu.psu.se411.assetmanager.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import edu.psu.se411.assetmanager.exception.ObjectNotFoundException;
import edu.psu.se411.assetmanager.model.ComputerAsset;
import edu.psu.se411.assetmanager.repository.ComputerAssetRepository;

@ExtendWith(MockitoExtension.class)
class ComputerAssetServiceTest {

	@Mock
	private ComputerAssetRepository repository;

	private ComputerAssetService service;
	private ComputerAsset computer;

	@BeforeEach
	void setUp() {
		service = new ComputerAssetService(repository);
		computer = new ComputerAsset(1L, "Dell Latitude", "Dell", "Laptop", "SER-100",
				"Nora", "IT", LocalDate.of(2026, 1, 10), new BigDecimal("4500"), "In Use");
	}

	@Test
	void getAllComputersReturnsPage() {
		when(repository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(List.of(computer)));

		Page<ComputerAsset> result = service.getAllComputers(0, 5);

		assertEquals(1, result.getTotalElements());
		assertEquals("Dell Latitude", result.getContent().get(0).name());
	}

	@Test
	void getComputerByIdReturnsComputer() {
		when(repository.findById(1L)).thenReturn(Optional.of(computer));

		assertEquals(computer, service.getComputerById(1L).orElseThrow());
	}

	@Test
	void createComputerSavesComputer() {
		ComputerAsset request = new ComputerAsset(null, computer.name(), computer.brand(), computer.category(),
				computer.serial(), computer.assignedTo(), computer.department(), computer.purchaseDate(),
				computer.cost(), computer.status());
		when(repository.save(request)).thenReturn(computer);

		assertEquals(1L, service.createComputer(request).id());
	}

	@Test
	void updateComputerKeepsRequestedId() {
		when(repository.findById(1L)).thenReturn(Optional.of(computer));
		ComputerAsset request = new ComputerAsset(null, "Updated computer", "Dell", "Laptop", "SER-100",
				"Nora", "IT", LocalDate.of(2026, 1, 10), new BigDecimal("4700"), "In Use");

		service.updateComputer(1L, request);

		ArgumentCaptor<ComputerAsset> captor = ArgumentCaptor.forClass(ComputerAsset.class);
		verify(repository).save(captor.capture());
		assertEquals(1L, captor.getValue().id());
		assertEquals("Updated computer", captor.getValue().name());
	}

	@Test
	void updateMissingComputerThrowsException() {
		when(repository.findById(99L)).thenReturn(Optional.empty());

		assertThrows(ObjectNotFoundException.class, () -> service.updateComputer(99L, computer));
	}

	@Test
	void deleteComputerRemovesExistingComputer() {
		when(repository.findById(1L)).thenReturn(Optional.of(computer));

		service.deleteComputer(1L);

		verify(repository).deleteById(1L);
	}
}
