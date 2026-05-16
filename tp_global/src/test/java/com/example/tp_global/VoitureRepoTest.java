package com.example.tp_global;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.tp_global.modele.Proprietaire;
import com.example.tp_global.modele.Voiture;
import com.example.tp_global.repository.VoitureRepo;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
public class VoitureRepoTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {

        Proprietaire proprietaire =
                new Proprietaire("Ali", "Hassan");

        entityManager.persistAndFlush(proprietaire);

        Voiture voiture =
                new Voiture(
                        "MiolaCar",
                        "Uber",
                        "Blanche",
                        "M-2020",
                        2021,
                        180000,
                        proprietaire
                );

        entityManager.persistAndFlush(voiture);

        assertThat(voiture.getId()).isNotNull();
    }

    @Test
    public void supprimerVoiture() {

        Proprietaire proprietaire =
                new Proprietaire("Ali", "Hassan");

        entityManager.persistAndFlush(proprietaire);

        entityManager.persistAndFlush(
                new Voiture(
                        "MiolaCar",
                        "Uber",
                        "Blanche",
                        "M-2020",
                        2021,
                        180000,
                        proprietaire
                )
        );

        entityManager.persistAndFlush(
                new Voiture(
                        "MiniCooper",
                        "Uber",
                        "Rouge",
                        "C-2020",
                        2021,
                        180000,
                        proprietaire
                )
        );

        voitureRepo.deleteAll();

        assertThat(voitureRepo.findAll()).isEmpty();
    }
}