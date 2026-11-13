package edu.psu.se411.assetmanager.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ComputerAsset(
		@Id Long id,
		@NotBlank(message = "Computer name is required") String name,
		@NotBlank(message = "Brand is required") String brand,
		@NotBlank(message = "Computer type is required") String category,
		@NotBlank(message = "Serial number is required") String serial,
		String assignedTo,
		@NotBlank(message = "Department is required") String department,
		@NotNull(message = "Purchase date is required") LocalDate purchaseDate,
		@NotNull(message = "Cost is required")
		@PositiveOrZero(message = "Cost cannot be negative") BigDecimal cost,
		@NotBlank(message = "Status is required") String status
) {}
