package edu.psu.se411.assetmanager.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import edu.psu.se411.assetmanager.exception.ObjectNotFoundException;
import edu.psu.se411.assetmanager.model.ComputerAsset;
import edu.psu.se411.assetmanager.service.ComputerAssetService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/computers")
@CrossOrigin(origins = "http://localhost:5173")
public class ComputerAssetController {

	private final ComputerAssetService computerAssetService;

	public ComputerAssetController(ComputerAssetService computerAssetService) {
		this.computerAssetService = computerAssetService;
	}

	@GetMapping
	public ResponseEntity<Page<ComputerAsset>> getAllComputers(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {
		return ResponseEntity.ok(computerAssetService.getAllComputers(page, size));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ComputerAsset> getComputerById(@PathVariable Long id) {
		Optional<ComputerAsset> computer = computerAssetService.getComputerById(id);
		if (computer.isPresent()) {
			return ResponseEntity.ok(computer.get());
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<Void> createComputer(@Valid @RequestBody ComputerAsset computer,
			UriComponentsBuilder ucb) {
		if (computer.id() != null) {
			return ResponseEntity.badRequest().build();
		}
		ComputerAsset createdComputer = computerAssetService.createComputer(computer);
		URI location = ucb.path("/api/v1/computers/{id}")
				.buildAndExpand(createdComputer.id()).toUri();
		return ResponseEntity.created(location).build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> updateComputer(@PathVariable Long id,
			@Valid @RequestBody ComputerAsset computer) {
		if (computer.id() != null) {
			return ResponseEntity.badRequest().build();
		}
		try {
			computerAssetService.updateComputer(id, computer);
			return ResponseEntity.noContent().build();
		} catch (ObjectNotFoundException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteComputer(@PathVariable Long id) {
		try {
			computerAssetService.deleteComputer(id);
			return ResponseEntity.noContent().build();
		} catch (ObjectNotFoundException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
