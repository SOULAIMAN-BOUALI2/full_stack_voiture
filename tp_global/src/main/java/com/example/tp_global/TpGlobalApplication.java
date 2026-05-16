package com.example.tp_global;

import com.example.tp_global.modele.Proprietaire;
import com.example.tp_global.modele.Voiture;
import com.example.tp_global.repository.ProprietaireRepo;
import com.example.tp_global.repository.VoitureRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class TpGlobalApplication {

	public static void main(String[] args) {
		SpringApplication.run(TpGlobalApplication.class, args);
	}

	@Autowired
	private VoitureRepo repository;

	@Autowired
	private ProprietaireRepo proprietaireRepo;

	@Bean
	@Profile("!test")
	CommandLineRunner runner() {

		return args -> {

			Proprietaire p1 =
					new Proprietaire("Ali", "Hassan");

			Proprietaire p2 =
					new Proprietaire("Najat", "Bani");

			proprietaireRepo.save(p1);
			proprietaireRepo.save(p2);

			repository.save(
					new Voiture(
							"Toyota",
							"Corolla",
							"Grise",
							"A-1-9090",
							2018,
							95000,
							p1
					)
			);

			repository.save(
					new Voiture(
							"Ford",
							"Fiesta",
							"Rouge",
							"A-2-8090",
							2015,
							90000,
							p1
					)
			);

			repository.save(
					new Voiture(
							"Honda",
							"CRV",
							"Bleu",
							"A-3-7090",
							2016,
							140000,
							p2
					)
			);

		};
	}
}