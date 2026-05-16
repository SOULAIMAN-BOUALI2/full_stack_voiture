package com.example.tp_global;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.tp_global.controller.VoitureController;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
class TpGlobalApplicationTests {

	@Autowired
	VoitureController voitureController;

	@Test
	void contextLoads() {

		assertThat(voitureController).isNotNull();
	}
}