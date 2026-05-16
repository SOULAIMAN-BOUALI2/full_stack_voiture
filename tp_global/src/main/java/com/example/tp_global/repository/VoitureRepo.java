package com.example.tp_global.repository;

import com.example.tp_global.modele.Voiture;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    // Lister voitures par modele
    List<Voiture> findByModele(@Param("modele") String modele);

    // Lister voitures par couleur
    List<Voiture> findByCouleur(@Param("couleur") String couleur);
}