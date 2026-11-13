package edu.psu.se411.assetmanager.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import edu.psu.se411.assetmanager.exception.ObjectNotFoundException;
import edu.psu.se411.assetmanager.model.ComputerAsset;
import edu.psu.se411.assetmanager.repository.ComputerAssetRepository;

@Service
public class ComputerAssetService {

	private final ComputerAssetRepository computerAssetRepository;

	public ComputerAssetService(ComputerAssetRepository computerAssetRepository) {
		this.computerAssetRepository = computerAssetRepository;
	}

	public Page<ComputerAsset> getAllComputers(int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
		return computerAssetRepository.findAll(pageable);
	}

	public Optional<ComputerAsset> getComputerById(Long id) {
		return computerAssetRepository.findById(id);
	}

	public ComputerAsset createComputer(ComputerAsset computer) {
		return computerAssetRepository.save(computer);
	}

	public void updateComputer(Long id, ComputerAsset computer) {
		computerAssetRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("Computer not found"));
		ComputerAsset updatedComputer = new ComputerAsset(id, computer.name(), computer.brand(),
				computer.category(), computer.serial(), computer.assignedTo(), computer.department(),
				computer.purchaseDate(), computer.cost(), computer.status());
		computerAssetRepository.save(updatedComputer);
	}

	public void deleteComputer(Long id) {
		computerAssetRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("Computer not found"));
		computerAssetRepository.deleteById(id);
	}
}
